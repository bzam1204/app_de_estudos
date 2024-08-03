"use server";
import { FibonacciQuestionLog, PrismaClient, Question } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createQuestion(prevState: any, formData: FormData) {
    const fields = {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        typeId: formData.get("typeId") as string,
        userId: formData.get("userId") as string,
        explanation: formData.get("explanation") as string,
        correctAnswer: Boolean(formData.get("correctAnswer")),
    };

    // Create a new question
    try {
        const newQuestion = await prisma.question.create({
            data: {
                title: fields.title,
                body: fields.body,
                typeId: fields.typeId,
                userId: fields.userId,
                explanation: fields.explanation,
                correctAnswer: fields.correctAnswer,
            },
        });

        const revision = await createOrUpdateFibonacciLog(
            newQuestion.id,
            fields.userId
        );

        return {
            message: "Question created",
            question: newQuestion,
            revision: revision,
        };
    } catch (error) {
        console.error("Error creating question:", error);
        return {
            message: "Error creating question",
        };
    }
}

export async function deleteQuestion(prevState: any, formData: FormData) {
    const questionId = formData.get("id") as string;
    // delete question
    try {
        // First, check if the question exists
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            include: { type: true },
        });

        if (!question) {
            // If the question does not exist, return a 404 response
            return { message: "Question not found", status: 404 };
        }
        // If the question exists, proceed to delete it
        await prisma.fibonacciQuestionLog.deleteMany({
            where: {
                questionId: questionId,
            },
        });

        if (question.type.name === "MULTIPLE_CHOICE") {
            // If the question is of type "Multiple Choice",
            // delete the question along with its relations
            await deleteQuestionWithRelations(questionId);
        } else {
            // If the question is of any other type,
            // delete the question without its relations
            await deleteQuestionWithoutRelations(questionId);
        }

        revalidatePath("/dashboard/questions");
        // Return a success response
        return {
            status: 200,
            message: "Question deleted",
            deletedQuestion: question,
        };
    } catch (error) {
        // Handle any other errors
        console.error(error);
        return { message: `An error occurred, ${error}`, status: 500 };
    }
}

async function deleteQuestionWithoutRelations(questionId: string) {
    // Delete the Question record
    const deletedQuestion = await prisma.question.delete({
        where: {
            id: questionId,
        },
    });

    return deletedQuestion;
}

async function deleteQuestionWithRelations(questionId: string) {
    // Begin a transaction
    const transaction = await prisma.$transaction(async (prisma) => {
        // 1. Delete QuestionOption records
        await prisma.questionOption.deleteMany({
            where: {
                questionId: questionId,
            },
        });

        // 2. Delete Option records (if they are not shared with other questions)
        // This step might need adjustments based on your application logic
        await prisma.option.deleteMany({
            where: {
                questionOptions: {
                    every: {
                        questionId: questionId,
                    },
                },
            },
        });

        // 3. Delete the Question record
        await prisma.question.delete({
            where: {
                id: questionId,
            },
        });
    });

    return transaction;
}

function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

export async function createOrUpdateFibonacciLog(
    questionId: string,
    userId: string,
    result?: any
): Promise<void> {
    // Verificar se a questão existe
    const question: Question | null = await prisma.question.findUnique({
        where: { id: questionId },
    });

    if (!question) {
        throw new Error(`Question with id ${questionId} does not exist.`);
    }

    // Obter o log de revisão mais recente para esta questão e usuário
    const latestLog: FibonacciQuestionLog | null =
        await prisma.fibonacciQuestionLog.findFirst({
            where: { questionId, userId },
            orderBy: { fibonacciIndex: "desc" },
        });

    // Determinar o próximo índice de Fibonacci
    const nextFibonacciIndex: number = latestLog
        ? latestLog.fibonacciIndex + 1
        : 0;
    const nextFibValue = fibonacci(nextFibonacciIndex);

    // Calcular a próxima data de revisão com base no índice de Fibonacci
    const nextRevisionDate: Date = new Date();

    if (!latestLog) {
        nextRevisionDate.setDate(nextRevisionDate.getDate());
    } else {
        nextRevisionDate.setDate(nextRevisionDate.getDate() + nextFibValue);

        await prisma.fibonacciQuestionLog.update({
            where: { id: latestLog.id },
            data: {
                done: true,
                result: result,
            },
        });
    }

    nextRevisionDate.setHours(0, 0, 0, 0);

    // Criar ou atualizar o log de revisão
    await prisma.fibonacciQuestionLog.upsert({
        where: {
            questionId_userId_fibonacciIndex: {
                questionId,
                userId,
                fibonacciIndex: nextFibonacciIndex,
            },
        },
        update: {
            nextRevisionDate,
            updatedAt: new Date(),
        },
        create: {
            questionId,
            userId,
            fibonacciIndex: nextFibonacciIndex,
            nextRevisionDate,
            questionTypeId: question.typeId,
        },
    });
}


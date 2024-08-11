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

/**
 * Calculates the nth Fibonacci number.
 * 
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1. That is, F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2) for n > 1.
 * 
 * @param {number} n - The position in the Fibonacci sequence to calculate.
 * @returns {number} - The Fibonacci number at position n.
 */
function fibonacci(n: number): number {
    // Base case: if n is 0 or 1, return n
    if (n <= 1) {
        return n;
    }
    // Recursive case: return the sum of the two preceding Fibonacci numbers
    return fibonacci(n - 1) + fibonacci(n - 2);
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

async function getQuestionById(questionId: string): Promise<Question | null> {
    return await prisma.question.findUnique({
        where: { id: questionId },
    });
}

async function getLatestLog(
    questionId: string,
    userId: string
): Promise<FibonacciQuestionLog | null> {
    return await prisma.fibonacciQuestionLog.findFirst({
        where: { questionId, userId },
        orderBy: { fibonacciIndex: "desc" },
    });
}

function calculateNextFibonacciIndex(
    latestLog: FibonacciQuestionLog | null
): number {
    return latestLog ? latestLog.fibonacciIndex + 1 : 0;
}

function calculateNextRevisionDate(
    latestLog: FibonacciQuestionLog | null,
    nextFibValue: number
): Date {
    const nextRevisionDate = new Date();
    if (latestLog) {
        nextRevisionDate.setDate(nextRevisionDate.getDate() + nextFibValue);
    }
    nextRevisionDate.setHours(0, 0, 0, 0);
    return nextRevisionDate;
}

async function updateLatestLog(
    latestLog: FibonacciQuestionLog,
    result: any
): Promise<void> {
    await prisma.fibonacciQuestionLog.update({
        where: { id: latestLog.id },
        data: {
            done: true,
            result: result,
        },
    });
}

async function upsertFibonacciLog(
    questionId: string,
    userId: string,
    nextFibonacciIndex: number,
    nextRevisionDate: Date,
    questionTypeId: string
): Promise<FibonacciQuestionLog> {
    return await prisma.fibonacciQuestionLog.upsert({
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
            questionTypeId: questionTypeId,
        },
    });
}

export async function createOrUpdateFibonacciLog(
    questionId: string,
    userId: string,
    result?: null | Boolean | undefined
): Promise<void> {
    try {
        const question = await getQuestionById(questionId);
        if (!question) {
            throw new NotFoundError(
                `Question with id ${questionId} does not exist.`
            );
        }

        const latestLog = await getLatestLog(questionId, userId);
        const nextFibonacciIndex = calculateNextFibonacciIndex(latestLog);
        const nextFibValue = fibonacci(nextFibonacciIndex);
        const nextRevisionDate = calculateNextRevisionDate(
            latestLog,
            nextFibValue
        );

        if (latestLog) {
            await updateLatestLog(latestLog, result);
        }

        const newLog = await upsertFibonacciLog(
            questionId,
            userId,
            nextFibonacciIndex,
            nextRevisionDate,
            question.typeId
        );

        console.log("newLog", newLog);
    } catch (error) {
        if (
            error instanceof NotFoundError ||
            error instanceof ValidationError
        ) {
            console.error(error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw error;
    }
}

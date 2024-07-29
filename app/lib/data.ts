import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getQuestions(path?: string) {
    try {
        if (path) revalidatePath(path);
        return await prisma.question.findMany();
    } catch (error) {
        // Handle the error here
        console.error("Error retrieving questions:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function getQuestionTypes() {
    try {
        return await prisma.questionType.findMany();
    } catch (error) {
        // Handle the error here
        console.error("Error retrieving questions:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function getQuestionsForToday(path?: string) {
    try {
        const today = getTodayDate();
        console.log("today: ", today);

        const logs = await prisma.fibonacciQuestionLog.findMany({
            where: {
                userId: "clz3g43fz00049moixkx337j8",
                done: false,
                nextRevisionDate: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Adiciona 1 dia para pegar o fim do dia atual
                },
            },
            include: {
                question: true, // Inclui os detalhes da questão
                QuestionType: true,
            },
        });

        if(path) revalidatePath(path)

        return logs;
    } catch (error) {
        // Handle the error here
        console.error("Error retrieving logs:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

function getTodayDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data
    return today;
}

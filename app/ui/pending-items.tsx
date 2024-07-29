import React from "react";
import { getQuestionsForToday } from "@/app/lib/data";
import Link from "next/link";

async function getServerSideProps() {
    try {
        const data = await getQuestionsForToday('/dashboard/');
        return data;
    } catch (error) {
        console.error("Error fetching questions for today:", error);
        return null;
    }
}

export default async function PendingItems() {

    const todaysQuestionList = await getServerSideProps();
    return (
        <div className='flex flex-col gap-4 py-4 justify-center items-center w-screen max-w-screen-md'>
            {`Você tem ${todaysQuestionList?.length} items para revisar`}

            <Link href={'/dashboard/todays-list'}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                    Revisar
                </button>
            </Link>
        </div>
    )

}


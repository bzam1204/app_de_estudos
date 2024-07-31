-- CreateTable
CREATE TABLE "FibonacciQuestionLog" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionTypeId" TEXT NOT NULL,
    "fibonacciIndex" INTEGER NOT NULL,
    "nextRevisionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FibonacciQuestionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FibonacciQuestionLog_questionId_userId_fibonacciIndex_key" ON "FibonacciQuestionLog"("questionId", "userId", "fibonacciIndex");

-- AddForeignKey
ALTER TABLE "FibonacciQuestionLog" ADD CONSTRAINT "FibonacciQuestionLog_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FibonacciQuestionLog" ADD CONSTRAINT "FibonacciQuestionLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FibonacciQuestionLog" ADD CONSTRAINT "FibonacciQuestionLog_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

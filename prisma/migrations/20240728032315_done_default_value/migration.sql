/*
  Warnings:

  - Made the column `done` on table `FibonacciQuestionLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FibonacciQuestionLog" ALTER COLUMN "done" SET NOT NULL,
ALTER COLUMN "done" SET DEFAULT false;

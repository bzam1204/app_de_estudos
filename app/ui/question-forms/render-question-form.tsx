import TrueFalseForm from './true-false-form';
import ShortAnswerForm from "@/app/ui/question-forms/short-answer-form";
import MultipleChoiceForm from "@/app/ui/question-forms/MultipleChoiceForm";
import FlashCardForm from "@/app/ui/question-forms/flash-card-form";
import MatchingForm from "@/app/ui/question-forms/matching-form";
import EssayForm from "@/app/ui/question-forms/essay-form";
import SummaryForm from "@/app/ui/question-forms/summary-form";
import ActionItemForm from "@/app/ui/question-forms/action-item-form";
import FillInTheBlankForm from "@/app/ui/question-forms/fill-in-the-blank-form";
import MultipleResponseForm from "@/app/ui/question-forms/multiple-response-form";
import OrderingForm from "@/app/ui/question-forms/ordering-form";
import DragAndDropForm from "@/app/ui/question-forms/drag-and-drop-form";
import { QuestionTypeName } from '@prisma/client';

export default function renderQuestionForm(selection: QuestionTypeName) {
    switch (selection.toUpperCase()) {
        case 'TRUE_FALSE':
            return <TrueFalseForm />;
        case 'FLASH_CARD':
            return <FlashCardForm />;
        case 'MULTIPLE_CHOICE':
            return <MultipleChoiceForm />;
        case 'SHORT_ANSWER':
            return <ShortAnswerForm />;
        case 'MATCHING':
            return <MatchingForm />;
        case 'ESSAY':
            return <EssayForm />;
        case 'SUMMARY':
            return <SummaryForm />;
        case 'ACTION_ITEM':
            return <ActionItemForm />;
        case 'FILL_IN_THE_BLANK':
            return <FillInTheBlankForm />;
        case 'MULTIPLE_RESPONSE':
            return <MultipleResponseForm />;
        case 'ORDERING':
            return <OrderingForm />;
        case 'DRAG_AND_DROP':
            return <DragAndDropForm />;
        default:
            return null;
    }
}
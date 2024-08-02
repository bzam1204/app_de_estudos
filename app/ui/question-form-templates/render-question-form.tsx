import TrueFalseForm from './true-false-form';
import ShortAnswerForm from "@/app/ui/question-form-templates/short-answer-form";
import MultipleChoiceForm from "@/app/ui/question-form-templates/MultipleChoiceForm";
import FlashCardForm from "@/app/ui/question-form-templates/flash-card-form";
import MatchingForm from "@/app/ui/question-form-templates/matching-form";
import EssayForm from "@/app/ui/question-form-templates/essay-form";
import SummaryForm from "@/app/ui/question-form-templates/summary-form";
import ActionItemForm from "@/app/ui/question-form-templates/action-item-form";
import FillInTheBlankForm from "@/app/ui/question-form-templates/fill-in-the-blank-form";
import MultipleResponseForm from "@/app/ui/question-form-templates/multiple-response-form";
import OrderingForm from "@/app/ui/question-form-templates/ordering-form";
import DragAndDropForm from "@/app/ui/question-form-templates/drag-and-drop-form";
import { QuestionTypeName } from '@prisma/client';

export default function renderQuestionForm(selection: QuestionTypeName) {
    switch (selection) {
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
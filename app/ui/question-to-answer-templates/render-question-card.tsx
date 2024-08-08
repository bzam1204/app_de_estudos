// Code Generated with love
import { Question, QuestionTypeName } from '@prisma/client';
import SummaryQuestionCard from './summary-question-card';
import TrueFalseCardToAnswer from './true-false-card-to-answer';

interface Props {
    question: Question;
    index: number;
    key: number;
    selection: QuestionTypeName | null;
}

export default function RenderQuestionCard( { question, index, key, selection }: Props) {
    switch (selection!.toUpperCase()) {
        case 'TRUE_FALSE':
            return <TrueFalseCardToAnswer question={question} index={index} key={key} />;
        // case 'FLASH_CARD':
        //     return <FlashCardForm />;
        // case 'MULTIPLE_CHOICE':
        //     return <MultipleChoiceForm />;
        // case 'SHORT_ANSWER':
        //     return <ShortAnswerForm />;
        // case 'MATCHING':
        //     return <MatchingForm />;
        // case 'ESSAY':
        //     return <EssayForm />;
        case 'SUMMARY':
            return <SummaryQuestionCard question={question} index={index} key={key}/>;
        // case 'ACTION_ITEM':
        //     return <ActionItemForm />;
        // case 'FILL_IN_THE_BLANK':
        //     return <FillInTheBlankForm />;
        // case 'MULTIPLE_RESPONSE':
        //     return <MultipleResponseForm />;
        // case 'ORDERING':
        //     return <OrderingForm />;
        // case 'DRAG_AND_DROP':
        //     return <DragAndDropForm />;
        default:
            return null;
    }
}
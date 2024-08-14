// Code Generated with love
import { Question, QuestionTypeName } from '@prisma/client';
import TrueFalseReadOnlyTemplate from './true-false-read-only-template';
import SummaryReadOnlyTemplate from './summary-read-only-template';
import FlashCardReadOnlyTemplate from './flashcard-read-only-template';


interface Props {
    question: Question;
    index: number;
    key: number;
    selection: QuestionTypeName | null;
}

export default function RenderReadOnlyQuestion({ question, index, key, selection }: Props) {
    switch (selection!.toUpperCase()) {
        case 'TRUE_FALSE':
            return <TrueFalseReadOnlyTemplate question={question} key={key} />;
        case 'FLASH_CARD':
            return <FlashCardReadOnlyTemplate backContent={question.explanation} frontContent={question.body} key={key} />;
        // case 'MULTIPLE_CHOICE':
        //     return <MultipleChoiceForm />;
        // case 'SHORT_ANSWER':
        //     return <ShortAnswerForm />;
        // case 'MATCHING':
        //     return <MatchingForm />;
        // case 'ESSAY':
        //     return <EssayForm />;
        case 'SUMMARY':
            return <SummaryReadOnlyTemplate question={question} key={key} />;
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
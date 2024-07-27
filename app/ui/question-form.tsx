'use client'
import React from 'react';
import renderQuestionForm from '@/app/ui/question-templates/render-question-form';
import { QuestionTypeName } from '@prisma/client';
import SelectQuestionType from './select-question-type';

const QuestionForm: React.FC = () => {
  const [selection, setSelection] =
    React.useState<QuestionTypeName>("TRUE_FALSE");

  return (
    <div className='flex flex-col gap-4'>
      <SelectQuestionType selection={selection} setSelection={setSelection} />
      {renderQuestionForm(selection)}
    </div>
  );
}

export default QuestionForm;
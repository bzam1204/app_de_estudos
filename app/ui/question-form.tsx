'use client'
import React, { useState } from 'react';
import renderQuestionForm from '@/app/ui/question-forms/render-question-form';
import { QuestionTypeName } from '@prisma/client';
import SelectQuestionType from './select-question-type';

export default function QuestionForm() {
  const [selection, setSelection] = useState<QuestionTypeName>("SUMMARY");
  return (
    <div className='flex flex-col gap-4'>
      <SelectQuestionType selection={selection} setSelection={setSelection} />
    </div>
  );
}


import React, { useState } from 'react';
import './CreateCard.scss';
import ReactQuill from 'react-quill';
import module from '../../quill';
import Viewer from '../Viewer/Viewer';
import { htmlToMarkdown } from '../../common/parser';

const CreateCard = () => {
  const [questionValue, setQuestionValue] = useState<string>('');
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>('');
  const [answerValue, setAnswerValue] = useState<string>('');
  const handleSetQuestion = (content: string) => {
    setQuestionValue(content);
    console.log(htmlToMarkdown(content));
    setEditorMarkdownValue(htmlToMarkdown(content));
  };
  return (
    <div className='card-container'>
      <div className='question'>
        <ReactQuill
          className='react-quill-style'
          modules={module}
          theme='snow'
          value={questionValue}
          onChange={handleSetQuestion}
        />
      </div>
      <div id='preview'></div>
      <div className='answer'>
        {/* <ReactQuill
          className='react-quill-style'
          modules={module}
          theme='snow'
          value={answerValue}
          onChange={setAnswerValue}
        /> */}
        <Viewer value={editorMarkdownValue} />
      </div>
      {/* <Viewer value={questionValue} /> */}
    </div>
  );
};

export default CreateCard;

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'link',
    'image',
];

const TextEditor = () => {
    const [value, setValue] = useState('');

    const handleChange = (content: string, delta: any, source: any, editor: any) => {
        setValue(content);
    };

    return (
        <div className='w-full'>
            <ReactQuill className='w-full h-96'  value={value} onChange={handleChange} modules={modules} formats={formats} />
        </div>
    );
};

export default TextEditor;
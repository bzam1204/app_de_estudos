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

interface Props {
    ON_KEY_UP?: (e: any) => void;
}

const TextEditor = ({ ON_KEY_UP }: Props) => {
    const [value, setValue] = useState('');

    const handleChange = (content: string, delta: any, source: any, editor: any) => {
        setValue(content);
    };

    return (
        <ReactQuill onKeyUp={ON_KEY_UP} className='w-full grow mb-10 ' placeholder='Meu resumo começa assim...' value={value} onChange={handleChange} modules={modules} formats={formats} />
    );
};

export default TextEditor;
import React from 'react';
import 'quill/dist/quill.snow.css'; // Importa os estilos do Quill
import { inter } from '../fonts';

interface QuillRendererProps {
    content: string; // HTML content
}

const QuillRenderer: React.FC<QuillRendererProps> = ({ content }) => {
    return (
        <div
            className={`ql-container ql-snow no-border ${inter.className} `}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default QuillRenderer;
import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


interface Props {
    ON_KEY_UP?: (e: any) => void;
}

const TextEditor = ({ ON_KEY_UP }: Props) => {
    const quillRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState('');

    const handleChange = (content: string, delta: any, source: any, editor: any) => {
        setValue(content);
    };

    useEffect(() => {
        if (quillRef.current && toolbarRef.current) {
            const quill = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarRef.current // Especifica o contêiner de toolbar personalizado
                }
            });
        }
    }, []);

    return (
        <div>
            <div ref={toolbarRef} className="ql-toolbar ql-snow">
                <button className="ql-header" value="1"></button>
                <button className="ql-header" value="2"></button>
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-link"></button>
                {/* <button className="ql-image"></button> */}
            </div>
            <div onKeyUp={ON_KEY_UP} ref={quillRef} className="ql-container ql-snow" style={{ height: '300px' }}></div>
        </div>
    );
};

export default TextEditor;
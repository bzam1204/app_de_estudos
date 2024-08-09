import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor: React.FC = () => {
  const quillRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

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
      <div ref={quillRef} className="ql-container ql-snow" style={{ height: '300px' }}></div>
    </div>
  );
};

export default QuillEditor;
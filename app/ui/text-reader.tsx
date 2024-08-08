import Quill from "./Quill";

interface TextReaderProps {
    text: string;
}

const TextReader: React.FC<TextReaderProps> = ({ text }) => {
   
  
    return (
        <div>
          <div id="toolbar"></div>
          <div id="editor"></div>
        </div>
    );
};

export default TextReader;
import React, { useRef } from 'react';
// import './CustomEditor.css';

const CustomEditor = () => {
  const editorRef = useRef(null);

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div>
      <div className="toolbar">
        <button onMouseDown={(e) => { e.preventDefault(); formatText('bold'); }}>Bold</button>
        <button onMouseDown={(e) => { e.preventDefault(); formatText('italic'); }}>Italic</button>
        <button onMouseDown={(e) => { e.preventDefault(); formatText('underline'); }}>Underline</button>
        <button onMouseDown={(e) => { e.preventDefault(); formatText('createLink'); }}>Underline</button>
      </div>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning={true}
        style={{ border: '1px solid black', minHeight: '400px', padding: '10px' }}
      >
        Start editing...
      </div>
    </div>
  );
};

export default CustomEditor;
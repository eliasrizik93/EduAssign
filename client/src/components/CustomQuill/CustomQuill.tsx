import React, { useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const CustomQuill = (props: any) => {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      // Perform any additional setup or customization on the editor instance
    }
  }, []);

  return <ReactQuill ref={quillRef} {...props} />;
};

export default CustomQuill;

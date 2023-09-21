import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS styles for ReactQuill

const TextEditor = () => {
  return (
    <div>
      <ReactQuill theme="snow" />
    </div>
  );
};

export default TextEditor;

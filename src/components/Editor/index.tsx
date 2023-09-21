import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ config, value, onChange }: any) => {
  const editor = useRef(null);
  const contentChange = (content: string) => {
    onChange(content);
  };
  return (
    <JoditEditor
      ref={editor}
      value={value || ""}
      config={config}
      onChange={contentChange}
    />
  );
};
export default Editor;

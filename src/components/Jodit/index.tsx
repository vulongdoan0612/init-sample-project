import { useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'

const Jodit = ({ content, setContent }:any) => {
  const editor = useRef(null)
  const config2 = {
    useSearch: false,
    minHeight: 100,
    spellcheck: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minWidth: null,
    buttons:
      "bold,italic,underline,eraser,ul,ol,font,fontsize,lineHeight,hr,indent,outdent,left",
    placeHolder: "",
  };
  return (
    <JoditEditor
       ref={editor}
       config={config2}
        value={content}// tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
    />
  )
}
export default Jodit
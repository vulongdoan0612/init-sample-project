import { Button, Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import React from "react";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { applyJob } from "@/services/job";
import { toast } from "react-toastify";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ModalApply = ({ open, handleCancel, selectedItem }: any) => {
  const [form] = Form.useForm();

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
  const [postDescription, setPostDescription] = useState("");

  const contentFieldChanagedDescription = (data: any) => {
    setPostDescription(data);
  };

  const onFinish = async (values: any) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const valueSend = {
        coverLetter: values.coverLetter,
        jobId: selectedItem._id,
      };
      const res = await applyJob(valueSend, String(accessToken));
      if (res.data.message === "Bạn đã ứng tuyển rồi") {
        toast.warning(res.data.message)
      } else {
        toast.success(res.data.message)
      }
      console.log(res)
    } catch (error) {
      console.log(error);
    } finally {
      handleCancel();
    }
  };

  return (
    <CustomModal
      title={"Edit Banner"}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
      width={"50vw"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="coverLetter"
          label="Letter description"
          rules={[{ message: "Name is required" }]}
        >
          <JoditEditor
            config={config2}
            value={postDescription}
            onBlur={(c: any) => {
              contentFieldChanagedDescription(c);
            }}
          />
        </Form.Item>

        <div
          className="column-buttons flex justify-end"
          style={{ marginTop: "24px" }}
        >
          <Button htmlType="submit" type="primary">
            Add
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default ModalApply;

import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import React from "react";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { uploadJob } from "@/services/job";
import { toast } from "react-toastify";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ModalAddJob = ({
  open,
  handleCancel,
  selectedItem,
  pageSize,
  current,
  filter,
  type,
  fetchData,
}: any) => {
  const [form] = Form.useForm();
  const { account } = useSelector((state: RootState) => state.auth);

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
  const [postRequire, setPostRequire] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postWelfare, setPostWelfare] = useState("");
  const [postReason, setPostReason] = useState("");

  const contentFieldChanagedReason = (data: any) => {
    setPostReason(data);
  };
  const contentFieldChanagedWelfare = (data: any) => {
    setPostWelfare(data);
  };
  const contentFieldChanagedDescription = (data: any) => {
    setPostDescription(data);
  };

  const contentFieldChanagedRequire = (data: any) => {
    setPostRequire(data);
  };
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const notify = () => toast("Wow so easy!");

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("access_token");
      const valuesSend = {
        title: values?.title,
        email: account.email,
        company: account.companyName,
        slug: `${account.companyName}&${values?.title} `,
        salary: values?.salary,
        address: values?.address,
        rank: values?.rank,
        reason: values?.reason, //Top 3 reasons to join us
        deadline: values?.deadline,
        type: values?.type, //Skills
        welfare: values?.welfare, // Why you'll love working here
        description: values?.description, //Job description
        requirement: values?.requirement, //Your skills and experience
        anotherInformation: {
          countEmploy: account?.anotherInformation
            ? account?.anotherInformation?.countEmploy
            : "",
          workTime: account?.anotherInformation
            ? account?.anotherInformation?.workTime
            : "",
          ot: account?.anotherInformation
            ? account?.anotherInformation?.ot
            : "",
          anotherLocation: account?.anotherInformation
            ? account?.anotherInformation?.anotherLocation
            : "",
        },
      };

      const res = await uploadJob(valuesSend, String(token));
      if (res.status === 200) {
        toast.error(res.data.error);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(fetchListJobs({pageSize,current,filter,type}));
      fetchData();
      handleCancel();
    }
  };
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
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
          name="title"
          label="Title"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="salary"
          label="salary"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="address"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="rank"
          label="rank"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="deadline"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Skill">
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            onChange={handleChange}
            tokenSeparators={[","]}
            options={options}
          />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Top 3 reasons to join us"
          rules={[{ message: "Name is required" }]}
        >
          <JoditEditor
            config={config2}
            value={postReason}
            onBlur={(c: any) => {
              contentFieldChanagedReason(c);
            }}
          />
        </Form.Item>
        <Form.Item
          name="welfare"
          label="Why you'll love working here"
          rules={[{ message: "Name is required" }]}
        >
          <JoditEditor
            config={config2}
            value={postWelfare}
            onBlur={(c: any) => {
              contentFieldChanagedWelfare(c);
            }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Job description"
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

        <Form.Item
          name="requirement"
          label="Your skills and experience"
          rules={[{ message: "Name is required" }]}
        >
          <JoditEditor
            config={config2}
            value={postRequire}
            onBlur={(c: any) => {
              contentFieldChanagedRequire(c);
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
export default ModalAddJob;

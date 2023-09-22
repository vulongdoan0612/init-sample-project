import { editJob } from "@/services/job";
import CustomModal from "../CustomModal";
import { Button, Form, Input } from "antd";
import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchListCreateJob } from "@/redux/reducers/listCreateJob";
const Jodit = dynamic(() => import('../Jodit'), { ssr: false })

const ModalEditJob = ({ initDes, initRe, initReason, initWel,current,pageSize,filter, open, handleCancel, selectedItem }: any) => {
    const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm<{
    title: string;
    address: string;
    welfare: string;
    deadline: string;
    description: string;
    rank: string;
    reason: string;
    requirement: string;
    salary: string;
  }>();
  console.log(selectedItem);
  useEffect(() => {
    form.setFieldsValue({
      title: selectedItem?.title,
      address: selectedItem?.address,
      reason: selectedItem?.reason,
      description: selectedItem?.description,
      salary: selectedItem?.salary,
      rank: selectedItem?.rank,
      deadline: selectedItem?.deadline,
      requirement: selectedItem?.requirement,
      welfare: selectedItem?.welfare,
    });
  }, [
    form,
    selectedItem?.title,
    selectedItem?.address,
    selectedItem?.reason,
    selectedItem?.description,
    selectedItem?.salary,
    selectedItem?.rank,
    selectedItem?.deadline,
    selectedItem?.requirement,
    selectedItem?.welfare,
  ]);
  const [postRequire, setPostRequire] = useState('');
  const [postReason, setPostReason] = useState('');
  const [postWelfare, setPostWelfare] = useState('');
  const [postDescription, setPostDescription] = useState("");
  useEffect(() => {
    if (initDes) {
      setPostDescription(initDes);
    }
    if (initRe) {
      setPostRequire(initRe)
    }
    if (initReason) {
      setPostReason(initReason)
    }
    if (initWel) {
      setPostWelfare(initWel)
    }
  }, [initDes, initRe, initReason, initWel]);

  const onFinish = async (values: any) => {
    try {
      const send = {
        address: values.address,
        deadline: values.deadline,
        description: postDescription,
        rank: values.rank,
        reason: postReason,
        requirement: postRequire,
        salary: values.salary,
        title: values.title,
        welfare:postWelfare
      };
    const token = localStorage.getItem("access_token");
      await editJob(token, send, selectedItem?.slug);
      if (token) {
        dispatch(fetchListCreateJob({ token, pageSize, current, filter }));
      }
      console.log(values);
    } catch (error) {
      console.log(error);
    }
    finally {
      handleCancel()
    }
  };
  const contentFieldChanagedRequire = (data: any) => {
    setPostRequire(data);
  };
  const contentFieldChanagedReason = (data: any) => {
    setPostReason(data);
  };
  const contentFieldChanagedWelfare = (data: any) => {
    setPostWelfare(data);
  };
  const contentFieldChanagedDescription = (data: any) => {
    setPostDescription(data);
  };

  return (
    <CustomModal
      title={"Edit Plan"}
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
        initialValues={{
          title: selectedItem?.title,
          address: selectedItem?.address,
          deadline: selectedItem?.deadline,
          salary: selectedItem?.salary,
          requirement: selectedItem?.requirement,
          rank: selectedItem?.rank,
          reason: selectedItem?.reason,
          welfare: selectedItem?.welfare,
          description: selectedItem?.description,
        }}
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
          label="Salary"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rank"
          label="Rank"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="requirement"
          label="Your skills and experience"
          rules={[{ message: "Name is required" }]}
        >
          <Jodit
            content={postRequire}
            setContent={(c: any) => {
              contentFieldChanagedRequire(c);
            }}
          />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Top 3 reasons to join us"
          rules={[{ message: "Name is required" }]}
        >
          <Jodit
            content={postReason}
            setContent={(c: any) => {
              contentFieldChanagedReason(c);
            }}
          />
        </Form.Item>
        <Form.Item
          name="welfare"
          label="Why you'll love working here"
          rules={[{ message: "Name is required" }]}
        >
          <Jodit
            content={postWelfare}
            setContent={(c: any) => {
              contentFieldChanagedWelfare(c);
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Job description"
          rules={[{ message: "Name is required" }]}
        >
          <Jodit
            content={postDescription}
            setContent={(c: any) => {
              contentFieldChanagedDescription(c);
            }}
          />
        </Form.Item>
        <div
          className="column-buttons flex justify-end"
          style={{ marginTop: "24px" }}
        >
          <Button htmlType="submit" type="primary">
            Edit
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default ModalEditJob;

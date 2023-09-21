import { Button, Form, Input, Radio, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import React from "react";
import { RootState } from "@/redux/store";
import { uploadJob } from "@/services/job";

const ModalFilter = ({ open, handleCancel, fetchData }: any) => {
  const [form] = Form.useForm();
  const { account } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("access_token");
      const valuesSend = {
        title: values.title,
        email: account.email,
        company: account.companyName,
        slug: `${account.companyName}&${values.title} `,
        salary: values.salary,
        address: values.address,
        rank: values.rank,
        reason: values.reason, //Top 3 reasons to join us
        deadline: values.deadline,
        type: values.type, //Skills
        welfare: values.welfare, // Why you'll love working here
        description: values.description, //Job description
        requirement: values.requirement, //Your skills and experience
        anotherInformation: {
          countEmploy: account?.anotherInformation?.countEmploy,
          workTime: account?.anotherInformation?.workTime,
          ot: account?.anotherInformation?.ot,
          anotherLocation: account?.anotherInformation?.anotherLocation,
        },
      };
      await uploadJob(valuesSend, String(token));
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
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
          name="radio-button"
          label="Radio.Button"
          rules={[{ required: true, message: "Please pick an item!" }]}
        >
          <Radio.Group>
            <Radio.Button value="a">item 1</Radio.Button>
            <Radio.Button value="b">item 2</Radio.Button>
            <Radio.Button value="c">item 3</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ message: "Name is required" }]}
        >
          <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
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
export default ModalFilter;

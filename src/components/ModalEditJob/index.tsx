import CustomModal from "../CustomModal";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";

const ModalEditJob = ({ isEdit, open, handleCancel, selectedItem }: any) => {
  const [form] = Form.useForm<{ title: string; address: string }>();
  useEffect(() => {
    form.setFieldsValue({
      title: selectedItem?.title,
      address: selectedItem?.address,
    });
  }, [form, selectedItem?.title, selectedItem?.address]);
  const onFinish = async (values: any) => {
    try {
    } catch (error) {
      console.log(error);
    }
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
          name="address"
          label="Address"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
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

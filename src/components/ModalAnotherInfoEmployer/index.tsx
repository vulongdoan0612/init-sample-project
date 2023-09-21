import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { setAuthenticate } from "@/redux/reducers/auth";
import React from "react";
import { changeProfileEmployer } from "../../services/account";
import { RootState } from "@/redux/store";

const ModalAnotherInfoEmployer = ({
  open,
  handleCancel,
  selectedItem,
}: any) => {
  const [form] = Form.useForm<{
    countEmploy: string;
    workTime: string;
    ot: string;
    anotherLocation: string;
  }>();
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    form.setFieldsValue({
      countEmploy: selectedItem?.anotherInformation
        ? selectedItem?.anotherInformation.countEmploy
        : "",
      workTime: selectedItem?.anotherInformation
        ? selectedItem?.anotherInformation.workTime
        : "",
      ot: selectedItem?.anotherInformation
        ? selectedItem?.anotherInformation.ot
        : "",
      anotherLocation: selectedItem?.anotherInformation
        ? selectedItem?.anotherInformation.anotherLocation
        : "",
    });
  }, [
    form,
    selectedItem?.anotherInformation
      ? selectedItem?.anotherInformation.workTime
      : "",
    selectedItem?.anotherInformation
      ? selectedItem?.anotherInformation.countEmploy
      : "",
    selectedItem?.anotherInformation ? selectedItem?.anotherInformation.ot : "",
    selectedItem?.anotherInformation
      ? selectedItem?.anotherInformation.anotherLocation
      : "",
  ]);
  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("access_token");

      const valuesEdit = {
        ...account.anotherInformation,
        countEmploy: values.countEmploy,
        workTime: values.workTime,
        ot: values.ot,
        anotherLocation: values.anotherLocation,
      };

      const response = await changeProfileEmployer(
        { anotherInformation: valuesEdit, companyName: values.companyName },
        token
      );
      if (response.status === 200) {
        dispatch(
          setAuthenticate({
            isAuthenticated: true,
            account: response?.data.employer,
            loading: false,
          })
        );
      }
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
        initialValues={{
          countEmploy: selectedItem?.countEmploy,
          workTime: selectedItem?.workTime,

          ot: selectedItem?.ot,

          anotherLocation: selectedItem?.anotherLocation,
        }}
      >
        <Form.Item
          name="countEmploy"
          label="countEmploy"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="workTime"
          label="workTime"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="ot"
          label="OT"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="anotherLocation"
          label="anotherLocation"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>{" "}
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
export default ModalAnotherInfoEmployer;

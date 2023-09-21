import { Button, Form, Input, Upload } from "antd";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { setAuthenticate } from "@/redux/reducers/auth";
import React, { useState } from "react";

import type { UploadProps } from "antd";

import {
  changeProfile,
  changeProfileEmployer,
  deleteCV,
} from "../../services/account";
import { RootState } from "@/redux/store";

const ModalEditInfor = ({ open, handleCancel, selectedItem }: any) => {
  const [form] = Form.useForm<{
    id: string;
    birthdate: string;
    fax: string;
    address: string;
    major: string;
    username: string;
    phone: string;
    email: string;
    national: string;
    age: string;
    country: string;
    cvName: string;
  }>();
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);
  const [changeLoading, setChangeLoading] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      id: selectedItem?.id,
      username: selectedItem?.username,
      phone: selectedItem?.userInfo?.phone,
      cvName: selectedItem?.cvName,
      email: selectedItem?.email,
      national: selectedItem?.userInfo?.national,
      age: selectedItem?.userInfo?.age,
      country: selectedItem?.userInfo?.country,
      major: selectedItem?.userInfo?.major,
      address: selectedItem?.anotherInformation?.address,
      fax: selectedItem?.anotherInformation?.fax,
      birthdate: selectedItem?.anotherInformation?.birthdate,
    });
  }, [
    form,
    selectedItem?.id,
    selectedItem?.username,
    selectedItem?.userInfo?.phone,
    selectedItem?.email,
    selectedItem?.cvName,
    selectedItem?.userInfo?.national,
    selectedItem?.userInfo?.age,
    selectedItem?.userInfo?.country,
    selectedItem?.userInfo?.major,
    selectedItem?.anotherInformation?.address,
    selectedItem?.anotherInformation?.fax,
    selectedItem?.anotherInformation?.birthdate,
  ]);

  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("access_token");
      if (account?.role === "user") {
        setChangeLoading(true);
        const valuesEdit = {
          ...account.userInfo,
          phone: values.phone,
          email: values.email,
          national: values.national,
          country: values.country,
          age: values.age,
        };

        const response = await changeProfile(
          { userInfo: valuesEdit, username: values.username },
          token
        );
        if (response.status === 200) {
          setChangeLoading(false);

          dispatch(
            setAuthenticate({
              isAuthenticated: true,
              account: response?.data.user,
              loading: false,
            })
          );
        }
      } else {
        const valuesEdit = {
          ...account.anotherInformation,
          phone: values.phone,
          fax: values.fax,
          email: values.email,
          major: values.major,
          address: values.address,
          country: values.country,
          birthdate: values.birthdate,
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
          id: selectedItem?.id,
          username: selectedItem?.username,
          companyName: selectedItem?.companyName,

          fax: selectedItem?.fax,
          cvName: selectedItem?.cvName,
          phone: selectedItem?.phone,
          email: selectedItem?.email,
          national: selectedItem?.national,
          age: selectedItem?.age,
          country: selectedItem?.country,
        }}
      >
        {account?.role === "employer" ? (
          <Form.Item
            name="fax"
            label="Fax"
            rules={[{ message: "Fax is required" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
        {account?.role === "employer" ? (
          <Form.Item
            name="companyName"
            label="companyName"
            rules={[{ message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            name="username"
            label="Name"
            rules={[{ message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="email"
          label="email"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          name="phone"
          label="phone"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>{" "}
        {account?.role === "employer" ? (
          <Form.Item
            name="major"
            label="major"
            rules={[{ message: "Fax is required" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            name="national"
            label="national"
            rules={[{ message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
        )}
        {account?.role === "employer" ? (
          <Form.Item
            name="birthdate"
            label="birthdate"
            rules={[{ message: "Fax is required" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            name="age"
            label="Age"
            rules={[{ message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="country"
          label="country"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        {account?.role === "employer" ? (
          <Form.Item
            name="address"
            label="Address"
            rules={[{ message: "Fax is required" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
        <div
          className="column-buttons flex justify-end"
          style={{ marginTop: "24px" }}
        >
          <Button htmlType="submit" type="primary" loading={changeLoading}>
            Edit
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default ModalEditInfor;

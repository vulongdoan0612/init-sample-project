import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUndefined } from "lodash";
import CustomModal from "../CustomModal";
import { setAuthenticate } from "@/redux/reducers/auth";
import React from "react";
import { changeProfile, changeProfileEmployer } from "../../services/account";
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
  }>();
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    form.setFieldsValue({
      id: selectedItem?.id,
      username: selectedItem?.username,
      phone: selectedItem?.userInfo
        ? selectedItem?.userInfo[0]?.phone
        : selectedItem?.employerInfo
        ? selectedItem?.employerInfo[0]?.phone
        : "",
      email: selectedItem?.email,
      national: selectedItem?.userInfo
        ? selectedItem?.userInfo[0]?.national
        : "",
      age: selectedItem?.userInfo ? selectedItem?.userInfo[0]?.age : "",
      country: selectedItem?.userInfo
        ? selectedItem?.userInfo[0]?.country
        : selectedItem?.employerInfo
        ? selectedItem?.employerInfo[0]?.country
        : "",
      major: selectedItem?.userInfo
        ? selectedItem?.userInfo[0]?.major
        : selectedItem?.employerInfo
        ? selectedItem?.employerInfo[0]?.major
        : "",
      address: selectedItem?.employerInfo
        ? selectedItem?.employerInfo[0]?.address
        : "",
      fax: selectedItem?.employerInfo ? selectedItem?.employerInfo[0]?.fax : "",
      birthdate: selectedItem?.employerInfo
        ? selectedItem?.employerInfo[0]?.birthdate
        : "",
    });
  }, [
    form,
    selectedItem?.id,
    selectedItem?.username,
    selectedItem?.userInfo
      ? selectedItem?.userInfo[0]?.phone
      : selectedItem?.employerInfo
      ? selectedItem?.employerInfo[0]?.phone
      : "",
    selectedItem?.email,
    selectedItem?.userInfo ? selectedItem?.userInfo[0].national : "",
    selectedItem?.userInfo ? selectedItem?.userInfo[0].age : "",
    selectedItem?.userInfo
      ? selectedItem?.userInfo[0].country
      : selectedItem.employerInfo
      ? selectedItem?.employerInfo[0]?.country
      : "",
    selectedItem?.userInfo
      ? selectedItem?.userInfo[0].major
      : selectedItem.employerInfo
      ? selectedItem?.employerInfo[0]?.major
      : "",
    selectedItem?.employerInfo ? selectedItem?.employerInfo[0]?.address : "",
    selectedItem?.employerInfo ? selectedItem?.employerInfo[0]?.fax : "",
    selectedItem?.employerInfo ? selectedItem?.employerInfo[0]?.birthdate : "",
  ]);
  console.log(selectedItem);
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      const token = localStorage.getItem("access_token");
      if (account?.role === "user") {
        const valuesEdit = {
          ...account.userInfo[0],
          phone: values.phone,

          email: values.email,
          national: values.national,
          country: values.country,
          age: values.age,
        };
        console.log(valuesEdit);

        const response = await changeProfile(
          { userInfo: valuesEdit, username: values.username },
          token
        );
        if (response.status === 200) {
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
          ...account.employerInfo[0],
          phone: values.phone,
          fax: values.fax,
          email: values.email,
          major: values.major,
          address: values.address,

          country: values.country,
          birthdate: values.birthdate,
        };
        console.log(valuesEdit);

        const response = await changeProfileEmployer(
          { employerInfo: valuesEdit, companyName: values.companyName },
          token
        );
        console.log(response)
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
        {account?.role ==='employer' ?  <Form.Item
          name="companyName"
          label="companyName"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item> :  <Form.Item
          name="username"
          label="Name"
          rules={[{ message: "Name is required" }]}
        >
          <Input />
        </Form.Item>}
       
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
          <Button htmlType="submit" type="primary">
            Edit
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default ModalEditInfor;

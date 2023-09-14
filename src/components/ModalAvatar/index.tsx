import React, { useState } from "react";
import { Form, Upload, Button, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import CustomModal from "../CustomModal";
import { changeProfile } from "@/services/account";
import { setAuthenticate } from "@/redux/reducers/auth";
import { useDispatch } from "react-redux";
const { Item } = Form;

const ModalAvatar = ({ initialValues, open, handleCancel }: any) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]); // Thêm kiểu dữ liệu 'any[]' ở đây
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await changeProfile({ avatar: fileList }, token);
      if(response.status===200){

        dispatch(setAuthenticate({ isAuthenticated: true, account: response?.data.user, loading: false }));
      }
      console.log(response);
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
      handleCancel();
    }
  };
  

  const onChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <CustomModal
      title={"Edit Banner"}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
      width={"50vw"}
    >
      <Form form={form} onFinish={onFinish} initialValues={initialValues} encType="multipart/form-data">
        <Item label="Avatar"  name="avatar"> 
          <Upload
            // beforeUpload={() => false} // Disable auto-upload
            onChange={onChange}
            fileList={fileList}
            name="avatar" // Tên trường tải lên phải khớp với backend
          >
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </Item>
        {/* Các trường thông tin người dùng khác */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

export default ModalAvatar;

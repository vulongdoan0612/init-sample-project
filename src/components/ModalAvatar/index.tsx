import React, { useState } from "react";
import { Form, Upload, Button, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomModal from "../CustomModal";
import { changeProfile, changeProfileEmployer } from "@/services/account";
import { setAuthenticate } from "@/redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ImgCrop from "antd-img-crop";
const { Item } = Form;

const ModalAvatar = ({ initialValues, open, handleCancel }: any) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: any) => {
    console.log(fileList);
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (account.role === "user") {
        if (fileList.length > 0) {
          const response = await changeProfile({ avatar: fileList }, token);
          if (response.status === 200) {
            dispatch(
              setAuthenticate({
                isAuthenticated: true,
                account: response?.data.user,
                loading: false,
              })
            );
          }
        }
      } else {
        if (fileList.length > 0) {
          const response = await changeProfileEmployer(
            { avatar: fileList },
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
      }
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
  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <CustomModal
      title={"Edit Avatar"}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
      width={"20vw"}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        encType="multipart/form-data"
      >
        <Item label="" name="avatar" className="modal-avatar">
          <ImgCrop rotationSlider>
            <Upload
              onChange={onChange}
              fileList={fileList}
              listType="picture-card"
              onPreview={onPreview}
              maxCount={1}
              name="avatar"
            >
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
          </ImgCrop>
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

import { Button, Form, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { setAuthenticate } from "@/redux/reducers/auth";
import React from "react";
import { deleteCV, getProfile, uploadCv } from "../../services/account";
import { RootState } from "@/redux/store";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const ModalUploadCv = ({ open, handleCancel, selectedItemUpload }: any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { account, loading } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: any) => {
    const token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    try {
      dispatch(setAuthenticate({ loading: true }));
      const response = await uploadCv({ cv: values.cv }, token);
      handleCancel();
      if (response.status === 200) {
        dispatch(setAuthenticate({ loading: false }));

        if (token && refresh_token) {
          const response = await getProfile(
            String(token),
            String(refresh_token)
          );
          if (response?.user) {
            dispatch(
              setAuthenticate({
                isAuthenticated: true,
                account: response?.user,
                loading: false,
              })
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeDrag = (info: any) => {
    const { status } = info.file;
  };
  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      handleCancel();
      dispatch(setAuthenticate({ loading: true }));

      const res = await deleteCV(account?._id, String(accessToken));
      if (res.status === 200) {
        dispatch(setAuthenticate({ loading: false }));

        const token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if (token && refresh_token) {
          const response = await getProfile(
            String(token),
            String(refresh_token)
          );
          if (response?.user) {
            dispatch(
              setAuthenticate({
                isAuthenticated: true,
                account: response?.user,
                loading: false,
              })
            );
          }
        }
      }
    } finally {
    }
  };
  const onDrop = (e: any) => {
    console.log("Dropped files");
  };
  return (
    <CustomModal
      title={"Edit Banner"}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
      width={"50vw"}
    >
      {!account?.cvName ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="cv">
            <Dragger
              name="file"
              onDrop={onDrop}
              onChange={onChangeDrag}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>
          <div
            className="column-buttons flex justify-end"
            style={{ marginTop: "24px" }}
          >
            <Button htmlType="submit" type="primary" loading={loading}>
              Add
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <iframe src={account?.cv} width="100%" height="500px"></iframe>
          <Button onClick={handleDelete} loading={loading}>
            Delete
          </Button>{" "}
        </>
      )}
    </CustomModal>
  );
};
export default ModalUploadCv;

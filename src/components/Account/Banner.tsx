import { RootState } from "@/redux/store";
import { Image, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAvatar from "../ModalAvatar";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    console.log('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.log('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const Banner = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(account?.avatar);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCloseModalEdit = () => {
    setIsModalVisible(false);
  };
  const handleEdit = () => {

    setIsModalVisible(true);

  };

  return (
    <div className="banner-component">
      <div className="banner">
        <Image src="/images/banner-account.png" preview={false}></Image>
        <div className="avatar">
          {/* <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              
              ) : (
                uploadButton
                )}
              </Upload> */}

          <div className="right-username">
            <span className="username">
              <Image src={account?.avatar} onClick={handleEdit} preview={false}></Image>
              <div className="right">
                <span>{account?.username ? account?.username : account?.companyName}</span>
                <span className="id">{account?._id}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <ModalAvatar open={isModalVisible}
        handleCancel={handleCloseModalEdit}
      ></ModalAvatar>
    </div>
  );
};
export default Banner;

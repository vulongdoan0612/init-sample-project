import { RootState } from "@/redux/store";
import { Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import ModalAvatar from "../ModalAvatar";

const Banner = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
          <div className="right-username">
            <span className="username">
              <Image
                src={account?.avatar}
                onClick={handleEdit}
                preview={false}
              ></Image>
              <div className="right">
                <span>
                  {account?.username ? account?.username : account?.companyName}
                </span>
                <span className="id">{account?._id}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <ModalAvatar
        open={isModalVisible}
        handleCancel={handleCloseModalEdit}
      ></ModalAvatar>
    </div>
  );
};
export default Banner;

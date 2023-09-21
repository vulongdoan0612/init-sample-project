import { Button, Image } from "antd";
import moment from "moment";
import React, { useState } from "react";
import ModalApply from "../ModalApply";

const DetailApplier = (props: any) => {
  const { detailOpening } = props;
  const [selectedItem, setSelectedItem] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleApply = () => {
    try {
      setSelectedItem(detailOpening);
    } catch {
      console.log({
        message: "An error has occurred. Please try again later.",
        description: "Error",
      });
    } finally {
      setIsModalVisible(true);
    }
  };
  const handleCancle = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="detail-job-component">
      <div className="sticky-head">
        <div className="head">
          <div className="avatar">
            <Image src={detailOpening?.applier?.avatar} preview={false}></Image>
          </div>
          <div className="title">
            <h3>{detailOpening?.applier?.username}</h3>
            <span>{detailOpening?.applier?.email}</span>
            <span>{detailOpening?.applier?.userInfo?.country}</span>
          </div>
        </div>
        <div className="apply-now">
          <Button onClick={handleApply}>Apply Now</Button>
        </div>
      </div>
      <div className="content">
        <div className="line"></div>
        <iframe src={detailOpening?.cv} width="100%" height="600px"></iframe>
      </div>
      <ModalApply
        open={isModalVisible}
        handleCancel={handleCancle}
        selectedItem={selectedItem}
      ></ModalApply>
    </div>
  );
};
export default DetailApplier;

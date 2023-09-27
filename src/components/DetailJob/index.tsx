import { Button, Image } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { LocationIcon } from "../CustomIcons";
import moment from "moment";
import React, { useState } from "react";
import ModalApply from "../ModalApply";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

const DetailJob = (props: any) => {
  const { detailOpening } = props;
  const [selectedItem, setSelectedItem] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { account } = useSelector((state: RootState) => state.auth);

  const currentTime = moment(); // Thời gian hiện tại
  const timeAgo = currentTime.diff(moment(detailOpening?.updatedAt), "hours");
  const handleApply = () => {
    if (account) {
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
    } else {
      
      toast.error('Bạn cần phải đăng nhập');
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
            <Image src={detailOpening?.avatar} preview={false}></Image>
          </div>
          <div className="title">
            <h3>{detailOpening?.title}</h3>
            <span className="company">{detailOpening?.company}</span>
            <div className="salary">
              {" "}
              <DollarOutlined />
              <span className="money">{detailOpening?.salary}</span>
            </div>
          </div>
        </div>
        <div className="apply-now">
          <Button onClick={handleApply}>Apply Now</Button>
        </div>
      </div>
      <div className="content">
        <div className="address">
          <span className="first">
            <LocationIcon></LocationIcon>
            <span className="location"> At office</span>
          </span>
          <span className="second">
            <LocationIcon></LocationIcon>
            <span className="location"> {detailOpening?.address} </span>
          </span>
          <span className="last">
            <LocationIcon></LocationIcon>
            <span className="location">
              {" "}
              {timeAgo === 0 ? (
                <span>Ngay bây giờ </span>
              ) : (
                <span>{`${timeAgo} giờ trước`}</span>
              )}
            </span>
          </span>
        </div>
        <div className="skill">
          <span>Skill:</span>{" "}
          <div className="major-skill">
            {detailOpening?.type?.map((item: string, index: number) => {
              return <Button key={index}>{item}</Button>;
            })}
          </div>
        </div>
        <div className="line"></div>
        <div className="reason">
          <h3>Top 3 reasons to join us</h3>
          <div
            dangerouslySetInnerHTML={{ __html: detailOpening?.reason }}
          ></div>
        </div>
        <div className="line"></div>
        <div className="job-description">
          <h3>Job description</h3>
          <span
            dangerouslySetInnerHTML={{ __html: detailOpening?.description }}
          ></span>
        </div>
        <div className="line"></div>

        <div className="experience">
          <h3>Your skills and experience</h3>
          <div
            className="must-have"
            dangerouslySetInnerHTML={{ __html: detailOpening?.requirement }}
          ></div>
        </div>
        <div className="line"></div>
        <div className="why-love">
          <h3>Why youll love working here</h3>
          <div
            dangerouslySetInnerHTML={{ __html: detailOpening?.welfare }}
          ></div>
        </div>
        <div className="line"></div>
        <div className="footer">
          <div className="name">{detailOpening?.company}</div>
          <div className="description">
            We provide IT solutions by developing software platform for business
            operation.
          </div>
          <div className="info">
            <div className="title">
              <span>
                <span className="type">Company type</span>
                <span className="type-content">Product</span>
              </span>
              <span>
                <span className="day">Working days</span>
                <span className="day-content">
                  {detailOpening?.anotherInformation?.workTime}
                </span>
              </span>
            </div>

            <div className="title-2">
              <span>
                <span className="size">Company size</span>
                <span className="size-content">
                  {detailOpening?.anotherInformation?.countEmploy}
                </span>
              </span>
              <span>
                <span className="ot">Overtime policy</span>
                <span className="ot-content">
                  {detailOpening?.anotherInformation?.ot}
                </span>
              </span>
            </div>
            <div className="title-3">
              <span className="country">Country</span>
              <span className="country-content">
                {detailOpening?.anotherInformation?.anotherLocation}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ModalApply
        open={isModalVisible}
        handleCancel={handleCancle}
        selectedItem={selectedItem}
      ></ModalApply>
    </div>
  );
};
export default DetailJob;

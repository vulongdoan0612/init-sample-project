import { RootState } from "@/redux/store";
import { UserOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import ModalEditInfor from "../ModalEditInfor";
import ModalEditPlan from "../ModalEditPlan";

const Content = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisiblePlan, setIsModalVisiblePlan] = useState<boolean>(false);
  const [selectedItemPlan, setSelectedItemPlan] = useState([]);

  const [selectedItem, setSelectedItem] = useState([]);
  const { account } = useSelector((state: RootState) => state.auth);
  const handleEdit = () => {
    try {
      setSelectedItem(account);
    } catch {
      console.log({
        message: "An error has occurred. Please try again later.",
        description: "Error",
      });
    } finally {
      setIsModalVisible(true);
    }
  };
  const handleEditPlan = () => {
    try {
      console.log(account);
      setSelectedItemPlan(account);
    } catch {
      console.log({
        message: "An error has occurred. Please try again later.",
        description: "Error",
      });
    } finally {
      setIsModalVisiblePlan(true);
    }
  };

  const handleCloseModalEdit = () => {
    setIsModalVisible(false);
  };
  const handleCloseModalEditPlan = () => {
    setIsModalVisiblePlan(false);
  };
  const [tab, setTab] = useState("overview");

  console.log(account);
  const onChange = (key: string) => {
    setTab(key);
  };


  return (
    <>
      <Tabs
        activeKey={tab}
        onChange={onChange}
        className="custom-antd-tab"
        items={[
          {
            label: "Information",
            key: "overview",
            children: (
              <>
                <div className="content-component">
                  {account?.companyName ? (
                    <>
                      <div className="header">
                        <div className="left">
                          <UserOutlined />
                          <span>Thông tin cá nhân *</span>
                        </div>
                        <Button onClick={() => handleEdit()}>Chỉnh sửa</Button>
                      </div>
                      <div className="content">
                        <div className="left-column">
                          {" "}
                          <span>Tên Công ty</span>
                          <span>Email cty</span>
                          <span>SDT cty</span>
                          <span>địa chỉ</span>
                          <span>Mã số fax cty</span>
                          <span>Quốc gia</span>
                          <span>Lĩnh vực</span>
                          <span>Ngày thành lập</span>
                        </div>
                        <div className="right-column">
                          <span className="name">
                            <span> {account?.companyName}</span>
                          </span>
                          <span className="email">
                            <span>{account?.email}</span>
                          </span>
                          <span className="national">
                            <span>
                              {account?.employerInfo
                                ? account?.employerInfo[0]?.phone
                                : ""}
                            </span>
                          </span>
                          <span className="national">
                            <span>
                              {account?.employerInfo
                                ? account?.employerInfo[0]?.address
                                : ""}
                            </span>
                          </span>
                          <span className="married">
                            <span>
                              {account?.employerInfo
                                ? account?.employerInfo[0]?.fax
                                : ""}
                            </span>
                          </span>
                          <span className="country">
                            <span>
                              {account?.employerInfo
                                ? account?.employerInfo[0]?.country
                                : ""}
                            </span>
                          </span>
                          <span className="country">
                            <span>
                              {account?.employerInfo
                                ? account?.employerInfo[0]?.major
                                : ""}
                            </span>
                          </span>
                          <span className="country">
                            <span>
                              {account?.employerInfo
                                ? account?.employerInfo[0]?.birthdate
                                : ""}
                            </span>
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="header">
                        <div className="left">
                          <UserOutlined />
                          <span>Thông tin cá nhân *</span>
                        </div>
                        <Button onClick={() => handleEdit()}>Chỉnh sửa</Button>
                      </div>
                      <div className="content">
                        <div className="left-column">
                          {" "}
                          <span>Họ và Tên </span>
                          <span>Email</span>
                          <span>SDT</span>
                          <span>Tuổi</span>
                          <span>Quốc tịch </span>
                          <span>Quốc gia</span>
                        </div>
                        <div className="right-column">
                          <span className="name">
                            <span> {account?.username}</span>
                          </span>
                          <span className="email">
                            <span>{account?.email}</span>
                          </span>
                          <span className="national">
                            <span>
                              {account?.userInfo
                                ? account?.userInfo[0]?.phone
                                : ""}
                            </span>
                          </span>
                          <span className="national">
                            <span>
                              {account?.userInfo
                                ? account?.userInfo[0]?.age
                                : ""}
                            </span>
                          </span>
                          <span className="married">
                            <span>
                              {account?.userInfo
                                ? account?.userInfo[0]?.national
                                : ""}
                            </span>
                          </span>
                          <span className="country">
                            <span>
                              {account?.userInfo
                                ? account?.userInfo[0]?.country
                                : ""}
                            </span>
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {account?.role === "user" ? (
                  <div className="content-component">
                    <div>
                      <div className="header">
                        <div className="left">
                          <UserOutlined />
                          <span>Định hướng nghề nghiệp *</span>
                        </div>
                        <Button onClick={() => handleEditPlan()}>
                          Chỉnh sửa
                        </Button>
                      </div>
                      <div className="content">
                        <span className="name">
                          {account?.userInfo ? account?.userInfo[0]?.plan : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ),
          },
          {
            label: "List CV",
            key: "inprogress",
            children: <div></div>,
          },
        ]}
      />

      <ModalEditInfor
        open={isModalVisible}
        handleCancel={handleCloseModalEdit}
        selectedItem={selectedItem}
      ></ModalEditInfor>
      <ModalEditPlan
        open={isModalVisiblePlan}
        handleCancel={handleCloseModalEditPlan}
        selectedItem={selectedItemPlan}
      ></ModalEditPlan>
    </>
  );
};
export default Content;

import { RootState } from "@/redux/store";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Tabs,
  Skeleton,
  Upload,
  Table,
  TableProps,
  Pagination,
  Dropdown,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ModalEditInfor from "../ModalEditInfor";
import ModalEditPlan from "../ModalEditPlan";
import ModalAnotherInfoEmployer from "../ModalAnotherInfoEmployer";
import ModalUploadCv from "../ModalUploadCV";
import { fetchListAppliedJob } from "@/redux/reducers/appliedJob";
import { fetchListCreateJob } from "@/redux/reducers/listCreateJob";
import useDidMountEffect from "@/utils/customHook";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import ModalEditJob from "../ModalEditJob";

const Content = () => {
  const [isModalVisibleJob, setIsModalVisibleJob] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisiblePlan, setIsModalVisiblePlan] = useState<boolean>(false);
  const [isModalVisibleUpload, setIsModalVisibleUpload] =
    useState<boolean>(false);
  const [pageSize, setPagesize] = useState(10);

  const [isModalVisibleAnother, setIsModalVisibleAnother] =
    useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const { applied } = useSelector((state: RootState) => state.appliedJob);
  const { listCreateJob, loadingCreateJob } = useSelector(
    (state: RootState) => state.listCreateJob
  );

  const [selectedItemUpload, setSelectedItemUpload] = useState([]);
  const [selectedItemJob, setSelectedItemJob] = useState([]);
  const [selectedItemPlan, setSelectedItemPlan] = useState([]);
  const [selectedItemAnother, setSelectedItemAnother] = useState([]);
  const [current, setCurrent] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [selectedItem, setSelectedItem] = useState([]);
  const [loadingPage, setLoadingPage] = useState<any>(false);

  const { account, loading } = useSelector((state: RootState) => state.auth);

  useDidMountEffect(() => {
    fetchApplied();
  }, [filter, current]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const fetchApplied = async () => {
    const token = localStorage.getItem("access_token");
    if (account?.role === "user") {
      if (token) {
        dispatch(fetchListAppliedJob(token));
      }
    } else {
      if (token) {
        dispatch(fetchListCreateJob({ token, pageSize, current, filter }));
      }
    }
  };

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
  const handleEditAnotherInfo = () => {
    try {
      setSelectedItemAnother(account);
    } catch {
      console.log({
        message: "An error has occurred. Please try again later.",
        description: "Error",
      });
    } finally {
      setIsModalVisibleAnother(true);
    }
  };
  const handleEditPlan = () => {
    try {
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
  const handleEditUpload = () => {
    try {
      setSelectedItemUpload(account);
    } catch {
      console.log({
        message: "An error has occurred. Please try again later.",
        description: "Error",
      });
    } finally {
      setIsModalVisibleUpload(true);
    }
  };

  const handleCloseModalEdit = () => {
    setIsModalVisible(false);
  };
  const handleCloseModalEditJob = () => {
    setIsModalVisibleJob(false);
  };
  const handleCloseModalEditAnother = () => {
    setIsModalVisibleAnother(false);
  };
  const handleCloseModalEditPlan = () => {
    setIsModalVisiblePlan(false);
  };
  const handleCloseModalEditUpload = () => {
    setIsModalVisibleUpload(false);
  };
  const [tab, setTab] = useState("overview");

  const onChange = (key: string) => {
    setTab(key);
  };

  useEffect(() => {
    setLoadingPage(loading);
  });

  const columns: TableProps<any>["columns"] = [
    {
      title: "Company",
      dataIndex: ["job", "company"],
      key: "company",
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: ["job", "title"],
      key: "title",
      fixed: "left",
    },
    {
      title: "Address",
      dataIndex: ["job", "address"],
      key: "address",
    },
    {
      title: "Rank",
      dataIndex: ["job", "rank"],
      key: "rank",
    },
    {
      title: "Salary",
      dataIndex: ["job", "salary"],
      key: "salary",
    },
    {
      title: "Time",
      dataIndex: "appliedAt",
      key: "appliedAt",
    },
    {
      title: "CV",
      dataIndex: "cv",
      fixed: "right",
      width: 50,
      key: "cv",
      render: (text: string) => <a href={text}>CV Link</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      fixed: "right",
      width: 50,
      key: "status",
      // render: (text:string) => <a href={text}>CV Link</a>,
    },
  ];
  const handleEditJob = (item: any) => {
    try {
      setSelectedItemJob(item);
    } finally {
      setIsModalVisibleJob(true);
    }
  };
  const handleViewList = (item: any) => {
    window.open(`/employer/list-user-apply-job/${item._id}`, "_blank");
  };
  const handleChange = (value: string) => {
    setFilter(value);
  };

  const columnsListJob: TableProps<any>["columns"] = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sortOrder: filter === "newest" ? "ascend" : "descend",
      sorter: (a, b) => a.age - b.age,
      onHeaderCell: () => ({
        onClick: () => {
          setFilter(filter === "newest" ? "oldest" : "newest");
        },
      }),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },

    {
      title: "List Applier",
      dataIndex: "List Applier",
      key: "List Applier",
      render: (_, record) => (
        <span onClick={() => handleViewList(record)}>View</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                label: <p onClick={() => handleEditJob(record)}>Edit</p>,
                key: "0",
              },
              {
                type: "divider",
              },
              {
                label: <p>Delete</p>,
                key: "1",
              },
            ],
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>More</Space>
          </a>
        </Dropdown>
      ),
    },
  ];
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
                {account?.role && (
                  <>
                    {" "}
                    <div className="content-component">
                      <Skeleton loading={loadingPage}>
                        {account?.companyName ? (
                          <>
                            <div className="header">
                              <div className="left">
                                <UserOutlined />
                                <span>Thông tin cá nhân *</span>
                              </div>
                              <Button onClick={() => handleEdit()}>
                                Chỉnh sửa
                              </Button>
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
                                    {account?.anotherInformation?.phone}
                                  </span>
                                </span>
                                <span className="national">
                                  <span>{account?.address}</span>
                                </span>
                                <span className="married">
                                  <span>
                                    {account?.anotherInformation?.fax}
                                  </span>
                                </span>
                                <span className="country">
                                  <span>
                                    {account?.anotherInformation?.country}
                                  </span>
                                </span>
                                <span className="country">
                                  <span>
                                    {account?.anotherInformation?.major}
                                  </span>
                                </span>
                                <span className="country">
                                  <span>
                                    {account?.anotherInformation?.birthdate}
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
                              {account?.username && account?.email && (
                                <Button onClick={() => handleEdit()}>
                                  Chỉnh sửa
                                </Button>
                              )}
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
                                <span>CV</span>
                              </div>
                              <div className="right-column">
                                <span className="name">
                                  <span> {account?.username}</span>
                                </span>
                                <span className="email">
                                  <span>{account?.email}</span>
                                </span>
                                <span className="national">
                                  <span>{account?.userInfo?.phone}</span>
                                </span>
                                <span className="national">
                                  <span>{account?.userInfo?.age}</span>
                                </span>
                                <span className="married">
                                  <span>{account?.userInfo?.national}</span>
                                </span>
                                <span className="country">
                                  <span>{account?.userInfo?.country}</span>
                                </span>
                                <span className="cv">
                                  <span>{account?.cvName}</span>
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </Skeleton>
                    </div>
                    {account?.role === "user" ? (
                      <div className="content-component-2">
                        <Skeleton loading={loadingPage}>
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
                                {account?.userInfo?.plan}
                              </span>
                            </div>
                          </div>
                        </Skeleton>
                      </div>
                    ) : account?.role === "employer" ? (
                      <div className="content-component">
                        <Skeleton loading={loadingPage}>
                          {account?.companyName ? (
                            <>
                              <div className="header">
                                <div className="left">
                                  <UserOutlined />
                                  <span>Thông tin cá nhân *</span>
                                </div>
                                <Button onClick={() => handleEditAnotherInfo()}>
                                  Chỉnh sửa
                                </Button>
                              </div>
                              <div className="content">
                                <div className="left-column">
                                  {" "}
                                  <span>Số lượng nhân viên</span>
                                  <span>Thời gian làm việc</span>
                                  <span>Chính sách tăng ca</span>
                                  <span>Các Chi Nhánh Khác</span>
                                </div>
                                <div className="right-column">
                                  <span className="name">
                                    <span>
                                      {" "}
                                      {account?.anotherInformation?.countEmploy}
                                    </span>
                                  </span>
                                  <span className="email">
                                    <span>
                                      {account?.anotherInformation?.workTime}
                                    </span>
                                  </span>

                                  <span className="name">
                                    <span>
                                      {" "}
                                      {account?.anotherInformation?.ot}
                                    </span>
                                  </span>
                                  <span className="email">
                                    <span>
                                      {
                                        account?.anotherInformation
                                          ?.anotherLocation
                                      }
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
                                <Button onClick={() => handleEdit()}>
                                  Chỉnh sửa
                                </Button>
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
                                    <span>{account?.userInfo?.phone}</span>
                                  </span>
                                  <span className="national">
                                    <span>{account?.userInfo?.age}</span>
                                  </span>
                                  <span className="married">
                                    <span>{account?.userInfo?.national}</span>
                                  </span>
                                  <span className="country">
                                    <span>{account?.userInfo?.country}</span>
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </Skeleton>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ),
          },
          {
            label: "List CV",
            key: "inprogress",
            children: (
              <div className="management-cv">
                <div className="check-cv">
                  <Button onClick={handleEditUpload}>
                    {account?.cvName ? "Xem CV" : "Upload"}
                  </Button>
                </div>
                <div className="wrapper-job">
                  <div className="job-page">
                    <div className="left">
                      {loading || loadingCreateJob ? (
                        <Skeleton
                          loading={loading || loadingCreateJob}
                          active
                          avatar
                        />
                      ) : (
                        <>
                          <Table
                            pagination={false}
                            dataSource={
                              account?.role === "user"
                                ? applied.applicants
                                : listCreateJob.listJob
                            }
                            columns={
                              account?.role === "user"
                                ? columns
                                : columnsListJob
                            }
                          />
                          {!isEmpty(applied) && !loading ? (
                            <Pagination
                              current={current}
                              onChange={onChangePage}
                              total={applied?.total}
                            ></Pagination>
                          ) : (
                            <></>
                          )}
                          ;
                        </>
                      )}
                    </div>
                    <div className="right"></div>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
      <ModalAnotherInfoEmployer
        open={isModalVisibleAnother}
        handleCancel={handleCloseModalEditAnother}
        selectedItem={selectedItemAnother}
      ></ModalAnotherInfoEmployer>
      <ModalEditInfor
        open={isModalVisible}
        handleCancel={handleCloseModalEdit}
        selectedItem={selectedItem}
      ></ModalEditInfor>
      <ModalEditJob
        open={isModalVisibleJob}
        handleCancel={handleCloseModalEditJob}
        selectedItem={selectedItemJob}
      ></ModalEditJob>
      <ModalEditPlan
        open={isModalVisiblePlan}
        handleCancel={handleCloseModalEditPlan}
        selectedItem={selectedItemPlan}
      ></ModalEditPlan>
      <ModalUploadCv
        open={isModalVisibleUpload}
        handleCancel={handleCloseModalEditUpload}
        selectedItem={selectedItemUpload}
      ></ModalUploadCv>
    </>
  );
};
export default Content;

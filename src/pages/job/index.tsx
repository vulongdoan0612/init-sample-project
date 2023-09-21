import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import ListJob from "@/components/Job";
import { Pagination, Button, Select } from "antd";
import CustomSelect from "@/components/CustomSelect";
import ModalAddJob from "@/components/ModalAddJob";
import useDidMountEffect from "@/utils/customHook";
import { fetchListJobs } from "@/redux/reducers/jobs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import ModalFilter from "@/components/ModalFilter";
import { isEmpty } from "lodash";

const Store = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPagesize] = useState(10);
  const [type, setType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleFilter, setIsModalVisibleFilter] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading } = useSelector((state: RootState) => state.jobs);
  const [filter, setFilter] = useState("newest");
  const { account } = useSelector((state: RootState) => state.auth);

  useDidMountEffect(() => {
    fetchData();
  }, [current]);
  const handleSearch = () => {
    fetchData();
  };
  const fetchData = () => {
    try {
      dispatch(fetchListJobs({ pageSize, current, filter, type }));
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };
  const handleChange = (value: string) => {
    setFilter(value);
  };
  const handleAdd = () => {
    setIsModalVisible(true);
  };
  const handleFilter = () => {
    setIsModalVisibleFilter(true);
  };
  const onChange = (page: number) => {
    setCurrent(page);
  };
  const handleCancle = () => {
    setIsModalVisible(false);
  };
  const handleCancleFilter = () => {
    setIsModalVisibleFilter(false);
  };
  return (
    <Page title={PAGE_TITLE.HOME}>
      <div className="wrapper-page-job">
        <div className="page-head">
          <div className="add">
            <div className="small-filter">
              <CustomSelect setType={setType}></CustomSelect>
              <Select
                onChange={handleChange}
                defaultValue="newest"
                style={{ width: 120 }}
                loading={loading}
                options={[
                  { value: "newest", label: "Newest" },
                  { value: "oldest", label: "Oldest" },
                ]}
              />
            </div>
            {account?.role === "employer" ? (
              <div className="button">
                <Button onClick={handleAdd}>Add Job</Button>
                {/* <Button>Filter</Button> */}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="add-right">
            {" "}
            <Button onClick={handleSearch}>Search Job</Button>{" "}
            <Button onClick={handleFilter}>Filter</Button>
          </div>
        </div>
        <ListJob
          listJob={jobs}
          firstJob={
            jobs?.allJobs && jobs.allJobs.length > 0 ? jobs.allJobs[0] : null
          }
        ></ListJob>
        {!isEmpty(jobs) && !loading ? (
          <Pagination
            current={current}
            onChange={onChange}
            total={jobs?.total}
          ></Pagination>
        ) : (
          <></>
        )}

        <ModalFilter
          open={isModalVisibleFilter}
          handleCancel={handleCancleFilter}
        ></ModalFilter>
        <ModalAddJob
          open={isModalVisible}
          pageSize={pageSize}
          current={current}
          filter={filter}
          type={type}
          fetchData={fetchData}
          handleCancel={handleCancle}
        ></ModalAddJob>
      </div>
    </Page>
  );
};
export default Store;

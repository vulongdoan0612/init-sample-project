import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { fetchListUserAppliedJob } from "@/redux/reducers/userAppliedJob";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pagination, Skeleton } from "antd";
import CardProfile from "@/components/CardProfile";
import { isEmpty } from "lodash";
import DetailApplier from "@/components/DetailApplier";

const ListUserApply = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPagesize] = useState(10);

  const dispatch = useDispatch<AppDispatch>();
  const { userAppliedJob, loading } = useSelector(
    (state: RootState) => state.userAppliedJob
  );
  const { id } = router.query;
  const [active, setActive] = useState(null);
  const [detailOpening, setDetailOpening] = useState(
    userAppliedJob && userAppliedJob?.data?.length > 0
      ? userAppliedJob?.data[0]
      : []
  );
  useEffect(() => {
    setDetailOpening(
      userAppliedJob && userAppliedJob?.data?.length > 0
        ? userAppliedJob?.data[0]
        : []
    );
  });
  useEffect(() => {
    setDetailOpening(detailOpening);
  }, [detailOpening]);
  const fetchApplied = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && id) {
      dispatch(fetchListUserAppliedJob({ accessToken, id }));
    }
  };
  const onChange = (page: number) => {
    setCurrent(page);
  };
  const handleClickOpen = (item: any) => {
    // setActive(true)
    setActive(item._id);
    setDetailOpening(item);
  };
  useEffect(() => {
    fetchApplied();
  }, [id])
  console.log(detailOpening.applicant);
  return (
    <Page title={PAGE_TITLE.HOME} loadingData={false}>
      <div className="wrapper-job-profile">
        <div className="job-page">
          <div className="left">
            {loading ? (
              <Skeleton loading={loading} active avatar />
            ) : (
              <>
                {userAppliedJob?.data ? (
                  <>
                    {userAppliedJob?.data?.map((item: any, index: number) => {
                      return (
                        <div onClick={() => handleClickOpen(item)} key={index}>
                          <CardProfile
                            item={item}
                            active={active}
                          ></CardProfile>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <Image
                    src="/images/search-not-found.png"
                    preview={false}
                  ></Image>
                )}
              </>
            )}
            {/* {userAppliedJob.error ===
              "Không tìm thấy ứng viên cho công việc này." ? (
              <Image
                src="./images/search-not-found.png"
                preview={false}
              ></Image>
            ) : (
              <></>
            )} */}
          </div>
          {detailOpening?.applicant ? <div className="right">
              <DetailApplier detailOpening={detailOpening}></DetailApplier>
            </div> : <></>}
         
        </div>
      </div>
      {!isEmpty(userAppliedJob) && !loading ? (
        <Pagination
          current={current}
          onChange={onChange}
          total={userAppliedJob?.total}
        ></Pagination>
      ) : (
        <></>
      )}
    </Page>
  );
};
export default ListUserApply;

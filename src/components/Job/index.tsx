import CardJob from "../CardJob";
import DetailJob from "../DetailJob";
import { useEffect, useState } from "react";
import { Image, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isEmpty } from "lodash";

const ListJob = (props: any) => {
  const { listJob, firstJob } = props;
  const { loading } = useSelector((state: RootState) => state.jobs);
  const [detailOpening, setDetailOpening] = useState(firstJob);
  const [active, setActive] = useState(null);
  useEffect(() => {
    setDetailOpening(firstJob);
  }, [firstJob]);
  const handleClickOpen = (item: any) => {
    setActive(item._id);
    setDetailOpening(item);
  };
  return (
    <div className="wrapper-job">
      <div className="job-page">
        <div className="left">
          {loading ? (
            <Skeleton loading={loading} active avatar />
          ) : (
            <>
              {listJob?.allJobs?.map((item: any, index: number) => {
                return (
                  <div onClick={() => handleClickOpen(item)} key={index}>
                    <CardJob item={item} active={active}></CardJob>
                  </div>
                );
              })}
            </>
          )}
          {isEmpty(listJob) && !loading ? (
            <Image src="./images/search-not-found.png" preview={false}></Image>
          ) : (
            <></>
          )}
        </div>
        {firstJob !== null && (
          <div className="right">
            <DetailJob detailOpening={detailOpening}></DetailJob>
          </div>
        )}
      </div>
    </div>
  );
};
export default ListJob;

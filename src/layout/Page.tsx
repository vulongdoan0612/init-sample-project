import React, { useMemo } from "react";
import FullScreenLoading from "@/components/FullScreanLoading";
import SidebarHome from "@/components/SidebarHome";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";

interface PropsPage {
  title: string;
  loadingData?: boolean;
  children: React.ReactNode;
}
const TestimonialCard = dynamic(() => import("../components/Header/index"), {
  ssr: false,
});

const Page = (props: PropsPage) => {
  const { title, loadingData, children } = props;
  const page = useMemo(() => {
    if (loadingData) {
      return <FullScreenLoading />;
    }

    return <>{children}</>;
  }, [loadingData, children]);
  return (
    <>
      <div className="page" id="page">
        <div className="page-container">
          <div className="page-sidebar">
            <SidebarHome />
          </div>
          <div className="page-content">
            {title !== "LOGIN" ? (
              <div className={`page-header`}>
                <TestimonialCard />
              </div>
            ) : (
              <></>
            )}

            <div
              className={`page-wrapper ${
                title === "LOGIN" ? "disable-scroll" : ""
              }`}
            >
              <div
                className={`default-page ${
                  title === "LOGIN" ? "disable-margin" : ""
                }`}
              >
                {page}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};
export default Page;

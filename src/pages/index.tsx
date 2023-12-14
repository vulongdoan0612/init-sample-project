import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import Home from "@/components/Home";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useDidMountEffect from "@/utils/customHook";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HomePage() {
    const { account } = useSelector((state: RootState) => state.auth);

  useDidMountEffect(() => {
    const first = localStorage.getItem("first_login");
    if (first === "true") {
      try {
        toast.success(`Welcome back ${account?.companyName ? account?.companyName : account?.username}`);
      } finally {
        localStorage.setItem("first_login", "false");
      }
    }
  }, []);
  return (
    <Page title={PAGE_TITLE.HOME} loadingData={false}>
      <Home></Home>
    </Page>
  );
}

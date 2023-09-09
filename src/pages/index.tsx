
import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import Home from "@/components/Home";

export default function index() {
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <Page title={PAGE_TITLE.HOME} loadingData={loading}>
     <Home></Home>
    </Page>
  )
}

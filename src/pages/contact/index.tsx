import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";

const Contact =()=>{
    const [loading, setLoading] = useState(false);

    return(
        
        <Page title={PAGE_TITLE.HOME} loadingData={loading}>
        Contact Page</Page>
    )
}
export default Contact;
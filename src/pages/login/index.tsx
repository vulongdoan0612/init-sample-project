import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";

const Login =()=>{
    const [loading, setLoading] = useState(false);

    return(
        
        <Page title={PAGE_TITLE.HOME} loadingData={loading}>
        Login Page</Page>
    )
}
export default Login;
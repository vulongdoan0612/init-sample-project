import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";

const SignUp = () => {
    const [loading, setLoading] = useState(false);

    return (

        <Page title={PAGE_TITLE.HOME} loadingData={loading}>
            Sign Up Page</Page>
    )
}
export default SignUp;
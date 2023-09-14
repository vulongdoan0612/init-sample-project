import { useEffect, useState } from "react";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import ListJob from "@/components/Job";

const Store = () => {
    const [loading, setLoading] = useState(false);

    return (

        <Page title={PAGE_TITLE.HOME} loadingData={loading}>
            <ListJob></ListJob>
            
            
            </Page>
    )
}
export default Store;
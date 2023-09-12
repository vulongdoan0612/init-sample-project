import React, { useMemo } from "react";
import { PAGE_TITLE } from "@/constants";

import Head from "next/head";
import FullScreenLoading from "@/components/FullScreanLoading";
import Header from "@/components/Header";
import SidebarHome from "@/components/SidebarHome";
interface PropsPage {
    title: string;
    loadingData: boolean;
    children: React.ReactNode;

}
const Page = (props: PropsPage) => {
    const { title, loadingData, children } = props

    const page = useMemo(() => {
        if (loadingData) {
            return <FullScreenLoading />;
        }

        return (
            <>
                {children}
            </>
        );
    }, [loadingData, children]);
    return (
        <>
            <Head>
                <title>{PAGE_TITLE.PREFIX + title}</title>
            </Head>
       
            <div className="page" id="page">
                <div className="page-container">
                    <div className="page-sidebar">
                        <SidebarHome />
                    </div>
                    <div className="page-content">
                        <div className={`page-header `}>
                            <Header />
                        </div>
                        <div className="page-wrapper">
                            <div className="default-page">{page}</div>
                            {/* {footer && <Footer />} */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Page;
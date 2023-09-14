import React, { useMemo } from "react";
import { PAGE_TITLE } from "@/constants";

import Head from "next/head";
import FullScreenLoading from "@/components/FullScreanLoading";
import Header from "@/components/Header";
import SidebarHome from "@/components/SidebarHome";
import dynamic from 'next/dynamic'


interface PropsPage {
    title: string;
    loadingData: boolean;
    children: React.ReactNode;

}
const TestimonialCard = dynamic(() => import('../components/Header/index'), { ssr: false })

const Page = (props: PropsPage) => {
    const { title, loadingData, children, } = props
    console.log(title)
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
            {/* <Head>
                <title>{PAGE_TITLE.LOGIN + title}</title>
            </Head> */}

            <div className="page" id="page">
                <div className="page-container">
                    <div className="page-sidebar">
                        <SidebarHome />
                    </div>
                    <div className="page-content">
                        {title !== 'LOGIN' ? <div className={`page-header`}>
                            <TestimonialCard />
                        </div> : <></>}

                        <div className={`page-wrapper ${title === 'LOGIN' ? 'disable-scroll' : ''}`}>
                            <div className="default-page">{page}</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Page;
import React, { useMemo } from "react";
import { PAGE_TITLE } from "@/constants";

import Head from "next/head";
import FullScreenLoading from "@/components/FullScreanLoading";
import Header from "@/components/Header";
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
            <Header />
            {page}

        </>
    )
}
export default Page;
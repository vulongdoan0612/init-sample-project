import Banner from '@/components/Account/Banner';
import Content from '@/components/Account/Content';
import { PAGE_TITLE } from '@/constants';
import Page from '@/layout/Page';
 import React from 'react';
const Profile = () => {

    return (
        <Page title={PAGE_TITLE.HOME} loadingData={false}>
            <div className='profile-page'>
                {/* <div className='avatar'>
                    Avatar  <Image src={account?.avatar} preview={false}></Image>
                </div>
                <div>
                    Name : {account?.username ? account?.username : account?.companyName}
                </div>
                {account?.cvName ? <div>
                    CV : {account?.cvName}
                    <Image src="/images/pdf-icon.webp" preview={false} width={50} height={50} onClick={handlePdf}></Image>
                </div> : <></>} */}
                <Banner></Banner>  
                <div className='profile-content'>
                    <Content></Content>
                </div> 

            </div>

        </Page>
    )
}
export default Profile
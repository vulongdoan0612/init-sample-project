import Banner from "@/components/Account/Banner";
import Content from "@/components/Account/Content";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import React from "react";
const Profile = () => {
  return (
    <Page title={PAGE_TITLE.HOME} loadingData={false}>
      <div className="profile-page">
        <Banner></Banner>
        <div className="profile-content">
          <Content></Content>
        </div>
      </div>
    </Page>
  );
};
export default Profile;

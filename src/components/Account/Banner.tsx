import { RootState } from "@/redux/store";
import { Image } from "antd";
import { useSelector } from "react-redux";

const Banner = () => {
  const { account } = useSelector((state: RootState) => state.auth);

  return (
    <div className="banner-component">
      <div className="banner">
        <Image src="/images/banner-account.png" preview={false}></Image>
        <div className="avatar">
          <Image src={account?.avatar}></Image>
          <div className="right-username">
            <span className="username">
              {account?.username ? account?.username : account?.companyName}
            </span>
            <span className="id">{account?._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

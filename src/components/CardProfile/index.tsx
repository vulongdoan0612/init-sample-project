import { Button, Image } from "antd";
import { CityIcon, LocationIcon } from "../CustomIcons";
import { DollarOutlined } from "@ant-design/icons";
import moment from "moment";
import { limitText } from "@/utils/limitText";
import TooltipsCpn from "../Tooltips/Tooltips";

const CardProfile = (props: any) => {
  const { item, active } = props;
  const currentTime = moment(); // Thời gian hiện tại

  return (
    <div
      className={`card-job-component ${
        active === item._id ? "active-card" : ""
      }`}
    >
      <div className="first-title">
        <h3>{item?.applier?.username}</h3>
      </div>
      <div className="title">
        <div className="avatar">
          <Image src={item?.applier?.avatar} preview={false} />
        </div>
        <div className="companyName">
          <span>
            {limitText(item?.email)}
            <TooltipsCpn textCopy={item?.email} tooltipsFor="detail-voucher" />
          </span>
          <p>{item?.phone}</p>
        </div>
      </div>
      <span className="line"></span>
      <div className="address">
        <span className="first">
          <LocationIcon></LocationIcon>
          <span className="location">{item?.applier.userInfo?.age}</span>
        </span>
        <span className="second">
          <CityIcon></CityIcon>
          <span className="city">Ho Chi Minh</span>
        </span>
      </div>
      <div className="major"></div>
      <span className="line"></span>
      <div className="description">
        <span dangerouslySetInnerHTML={{ __html: item?.coverLetter }} />
      </div>
      <div className="title"></div>
    </div>
  );
};
export default CardProfile;

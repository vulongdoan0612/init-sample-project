import { Image } from "antd";
import { CityIcon, LocationIcon } from "../CustomIcons";
import { DollarOutlined } from "@ant-design/icons";

const CardApplied = (props: any) => {
  return (
    <div className={`card-job-component}`}>
      <div className="header">
        <div className="label">HOT</div>
      </div>
      <div className="first-title">
        <h3>cccccccccccccccccc</h3>
      </div>
      <div className="title">
        <div className="avatar">
          <Image src="" preview={false} />
        </div>
        <div className="companyName">cccccccccccccccccc</div>
      </div>
      <div className="salary">
        <DollarOutlined />
        <span className="money">cccccccccccccccccc</span>
      </div>
      <span className="line"></span>
      <div className="address">
        <span className="first">
          <LocationIcon></LocationIcon>
          <span className="location">cccccccccccccccccc</span>
        </span>
        <span className="second">
          <CityIcon></CityIcon>
          <span className="city">Ho Chi Minh</span>
        </span>
      </div>
      <div className="major"></div>
      <span className="line"></span>
      <div className="description">
        <table>
          {" "}
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
      <div className="title"></div>
    </div>
  );
};
export default CardApplied;

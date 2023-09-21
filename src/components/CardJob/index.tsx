import { Button, Image } from "antd";
import { CityIcon, LocationIcon } from "../CustomIcons";
import { DollarOutlined } from "@ant-design/icons";
import moment from "moment";

const CardJob = (props: any) => {
  const { item, active } = props;
  const currentTime = moment(); // Thời gian hiện tại

  const timeAgo = currentTime.diff(moment(item.updatedAt), "hours");
  return (
    <div
      className={`card-job-component ${
        active === item._id ? "active-card" : ""
      }`}
    >
      <div className="header">
        {timeAgo === 0 ? (
          <span>Ngay bây giờ </span>
        ) : (
          <span>{`${timeAgo} giờ trước`}</span>
        )}
        <div className="label">HOT</div>
      </div>
      <div className="first-title">
        <h3>{item?.title}</h3>
      </div>
      <div className="title">
        <div className="avatar">
          <Image src={item?.avatar} preview={false} />
        </div>
        <div className="companyName">{item?.company}</div>
      </div>
      <div className="salary">
        <DollarOutlined />
        <span className="money">{item?.salary}</span>
      </div>
      <span className="line"></span>
      <div className="address">
        <span className="first">
          <LocationIcon></LocationIcon>
          <span className="location">{item?.address}</span>
        </span>
        <span className="second">
          <CityIcon></CityIcon>
          <span className="city">Ho Chi Minh</span>
        </span>
      </div>
      <div className="major">
        {item?.type.map((data: any, index: any) => {
          return <Button key={index}>{data}</Button>;
        })}
      </div>
      <span className="line"></span>
      <div className="description">
        <table>
          <tbody>
            <tr>
              <td dangerouslySetInnerHTML={{ __html: item.reason }} />
            </tr>
          </tbody>
        </table>
      </div>
      <div className="title"></div>
    </div>
  );
};
export default CardJob;

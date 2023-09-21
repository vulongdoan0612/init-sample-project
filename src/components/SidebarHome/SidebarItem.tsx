import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Tooltip } from "antd";
import { setKeySidebar } from "@/redux/reducers/sidebar";
import { SESSION_STORAGE_KEY } from "@/constants";
import { setShowSidebar } from "@/redux/reducers/sidebarMain";
import CustomImage from "../CustomImage";

interface IProps {
  item: {
    icon: string;
    href: string;
    title: string;
    tab?: string | any;
  };
  index: number;
  activeItem?: string | boolean;
  activeLogged?: number | boolean;
  notiClaim?: boolean;
}
const SidebarItem = ({ item, index, activeItem, activeLogged }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const handleTabAccount = (tab: string) => {
    dispatch(setKeySidebar(tab));
    sessionStorage.setItem(SESSION_STORAGE_KEY.ACC_TAB, tab);
  };
  const handleClick = () => {
    dispatch(setShowSidebar(false));
    handleTabAccount(item.tab);
  };
  return (
    <>
      <li
        key={index}
        onClick={handleClick}
        className={`sidebarhome-menu-item ${
          !activeLogged && activeItem === item.tab && "active-item"
        } cursor-pointer`}
      >
        <Link href={item.href}>
          <>
            <div className="container-noti">
              <CustomImage
                src={item.icon}
                width={20}
                height={20}
                alt="Picture of the author"
              />

              <div key={index} className="side-bar-noti-quest">
                <div
                  className="noti-claim"
                  style={{
                    display: "block",
                  }}
                ></div>
              </div>
            </div>
            <span className="text-hover">{item.title}</span>
          </>
        </Link>
      </li>
    </>
  );
};

export default SidebarItem;

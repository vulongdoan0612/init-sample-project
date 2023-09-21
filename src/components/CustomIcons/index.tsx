import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const City = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 16.4141L12 12.9141L15.5 5.41406L8 8.91406L4.5 16.4141ZM10 11.9141C9.71667 11.9141 9.479 11.8181 9.287 11.6261C9.095 11.4341 8.99933 11.1967 9 10.9141C9 10.6307 9.096 10.3931 9.288 10.2011C9.48 10.0091 9.71733 9.9134 10 9.91406C10.2833 9.91406 10.521 10.0101 10.713 10.2021C10.905 10.3941 11.0007 10.6314 11 10.9141C11 11.1974 10.904 11.4351 10.712 11.6271C10.52 11.8191 10.2827 11.9147 10 11.9141ZM10 20.9141C8.61667 20.9141 7.31667 20.6514 6.1 20.1261C4.88333 19.6007 3.825 18.8884 2.925 17.9891C2.025 17.0891 1.31267 16.0307 0.788 14.8141C0.263333 13.5974 0.000666667 12.2974 0 10.9141C0 9.53073 0.262667 8.23073 0.788 7.01406C1.31333 5.7974 2.02567 4.73906 2.925 3.83906C3.825 2.93906 4.88333 2.22673 6.1 1.70206C7.31667 1.1774 8.61667 0.914729 10 0.914062C11.3833 0.914062 12.6833 1.17673 13.9 1.70206C15.1167 2.2274 16.175 2.93973 17.075 3.83906C17.975 4.73906 18.6877 5.7974 19.213 7.01406C19.7383 8.23073 20.0007 9.53073 20 10.9141C20 12.2974 19.7373 13.5974 19.212 14.8141C18.6867 16.0307 17.9743 17.0891 17.075 17.9891C16.175 18.8891 15.1167 19.6017 13.9 20.1271C12.6833 20.6524 11.3833 20.9147 10 20.9141ZM10 18.9141C12.2333 18.9141 14.125 18.1391 15.675 16.5891C17.225 15.0391 18 13.1474 18 10.9141C18 8.68073 17.225 6.78906 15.675 5.23906C14.125 3.68906 12.2333 2.91406 10 2.91406C7.76667 2.91406 5.875 3.68906 4.325 5.23906C2.775 6.78906 2 8.68073 2 10.9141C2 13.1474 2.775 15.0391 4.325 16.5891C5.875 18.1391 7.76667 18.9141 10 18.9141Z"
      fill="black"
    />
  </svg>
);

const Location = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 25"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_947_6633)">
      <path
        d="M19 14.625C19 13.6967 18.6312 12.8065 17.9749 12.1501C17.3185 11.4937 16.4283 11.125 15.5 11.125H8.5C7.57174 11.125 6.6815 11.4937 6.02513 12.1501C5.36875 12.8065 5 13.6967 5 14.625"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
      ></path>
      <path
        d="M12 8.5C13.933 8.5 15.5 6.933 15.5 5C15.5 3.067 13.933 1.5 12 1.5C10.067 1.5 8.5 3.067 8.5 5C8.5 6.933 10.067 8.5 12 8.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
      ></path>
      <path
        d="M11.5 18.9375H12.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
      ></path>
      <path
        d="M4.56116 22.7812L2.90039 15.0938H21.0996L19.3696 22.7812"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
      ></path>
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
        x1="1"
        x2="23"
        y1="23.5"
        y2="23.5"
      ></line>
    </g>
    <defs>
      <clipPath id="clip0_947_6633">
        <rect
          fill="white"
          height="24"
          transform="translate(0 0.5)"
          width="24"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

const Bar = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="black"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.26562 7.5H19.2656M5.26562 12.5H19.2656M5.26562 17.5H19.2656"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SidebarMenu = (props: any) => <Icon component={Bar} {...props} />;

export const CityIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={City} {...props} />
);

export const LocationIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Location} {...props} />
);

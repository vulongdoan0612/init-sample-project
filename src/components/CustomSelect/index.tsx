import { getAllTypeJob } from "@/services/job";
import useDidMountEffect from "@/utils/customHook";
import { Select, Space } from "antd";
import React, { useState } from "react";

const { Option } = Select;

const CustomSelect = ({ setType }: any) => {
  const [listType, setListType] = useState([]);
  const handleChange = (value: any) => {
    setType(value);
  };
  const fetchType = async () => {
    const response = await getAllTypeJob();
    if (response.status === 200) {
      setListType(response.data.types);
    }
  };
  useDidMountEffect(() => {
    fetchType();
  }, []);
  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="select one country"
      defaultValue={[]}
      onChange={handleChange}
      optionLabelProp="label"
    >
      <>
        {listType?.map((item, index) => {
          return (
            <Option value={item} label={item} key={index}>
              <Space>{item}</Space>
            </Option>
          );
        })}
      </>
    </Select>
  );
};
export default CustomSelect;

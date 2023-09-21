import { Tooltip, Image } from "antd";
import React, { useState, useEffect } from "react";
interface PropsTooltips {
  textCopy: string;
  tooltipsFor?: string;
}
const TooltipsCpn: React.FC<PropsTooltips> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (this.window.scrollY > 0) {
        setOpen(false);
      }
    });
    return () =>
      window.removeEventListener("scroll", function () {
        if (this.window.scrollY > 0) {
          setOpen(false);
        }
      });
  });

  const handleCopy = () => {
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(`${props.textCopy}`);
    }
  };

  const handleOpenTooltip = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <Tooltip
      zIndex={99999999}
      trigger={["click"]}
      title={"COPIED"}
      open={open}
      onOpenChange={handleOpenTooltip}
    >
      {props.tooltipsFor === "detail-voucher" ? (
        <Image
          src="/icons/copy-detail-voucher.svg"
          alt="icon-copy"
          preview={false}
          className="cursor-pointer"
          onClick={handleCopy}
        />
      ) : (
        <Image
          src="/icons/copy.svg"
          alt="icon-copy"
          preview={false}
          className="cursor-pointer"
          onClick={handleCopy}
        />
      )}
    </Tooltip>
  );
};

export default TooltipsCpn;

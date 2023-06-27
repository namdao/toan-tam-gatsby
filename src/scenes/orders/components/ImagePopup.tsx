import React, { FC, useState } from "react";
import Lightbox from "components/lightbox";
import Image from "components/image";
import { ICON } from "constant/layoutConstant";
import { SxProps, Theme } from "@mui/material";

type IProps = {
  url: string[];
  width?: string | number;
  height?: string | number;
  sx?: SxProps<Theme>;
};
const ImagePopup: FC<IProps> = ({
  url,
  width = ICON.NAV_ITEM,
  height = ICON.NAV_ITEM,
  sx,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const urlSlide = url.map((e) => {
    return {
      src: e,
    };
  });
  return (
    <>
      <Image onClick={handleOpen} src={url[0]} sx={{ width, height, ...sx }} />
      <Lightbox
        open={open}
        close={handleClose}
        slides={urlSlide}
        disabledThumbnails={true}
      />
    </>
  );
};

export default ImagePopup;

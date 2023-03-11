import React, { useState } from "react";
// @mui
import { MenuItem, Stack } from "@mui/material";
// locales
import { useLocales } from "locales";
// components
import Image from "components/image";
import MenuPopover from "components/menuPopover";
import IconButtonAnimate from "components/animate/IconButtonAnimate";

export default function LanguagePopover() {
  const { allLangs, dataCurrentLang, onChangeLang } = useLocales();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang: "vi" | "en") => {
    onChangeLang(newLang);
    handleClosePopover();
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <Image
          disabledEffect
          src={dataCurrentLang.icon}
          alt={dataCurrentLang.label}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 180 }}
      >
        <Stack spacing={0.75}>
          {allLangs.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === dataCurrentLang.value}
              onClick={() => handleChangeLang(option.value as "vi" | "en")}
            >
              <Image
                disabledEffect
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}

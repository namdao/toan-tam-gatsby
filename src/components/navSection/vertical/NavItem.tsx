import React from "react";
// @mui
import { Box, Tooltip, ListItemText } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";

// locales
import { useLocales } from "locales";
import Iconify from "components/iconify";
//
import { NavItemProps } from "../types";
import { StyledItem, StyledIcon, StyledDotIcon } from "./styles";

// ----------------------------------------------------------------------

export default function NavItem({
  item,
  depth,
  open,
  active,
  isExternalLink,
  hasChild,
  ...other
}: NavItemProps & { hasChild: boolean }) {
  const { translate } = useLocales();

  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      depth={depth}
      active={active}
      disabled={disabled}
      caption={!!caption}
      {...other}
    >
      {icon && <StyledIcon>{icon}</StyledIcon>}

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      <ListItemText
        primary={translate(title)}
        secondary={
          caption && (
            <Tooltip title={`${translate(caption)}`} placement="top-start">
              <span>{`${translate(caption)}`}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          component: "span",
          variant: active ? "subtitle2" : "body2",
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: "caption",
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {hasChild && (
        <Iconify
          width={16}
          icon={
            open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"
          }
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Has child
    if (children && children.length > 0) {
      return renderContent;
    }

    // Default
    return (
      <Link to={path} underline="none">
        {renderContent}
      </Link>
    );
  };
  return renderItem();
}

import React, { forwardRef } from "react";
// @mui
import { Box, Tooltip, Link as LinkMui, ListItemText } from "@mui/material";
import { Link } from "@reach/router";

//
import Iconify from "components/iconify";
import { NavItemProps } from "../types";
import { StyledItem, StyledIcon } from "./styles";
import { useLocales } from "locales";

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
    const { translate } = useLocales();

    const { title, path, icon, info, children, disabled, caption, roles } =
      item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}

        <ListItemText
          primary={translate(title)}
          primaryTypographyProps={{
            noWrap: true,
            component: "span",
            variant: active ? "subtitle2" : "body2",
          }}
        />

        {info && (
          <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {caption && (
          <Tooltip title={translate(caption)} arrow>
            <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
              <Iconify icon="eva:info-outline" width={16} />
            </Box>
          </Tooltip>
        )}

        {!!children && (
          <Iconify
            icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
            width={16}
            sx={{ ml: 0.5, flexShrink: 0 }}
          />
        )}
      </StyledItem>
    );

    const renderItem = () => {
      // ExternalLink
      if (isExternalLink)
        return (
          <LinkMui href={path} target="_blank" rel="noopener" underline="none">
            {renderContent}
          </LinkMui>
        );

      // Default
      return (
        <Link to={path} style={{ textDecoration: "none" }}>
          {renderContent}
        </Link>
      );
    };
    return renderItem();
    // return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
  }
);

export default NavItem;

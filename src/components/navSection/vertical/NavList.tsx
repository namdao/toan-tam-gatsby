import React, { useState, useEffect } from "react";
// @mui
import { Collapse } from "@mui/material";
// hooks
import useActiveLink from "hooks/useActiveLink";
import { NavListProps } from "../types";
import NavItem from "./NavItem";
import { useLocation } from "@reach/router";

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
};

export default function NavList({ data, depth, hasChild }: NavListRootProps) {
  const location = useLocation();
  const { pathname } = location;

  const { active, isExternalLink } = useActiveLink(data.path);
  const [open, setOpen] = useState(active);
  useEffect(() => {
    if (!active) {
      handleClose();
    }
  }, [pathname]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (data.hideMenu) return <></>;
  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        isExternalLink={isExternalLink}
        onClick={handleToggle}
        hasChild={hasChild}
      />

      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList
            data={data.children?.filter((e) => !e.hideMenu) || []}
            depth={depth}
          />
        </Collapse>
      )}
    </>
  );
}

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children && list.children.length > 0}
        />
      ))}
    </>
  );
}

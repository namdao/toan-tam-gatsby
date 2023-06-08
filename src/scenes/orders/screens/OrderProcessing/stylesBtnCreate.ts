import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const frameContainer = keyframes`
  0% {
    opacity: 1;
  }
  57% {
    opacity: 0.75;
  }
  75% {
    opacity: 0.95;
  }
  100% {
    opacity: 1;
  }
`;
const frameIcon = (color: string) => keyframes`
  0% {
    -webkit-box-shadow: 0 0 8px 6px rgba(32, 116, 161, 0),
      0 0 0px 0px transparent, 0 0 0px 0px rgba(32, 116, 161, 0);
    box-shadow: 0 0 8px 6px rgba(32, 116, 161, 0), 0 0 0px 0px transparent,
      0 0 0px 0px rgba(32, 116, 161, 0);
  }
  10% {
    -webkit-box-shadow: 0 0 8px 6px ${color}, 0 0 12px 10px transparent,
      0 0 12px 14px ${color};
    box-shadow: 0 0 8px 6px ${color}, 0 0 12px 10px transparent,
      0 0 12px 14px ${color};
  }
  100% {
    -webkit-box-shadow: 0 0 8px 6px rgba(32, 116, 161, 0),
      0 0 0px 40px transparent, 0 0 0px 40px rgba(32, 116, 161, 0);
    box-shadow: 0 0 8px 6px rgba(32, 116, 161, 0), 0 0 0px 40px transparent,
      0 0 0px 40px rgba(32, 116, 161, 0);
  }
`;
type Props = {
  backgroundColor: string;
};
export const ContainerBtn = styled.div(
  {
    WebkitBorderRadius: `50%`,
    borderRadius: "50%",
    display: "flex",
    height: 48,
    lineHeight: 3,
    opacity: 0.7,
    position: "fixed",
    right: 28,
    bottom: 100,
    textAlign: "center",
    width: 48,
    zIndex: 999,
    cursor: "pointer",
    animation: `${frameContainer} 3s infinite linear`,
    alignItems: "center",
    justifyContent: "center",
  },
  ({ backgroundColor }: Props) => ({
    backgroundColor,
  })
);

export const IconBtn = styled.div(({ backgroundColor }: Props) => {
  return {
    width: 32,
    height: 32,
    position: "absolute",
    margin: "auto",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    border: 0,
    borderRadius: "50%!important",
    backgroundClip: "padding-box",
    animation: `${frameIcon(backgroundColor)} 1.5s 0s ease-out infinite;`,
  };
});

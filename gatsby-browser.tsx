import { wrapRootProvider, wrapPageProvider } from "./wrap-with-provider";
//scrollbar
import "simplebar-react/dist/simplebar.min.css";
import "./src/locales/i18n";

export const wrapRootElement = wrapRootProvider;
export const wrapPageElement = wrapPageProvider;

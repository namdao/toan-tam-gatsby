import { wrapRootProvider, wrapPageProvider } from "./wrap-with-provider";
//scrollbar
import "simplebar-react/dist/simplebar.min.css";
import "./src/locales/i18n";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "react-virtualized/styles.css"; // only needs to be imported once
import "./global.css";

export const wrapRootElement = wrapRootProvider;
export const wrapPageElement = wrapPageProvider;

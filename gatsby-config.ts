import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config: GatsbyConfig = {
  siteMetadata: {
    title: `template-gatsby`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-root-import",
    "gatsby-theme-material-ui",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/images/logo.jpg",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyA_8ABxU84C_bXUDwnm_uUk351w7aTrBBA",
          authDomain: "toantam-b13e2.firebaseapp.com",
          databaseURL: "https://toantam-b13e2.firebaseio.com",
          projectId: "toantam-b13e2",
          storageBucket: "toantam-b13e2.appspot.com",
          messagingSenderId: "656429057871",
          appId: "1:656429057871:web:a7d28d8150de1adb42273a",
        },
      },
    },
  ],
  trailingSlash: "never",
};

export default config;

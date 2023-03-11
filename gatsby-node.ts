const path = require("path");

exports.onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

exports.onCreatePage = async ({ page, actions }: any) => {
  const { createPage } = actions;
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/auth/) || page.path.match(/^\/app/)) {
    page.matchPath = page.path.match(/^\/auth/) ? "/auth/*" : "/app/*";
    // Update the page.
    createPage(page);
  }
};

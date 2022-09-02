const RSS = require("./buildRss");

function main() {
  let pagesDir = "./.next/serverless/pages"; // 'pages' location in Vercel environment
//   let pagesDir = `./.next/server/pages`; // 'pages' location in local environment
//   const pageFiles = getPageFiles(pagesDir);
  RSS.buildRss();
  console.log("RSS Feed created");
  //   buildSiteMap(pageFiles);
  //   console.log("Site Map created");
}

main();

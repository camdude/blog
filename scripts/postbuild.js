import buildRss from "./buildRss";

function main() {
  // 'pages' location in Vercel environment
  let pagesDir = "./.next/serverless/pages";
  if (!fs.existsSync(pagesDir)) {
    // 'pages' location in local environment
    pagesDir = `./.next/server/pages`;
  }
  const pageFiles = getPageFiles(pagesDir);
  buildRss(pageFiles, pagesDir);
  console.log("RSS Feed created");
//   buildSiteMap(pageFiles);
//   console.log("Site Map created");
}

main();
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

function isPageFile(filename) {
  return path.extname(filename) === ".html" && !filename.endsWith("404.html");
}

function getPageFiles(directory, files = []) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  entries.forEach((entry) => {
    const absolutePath = path.resolve(directory, entry.name);
    if (entry.isDirectory()) {
      // wow recursive 🐍
      getPageFiles(absolutePath, files);
    } else if (isPageFile(absolutePath)) {
      files.push(absolutePath);
    }
  });
  return files;
}

function byDateDesc(a, b) {
  const date1 = new Date(a.date_published);
  const date2 = new Date(b.date_published);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

function createFeed(pageFiles, pagesDir) {
    console.log(pagesDir)
  // use the reduce method to collect all RSS data
  const rssData = pageFiles.reduce(
    (data, file) => {
      // the pathname is the relative path from '/pages' to the HTML file
      const pathname = path.relative(pagesDir, file).slice(0, -".html".length);
      // collect all RSS top level info in the index page
      if (pathname === "index") {
        const htmlString = fs.readFileSync(file, "utf8");
        const $ = cheerio.load(htmlString);
        data.title = $("title").text();
        data.home_page_url = $(`meta[property='og:url']`).attr("content");
        data.feed_url = $(
          `link[rel='alternate'][type='application/json']`
        ).attr("href");
        data.description = $(`meta[name='description']`).attr("content");
        data.icon = $(`link[sizes='512x512']`).attr("href");
        data.favicon = $(`link[sizes='64x64']`).attr("href");
      }
      // only add to RSS if the pathname is '/blog/*'
      if (pathname.startsWith("blog/") && pathname != "blog/[slug]") {
        const htmlString = fs.readFileSync(file, "utf8");
        const $ = cheerio.load(htmlString);
        // remove the placeholder image for lazy loading images
        $(`#Content img[aria-hidden='true']`).remove();
        data.items.push({
          url: $(`meta[property='og:url']`).attr("content"),
          id: pathname.substring("blog/".length),
          content_html: $("#Content").html(),
          title: $(`meta[property='og:title']`).attr("content"),
          summary: $(`meta[name='description']`).attr("content"),
          image: $(`meta[property='og:image']`).attr("content"),
          banner_image: $(`meta[property='og:image']`).attr("content"),
          date_published: $("meta[property='og:article:published_time']").attr(
            "datetime"
          ),
          author: {
            name: $(`meta[property='og:article:author']`).attr("content"),
            // url: $(`a[rel='author']`).attr("href"),
            // avatar: $(`img#Avatar`).attr("src"),
          },
        });
      }
      return data;
    },
    {
      version: "https://jsonfeed.org/version/1",
      items: [],
    }
  );
  // sort the items by the publishing date
  rssData.items.sort(byDateDesc);
  console.log(rssData);
  // write to the output static folder
  fs.writeFileSync(
    path.join("./.next/static", "feed.json"),
    JSON.stringify(rssData, null, 2)
  );
}

export default async function buildRss(req, res) {
//   // 'pages' location in Vercel environment
//   let pagesDir = "./.next/serverless/pages";
//   if (!fs.existsSync(pagesDir)) {
//     // 'pages' location in local environment
//     pagesDir = `./.next/server/pages`;
//   }
//   const pageFiles = getPageFiles(pagesDir);
//   createFeed(pageFiles, pagesDir);
//   console.log("RSS Feed created");

  res.status(200).json({ message: "RSS Feed created" });
}

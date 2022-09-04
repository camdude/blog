import buildRss from "./buildRss";

export default async function rss(req, res) {
  const feed = await buildRss();

  res.statusCode = 200;
  res.setHeader("content-type", "application/rss+xml");
  res.end(feed.rss2());
}

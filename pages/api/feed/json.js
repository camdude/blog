import buildRss from "./buildRss";

export default async function json(req, res) {
  const feed = buildRss();

  res.statusCode = 200;
  res.setHeader("content-type", "application/feed+json");
  res.end(feed.json1());
}

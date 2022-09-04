import buildRss from "./buildRss";

export default async function atom(req, res) {
  const feed = buildRss();

  res.statusCode = 200;
  res.setHeader("content-type", "application/atom+xml");
  res.end(feed.atom1());
}

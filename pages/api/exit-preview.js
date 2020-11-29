export default async function exitPreview(req, res) {
  res.clearPreviewData();
  res.writeHead(307, { Location: "/blog" });
  res.end();
}

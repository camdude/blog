import { getAllBlogs, getBlogsByTag } from "../../lib/api";

export default async function getBlogs(req, res) {
  const offset = parseInt(req.query.offset || 0, 10);
  const date = req.query.date || 'desc';
  const tag = req.query.tag || '';

  let data;
  if (tag) {
    data = await getBlogsByTag({ offset, date, tag });
  } else {
    data = await getAllBlogs({ offset, date });
  }

  res.status(200).json(data);
}

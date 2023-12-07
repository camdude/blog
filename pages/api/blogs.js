import { getPaginatedBlogs, getPaginatedBlogsByTag } from "../../lib/api";

export default async function getBlogs(req, res) {
  const offset = parseInt(req.query.offset || 0, 10);
  const date = req.query.date || 'desc';
  const tag = req.query.tag || '';

  console.log("api/blogs", offset, date, tag)

  let data;
  if (tag) {
    data = await getPaginatedBlogsByTag({ offset, date, tag });
  } else {
    data = await getPaginatedBlogs({ offset, date });
  }

  res.status(200).json(data);
}

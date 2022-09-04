import { Feed } from "feed";
import { getAllBlogs, urlFor } from "../../../lib/api";

export default async function buildRss() {
  const feed = new Feed({
    title: "Cameron Clifford's Blog",
    description:
      "Welcome to my personal website. Check out my blog to get updates on what I am currently thinking and doing.",
    id: "https://www.cameronclifford.com/",
    link: "https://www.cameronclifford.com/",
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: "https://www.cameronclifford.com/portrait.jpg",
    favicon: "https://www.cameronclifford.com/favicon-64x64.png",
    copyright: "All rights reserved 2022, Cameron Clifford",
    updated: new Date(Date.now()), // optional, default = today
    generator: "Feed for Node.js", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: "https://www.cameronclifford.com/api/feed/json",
      atom: "https://www.cameronclifford.com/api/feed/atom",
    },
    author: {
      name: "Cameron Clifford",
      email: "mail@cameronclifford.com",
      link: "https://www.cameronclifford.com",
    },
  });

  const data = await getAllBlogs();

  data.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://www.cameronclifford.com/blog/${post.slug}`,
      link: `https://www.cameronclifford.com/blog/${post.slug}`,
      description: post.description,
    //   content: "post.content",
      author: [
        {
          name: "Cameron Clifford",
          email: "mail@cameronclifford.com",
          link: "https://www.cameronclifford.com",
        },
      ],
      contributor: [],
      date: new Date(post.date),
      image: urlFor(post.coverImage).url(),
    });
  });

  feed.addCategory("Ministry");
  return feed;
}

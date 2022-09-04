import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import { Feed } from "feed";
import { getAllBlogsWithContent, urlFor } from "../../../lib/api";

const myPortableTextComponents = {
  types: {
    image: ({ value }) => `<img src="${value.imageUrl}" />`,
  },

  marks: {
    link: ({ children, value }) => {
      // ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
      // ⚠️ Make sure you sanitize/validate the href! ⚠️
      const href = value.href || "";

      if (uriLooksSafe(href)) {
        const rel = href.startsWith("/") ? undefined : "noreferrer noopener";
        return `<a href="${href}" rel="${rel}">${children}</a>`;
      }

      // If the URI appears unsafe, render the children (eg, text) without the link
      return children;
    },
  },
};

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

  const data = await getAllBlogsWithContent();

  data.forEach((post) => {
    console.log(toHTML(post.content));

    feed.addItem({
      title: post.title,
      id: `https://www.cameronclifford.com/blog/${post.slug}`,
      link: `https://www.cameronclifford.com/blog/${post.slug}`,
      description: post.description,
      content: toHTML(post.content, {
        components: myPortableTextComponents,
      }),
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

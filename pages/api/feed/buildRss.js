import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import { Feed } from "feed";
import { getAllBlogsWithContent, urlFor } from "../../../lib/api";

const myPortableTextComponents = {
  types: {
    textBlock: ({ value }) =>
      `<h3>${value.heading}</h3>${toHTML(value.body, {
        components: myPortableTextComponents,
      })}`,
    imageTextBlock: ({ value }) =>
      `<h3>${value.heading}</h3>${toHTML(value.body, {
        components: myPortableTextComponents,
      })}`,
    image: ({ value }) => `<img src="${value.asset.url}" />`,
    gallery: () => ``,
    file: ({ value }) =>
      `<a href="${value.asset.url}">${value.asset.originalFilename}</a>`,
    youtube: ({ value }) => `<a href="${value.url}">${value.url}</a>`,
    undefined: () => ``,
  },

  marks: {
    link: ({ children, value }) => {
      // Sanitize/validate the href!
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
  const baseUrl = "https://www.cameronclifford.com";
  const feed = new Feed({
    title: "Cameron Clifford's Blog",
    description:
      "Welcome to my personal website. Check out my blog to get updates on what I am currently thinking and doing.",
    id: baseUrl,
    link: baseUrl,
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${baseUrl}/portrait.jpg`,
    favicon: `${baseUrl}/favicon-64x64.png`,
    copyright: "All rights reserved 2022, Cameron Clifford",
    updated: new Date(Date.now()), // optional, default = today
    generator: "Feed for Node.js", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: `${baseUrl}/api/feed/json`,
      atom: `${baseUrl}/api/feed/atom`,
    },
    author: {
      name: "Cameron Clifford",
      email: "mail@cameronclifford.com",
      link: "https://www.cameronclifford.com",
    },
  });

  const data = await getAllBlogsWithContent();

  data.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/blog/${post.slug}`,
      link: `${baseUrl}/blog/${post.slug}`,
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

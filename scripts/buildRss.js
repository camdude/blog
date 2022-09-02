const fs = require("fs");
const path = require("path");
import { Feed } from "feed";

const posts = [
  {
    title: "The Gospel Proclaimed",
    id: "mts-update-june-2022",
    link: "https://cameronclifford.com/blog/mts-update-june-2022",
    description:
      "I'm currently writing most of this update while on the Gold Coast at the moment. I have had the privilege of joining all the other AFES staff at a con...",
    content:
      "I'm currently writing most of this update while on the Gold Coast at the moment. I have had the privilege of joining all the other AFES staff at a conference this week. It's been great already to connect with other staff, both new and seasoned, all around Australia (even connecting with some of my old strand leaders from NTE).",
    date: new Date("2022-06-16T00:00:00"),
    image:
      "https://cdn.sanity.io/images/b7iirkjr/production/295a160837d512a42c65017bb79ccf36479d5b07-2240x1260.png",
  },
];

export default function buildRss(pageFiles, pagesDir) {
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
      json: "https://www.cameronclifford.com/json",
      atom: "https://www.cameronclifford.com/atom",
    },
    author: {
      name: "Cameron Clifford",
      email: "mail@cameronclifford.com",
      link: "https://www.cameronclifford.com",
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.content,
      author: [
        {
          name: "Cameron Clifford",
          email: "mail@cameronclifford.com",
          link: "https://www.cameronclifford.com",
        },
      ],
      contributor: [],
      date: post.date,
      image: post.image,
    });
  });

  feed.addCategory("Ministry");

  console.log(feed.rss2());
  // Output: RSS 2.0

  fs.writeFileSync(path.join("./.next/static", "feed.xml"), feed.rss2());
}

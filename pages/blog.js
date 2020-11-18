import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import PillButton from "../components/PillButton";
import PostList from "../components/PostList";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Section from "../layouts/Section";
import { getAllBlogs, getAllTags } from "../lib/api";

export default function Blog({ blogs, tags }) {
  const [listView, setlistView] = useState(1);

  const router = useRouter();
  const tag = router.query.tag;

  let filteredBlogs = [];
  if (tag) {
    filteredBlogs = blogs.filter((blog) => {
      let inList = false;
      blog.tags?.forEach((t) => {
        inList = inList || t.name == tag;
      });
      return inList;
    });

    blogs = filteredBlogs;
  }

  return (
    <div className="Blog">
      <Head>
        <title>Cameron Clifford | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        <Section color="secondary">
          <div id="about" className="section-second">
            <div className="section-second__content">
              <h2 className="heading-secondary">Blog</h2>
              <p className="paragraph">
                This space is a place for me to collect and share my thoughts of
                what I am currently thinking and learning. These topics could
                range from what I am doing in ministry to the cool random things
                I am doing with my hobbies or anyhting else I might think is
                worthwhile sharing. If you would like to get updates about any
                of this, please click the subscribe button below.
              </p>
              <div className="u-center-text">
                <Button href="/blog" disabled>
                  SUBSCRIBE
                </Button>
              </div>
            </div>
          </div>
        </Section>
        <Section color="grey">
          <PostList
            onChange={() => {
              setlistView(+!listView);
            }}
            view={listView}
            tagList={tags}
            blogAmount={filteredBlogs.length}
          >
            {blogs.map((post) => {
              if (listView) {
                return (
                  <CardImage
                    key={post.slug}
                    coverImage={post.coverImage}
                    title={post.title}
                    author={post.author.name}
                    date={post.date}
                    link={{ href: "/blogs/[slug]", as: `/blogs/${post.slug}` }}
                  >
                    {post.description}
                  </CardImage>
                );
              } else {
                return (
                  <Card
                    key={post.slug}
                    coverImage={post.coverImage}
                    title={post.title}
                    author={post.author.name}
                    date={post.date}
                    link={{ href: "/blogs/[slug]", as: `/blogs/${post.slug}` }}
                  >
                    {post.description}
                  </Card>
                );
              }
            })}
          </PostList>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs();
  const tags = await getAllTags();
  return {
    props: {
      blogs,
      tags
    },
  };
}

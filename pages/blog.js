import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button";

import PostList from "../components/PostList";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Section from "../layouts/Section";
import { getPaginatedBlogs, getAllTags } from "../lib/api";
import { useGetBlogsPages } from "../actions/pagination";
import AlertMessage from "../components/AlertMessage";
import MailchimpForm from "../components/MailChimpForm";

export default function Blog({ blogs, preview, tags }) {
  const [formOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
    tag: { selected: "" },
  });

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

  return (
    <div className="Blog">
      <Head>
        <title>Cameron Clifford | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main>
        {preview && <AlertMessage />}
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
                <Button
                  onClick={() => {
                    setFormOpen(!formOpen);
                  }}
                >
                  SUBSCRIBE
                </Button>
                {formOpen ? <MailchimpForm /> : ""}
              </div>
            </div>
          </div>
        </Section>
        <Section color="grey">
          <PostList
            onChange={(option, value) =>
              setFilter({ ...filter, [option]: value })
            }
            filter={filter}
            tagList={tags}
          >
            {pages}
          </PostList>
          <Button onClick={loadMore} disabled={isReachingEnd || isLoadingMore}>
            {isLoadingMore
              ? "..."
              : isReachingEnd
              ? "No More Blogs"
              : "More Blogs"}
          </Button>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc", tag: "" });
  const tags = await getAllTags();
  return {
    props: {
      blogs,
      preview,
      tags,
    },
  };
}

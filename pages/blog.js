import { useState } from "react";
import Button from "../components/Button";

import PostList from "../components/PostList";
import Section from "../layouts/Section";
import { getPaginatedBlogs, getAllTags } from "../lib/api";
import { useGetBlogsPages } from "../actions/pagination";
import AlertMessage from "../components/AlertMessage";
import Mailchimp from "../components/Mailchimp";
import Layout from "../layouts/Layout";

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
    <Layout
      meta={{
        title: "Blog",
        type: "website",
        url: "/blog",
        desc: "View all my blog posts here.",
      }}
    >
      {preview && <AlertMessage />}
      <Section color="secondary">
        <div id="about" className="section-second">
          <div className="section-second__content">
            <h2 className="heading-secondary">Blog</h2>
            <p className="paragraph">
              This space is a place for me to collect and share my thoughts on
              what I am currently thinking and learning. These topics could
              range from what I am doing in ministry to the random interests I
              have or anything else I might think is worthwhile sharing.
            </p>
            <p className="paragraph">
              If you would like to get email updates, particularly for what I'm
              doing with MTS, please click the subscribe button below.
            </p>
            <div className="u-center-text">
              <Button
                onClick={() => {
                  setFormOpen(!formOpen);
                }}
              >
                SUBSCRIBE
              </Button>
              {formOpen ? (
                <Mailchimp title="Cameron Clifford's MTS Updates" />
              ) : (
                ""
              )}
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
    </Layout>
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
    revalidate: 1,
  };
}

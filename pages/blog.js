import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        desc: "This space is a place for me to collect and share my thoughts on what I'm currently thinking and learning.",
      }}
    >
      {preview && <AlertMessage />}
      <Section color="secondary">
        <h2 className="heading-secondary">Blog</h2>
        <p className="paragraph">
          This space is a place for me to collect and share my thoughts on what
          I'm currently thinking and learning. These topics could range from
          what I'm doing in ministry to the random interests I have or anything
          else I might think is worthwhile sharing.
        </p>
        <p className="paragraph">
          If you would like to get email updates, particularly for what I'm
          doing with AFES, please click the subscribe button below.
        </p>
        <div className="u-center-text">
          <Button
            onClick={() => {
              setFormOpen(!formOpen);
            }}
          >
            SUBSCRIBE
          </Button>
        </div>
        {formOpen ? (
          <div>
            <Mailchimp title="Cameron Clifford's AFES Updates" />
            <div className="u-center-text">
              <p>
                You can also subscribe via RSS, if that is something you use.
              </p>
              <a
                className="icon icon--rss"
                href="http://cameronclifford.com/api/feed/rss"
                target="blank"
              >
                <FontAwesomeIcon icon="rss-square" />
              </a>
              <a
                className="icon"
                href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fcameronclifford.com%2Fapi%2Ffeed%2Frss"
                target="blank"
              >
                <img
                  id="feedlyFollow"
                  src="http://s3.feedly.com/img/follows/feedly-follow-rectangle-flat-big_2x.png"
                  alt="follow us in feedly"
                  width="80"
                />
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
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
      <Section color="primary">
        <h2 className="heading-secondary">Partner with me?</h2>
        <p className="paragraph">
          Would you like to hear more about the work Cameron is doing on campus
          in Launceston?
        </p>
        <p className="paragraph">
          Would you be willing to invest in this ministry so that students will
          be trained and equipped to procliam Christ at University?
        </p>
        <p className="paragraph">
          Please see the options below to either give financially or join my
          prayer network.
        </p>
        <div className="section-support__buttons">
          <Button href="/partner">Partner With Cameron</Button>
        </div>
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

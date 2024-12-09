import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "../layouts/Section";
import { getPaginatedBlogs, getAllTags } from "../lib/api";
import AlertMessage from "../components/AlertMessage";
import Mailchimp from "../components/Mailchimp";
import Layout from "../layouts/Layout";

export default function Subscribe({ blogs, preview, tags }) {
  return (
    <Layout
      meta={{
        title: "Subscribe",
        type: "website",
        url: "/subscribe",
        desc: "To subscribe to my email updates, please fill out this form.",
      }}
    >
      {preview && <AlertMessage />}
      <Section color="secondary">
        <h2 className="heading-secondary">Subscribe to Prayer Newsletter</h2>
        <p className="paragraph">
          Thank you, I really appreciate your support. To subscribe to my email
          updates, please fill out the form below.
        </p>
        <Mailchimp />
        <div className="u-center-text">
          <p>You can also subscribe via RSS, if that is something you use.</p>
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
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc", tag: "" });
  const tags = await getAllTags();
  return {
    props: {
      page: "subscribe",
      blogs,
      preview,
      tags,
    },
  };
}

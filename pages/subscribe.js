import Head from "next/head";

import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Section from "../layouts/Section";
import { getPaginatedBlogs, getAllTags } from "../lib/api";
import AlertMessage from "../components/AlertMessage";
import Mailchimp from "../components/Mailchimp";

export default function Subscribe({ blogs, preview, tags }) {
  return (
    <div className="Blog">
      <Head>
        <title>Cameron Clifford | Subscribe</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="To subscribe to my
                email updates about what I'm doing with MTS, please fill out this
                form."
        />
      </Head>
      <Navbar />

      <main>
        {preview && <AlertMessage />}
        <Section color="secondary">
          <div id="about" className="section-second">
            <div className="section-second__content">
              <h2 className="heading-secondary">MTS Updates</h2>
              <p className="paragraph">
                Thank you, I really appreciate your support. To subscribe to my
                email updates about what I'm doing with MTS, please fill out the
                form below.
              </p>
              <Mailchimp />
            </div>
          </div>
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

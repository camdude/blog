import Section from "../layouts/Section";
import Layout from "../layouts/Layout";
import { getAllResources } from "../lib/api";

export default function Blog({ resources }) {
  console.log(resources);
  return (
    <Layout
      meta={{
        title: "Resources",
        type: "website",
        url: "/resources",
        desc: "View all my resources here.",
      }}
    >
      <Section color="secondary">
        <h2 className="heading-secondary">Resources</h2>
        <p className="paragraph">
          These are resources that I have created which you are welcome to view
          for personal use.
        </p>
      </Section>
      <Section color="grey"></Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const resources = await getAllResources();
  return {
    props: {
      resources,
    },
  };
}

import Section from "../layouts/Section";
import Layout from "../layouts/Layout";
import { getAllResources, urlFor } from "../lib/api";
import Link from "next/link";
import CardFile from "../components/CardFile";

export default function Blog({ resources }) {
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
          These are some training resources that I have created, which you are welcome to
          make personal use of.
        </p>
        <br />
        {resources.map((resource) => {
          return (
            <CardFile
              key={resource.title}
              title={resource.title}
              desc={resource.description}
              files={resource.files}
            />
          );
        })}
      </Section>
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

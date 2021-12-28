import Section from "../layouts/Section";
import Layout from "../layouts/Layout";
import { getAllResources, urlFor } from "../lib/api";
import Link from "next/link";

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
      <Section color="grey">
        {resources.map((resource) => {
          return (
            <div>
              <h3 className="heading-tertiary">{resource.title}</h3>
              <p className="paragraph">{resource.description}</p>
              {resource.files.map((file) => {
                return (
                  <Link href={`${file.asset.url}?dl=`}>
                    <a>{file.asset.filename}</a>
                  </Link>
                );
              })}
            </div>
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

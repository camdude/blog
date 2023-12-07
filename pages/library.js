import Section from "../layouts/Section";

import Layout from "../layouts/Layout";
import Button from "../components/Button";
import { getLibrary } from "../lib/api";
import CardBook from "../components/CardBook";

export default function Library({ library }) {
  console.log(library);
  return (
    <Layout
      meta={{
        title: "Library",
        type: "website",
        image: "",
        url: "/library",
        desc: "",
      }}
    >
      <Section color="secondary">
        <h2 className="heading-secondary">Library</h2>
        <p className="paragraph">
          Welcome to my library. Feel free to browse and contact me if you would
          like to borrow any.
        </p>
      </Section>
      <Section color="grey">
        {library.map((b) => {
          return (
            <CardBook
              key={b.title}
              title={b.title}
              author={b.author}
              date={b.date}
              coverImage={b.cover}
              link={{
                href: "/library/[slug]",
                as: `/library/${b.title.replace(/ +/g, "-").toLowerCase()}`,
              }}
            >
              {b.desc}
            </CardBook>
          );
        })}
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const library = await getLibrary();
  return {
    props: { page: "library", library },
  };
}

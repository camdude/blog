import { useRouter } from "next/router";
import ErrorPage from "next/error";
import NextImage from "next/image";
import Section from "../../layouts/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../layouts/Layout";
import { getBookByTitle, getLibrary } from "../../lib/api";

export default function Book({book}) {
  console.log("Book:", book)
  const router = useRouter();

  if (!router.isFallback) {
    return <ErrorPage statusCode="404" />;
  }
  if (router.isFallback) {
    return (
      <Layout
        meta={{
          title: "",
          type: "",
          image: "",
          url: "",
          desc: "",
        }}
      >
        <Section color="grey">
          <h1 className="u-center-text">
            Loading <FontAwesomeIcon icon="spinner" spin />
          </h1>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout
      meta={{
        title: "blog.title",
        type: "article",
        image: "urlFor(blog.coverImage).url()",
        url: "`/blog/${blog.slug}`",
        desc: "blog.description",
      }}
    >
      <article id="Content">
        <Section color="grey">
          <h1 className="">{"Title"}</h1>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            adipisci eos ea magnam pariatur tempore labore, earum eaque commodi
            impedit. Est sit asperiores modi suscipit quaerat amet, labore
            numquam magnam.
          </div>
        </Section>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const book = await getBookByTitle(params.slug);
  console.log("getStaticProps", book)
  return {
    props: { book },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const library = await getLibrary();
  console.log("getStaticPaths", library)
  return {
    paths: library?.map((b) => ({
      params: {
        slug: b.title.replace(/ +/g, '-').toLowerCase(),
      },
    })),
    fallback: true,
  };
}

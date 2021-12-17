import BlockContent from "@sanity/block-content-to-react";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Modal from "../../components/Modal";
import Section from "../../layouts/Section";
import { urlFor, getAllBlogs, getBlogBySlug } from "../../lib/api";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertMessage from "../../components/AlertMessage";
import Layout from "../../layouts/Layout";

const overrides = {
  h1: (props) => <h1 className="blog__h1" {...props} />,
  h2: (props) => <h2 className="blog__h2" {...props} />,
  h3: (props) => <h3 className="blog__h3" {...props} />,
  h4: (props) => <h3 className="blog__h4" {...props} />,
  h5: (props) => <h3 className="blog__h5" {...props} />,
  h6: (props) => <h3 className="blog__h6" {...props} />,
  blockquote: (props) => <blockquote className="blog__quote" {...props} />,
  normal: (props) =>
    props.children[0] === "" ? (
      <div className="blog__break" />
    ) : (
      <p className="blog__paragraph" {...props} />
    ),
  
};

const serializers = {
  list: (props) => <ul className="blog__list" {...props} />,
  listItem: (props) => <li className="blog__listItem" {...props} />,
  types: {
    block: (props) => {
      // Check if we have an override for the “style”
      return overrides[props.node.style]
        ? // if so, call the function and pass in the children, ignoring
          // the other unnecessary props
          overrides[props.node.style]({ children: props.children })
        : // otherwise, fallback to the provided default with all props
          BlockContent.defaultSerializers.types.block(props);
    },
    image: ({ node: { asset, alt, position = "center", crop, hotspot } }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      return (
        <React.Fragment>
          {isModalOpen ? (
            <Modal closeModal={() => setIsModalOpen(false)}>
              <img
                className="blog__image--full"
                src={urlFor({ asset, crop, hotspot }).url()}
              />
              <div className="blog__alt u-center-text">{alt}</div>
            </Modal>
          ) : (
            ""
          )}

          <div className={`blog__imgContainer blog__imgContainer--${position}`}>
            <img
              className="blog__image"
              src={urlFor({ asset, crop, hotspot }).width(300).fit("max").url()}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            />
            <div className="blog__alt">{alt}</div>
          </div>
        </React.Fragment>
      );
    },
  },
};

export default function BlogPost({ blog, preview }) {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
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
        title: blog.title,
        type: "article",
        image: urlFor(blog.coverImage).url(),
        url: `/blog/${blog.slug}`,
        desc:
          blog.description > 160
            ? blog.description.substr(0, 160) + "..."
            : blog.description,
      }}
    >
      <Head>
        <meta property="og:article:published_time" content={blog.date} />
        <meta property="og:article:author" content="Cameron Clifford" />
        <meta property="og:article:tag" content={blog.tags} />
      </Head>
      {preview && <AlertMessage />}
      <article id="Content">
        <img
          className="BlogPost__coverImage"
          src={urlFor(blog.coverImage).url()}
        />
        <Section color="grey">
          <h1 className="BlogPost__title">{blog.title}</h1>
          <div className="BlogPost__detailSection">
            <h4 className="BlogPost__detail">
              <FontAwesomeIcon className="BlogPost__detailIcon" icon="user" />
              {`${blog.author.name}`}
            </h4>
            <h4 className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="calendar-alt"
              />
              {`${moment(blog.date).format("MMMM Do, YYYY")}`}
            </h4>
            <div className="BlogPost__detail">
              <FontAwesomeIcon className="BlogPost__detailIcon" icon="tag" />
              <Link href={`/blog?tag=${blog.tags}`}>
                <a className="BlogPost__tag">{blog.tags}</a>
              </Link>
            </div>
          </div>

          <div className="BlogPost__content">
            <BlockContent serializers={serializers} blocks={blog.content} />
          </div>
        </Section>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  return {
    paths: blogs?.map((b) => ({
      params: {
        slug: b.slug,
      },
    })),
    fallback: true,
  };
}

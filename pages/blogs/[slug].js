import BlockContent from "@sanity/block-content-to-react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Modal from "../../components/Modal";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import Section from "../../layouts/Section";
import { urlFor, getAllBlogs, getBlogBySlug } from "../../lib/api";
import PillButton from "../../components/PillButton";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertMessage from "../../components/AlertMessage";

const overrides = {
  h1: (props) => <h1 className="blog__h1" {...props} />,
  h2: (props) => <h2 className="blog__h2" {...props} />,
  h3: (props) => <h3 className="blog__h3" {...props} />,
  h4: (props) => <h3 className="blog__h4" {...props} />,
  h5: (props) => <h3 className="blog__h5" {...props} />,
  h6: (props) => <h3 className="blog__h6" {...props} />,
  blockquote: (props) => <blockquote className="blog__quote" {...props} />,
  normal: (props) => <p className="blog__paragraph" {...props} />,
};

const serializers = {
  types: {
    block: (props) =>
      // Check if we have an override for the “style”
      overrides[props.node.style]
        ? // if so, call the function and pass in the children, ignoring
          // the other unnecessary props
          overrides[props.node.style]({ children: props.children })
        : // otherwise, fallback to the provided default with all props
          BlockContent.defaultSerializers.types.block(props),
    image: ({ node: { asset, alt, position = "center", crop, hotspot } }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      return (
        <React.Fragment>
          {isModalOpen ? (
            <Modal closeModal={() => setIsModalOpen(false)}>
              <img src={urlFor({ asset, crop, hotspot }).url()} />
              <div className="u-center-text u-italic-text">{alt}</div>
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
      <React.Fragment>
        <Navbar />
        <main className="">
          <Section color="grey">
            <h1 className="u-center-text">
              Loading <FontAwesomeIcon icon="spinner" spin />
            </h1>
          </Section>
        </main>
        <Footer />
      </React.Fragment>
    );
  }

  return (
    <div className="">
      <Head>
        <title>{`Cameron Clifford | ${blog.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="">
        {preview && <AlertMessage />}
        <img
          className="BlogPost__coverImage"
          src={urlFor(blog.coverImage).url()}
        />
        <Section color="grey">
          <h1 className="BlogPost__title">{blog.title}</h1>
          <h4 className="BlogPost__details">
            {`by ${blog.author.name} on ${moment(blog.date).format(
              "MMMM Do, YYYY"
            )}`}
          </h4>
          <div className="BlogPost__tagList">
            <PillButton href={`/blog?tag=${blog.tags}`}>{blog.tags}</PillButton>
          </div>
          <div className="BlogPost__content">
            <BlockContent serializers={serializers} blocks={blog.content} />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
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

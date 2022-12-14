import BlockContent from "@sanity/block-content-to-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Image from "../../components/Image";
import Section from "../../layouts/Section";
import { urlFor, getAllBlogs, getBlogBySlug } from "../../lib/api";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertMessage from "../../components/AlertMessage";
import Layout from "../../layouts/Layout";
import FileDownload from "../../components/FileDownload";
import Gallery from "../../components/Gallery";
import Button from "../../components/Button";
import YouTube from "../../components/YouTube";

const overrides = {
  h1: (props) => <h1 className="blog__h1" {...props} />,
  h2: (props) => <h2 className="blog__h2" {...props} />,
  h3: (props) => <h3 className="blog__h3" {...props} />,
  h4: (props) => <h3 className="blog__h4" {...props} />,
  h5: (props) => <h3 className="blog__h5" {...props} />,
  h6: (props) => <h3 className="blog__h6" {...props} />,
  a: (props) => <a className="blog__a" {...props} />,
  blockquote: (props) => <blockquote className="blog__quote" {...props} />,
  normal: (props) =>
    props.children[0] === "" ? (
      <div className="blog__break" />
    ) : (
      <p className="blog__paragraph" {...props} />
    ),
};

const serializers = {
  marks: {
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a className="blog__a" href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a className="blog__a" href={href}>
          {children}
        </a>
      );
    },
  },

  list: (props) => {
    const { type } = props;
    const bullet = type === "bullet";
    if (bullet) {
      return <ul className="block__list" {...props} />;
    }
    return <ol className="block__list" {...props} />;
  },
  listItem: (props) => <li className="blog__listItem" {...props} />,
  marks: {
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a className="block__a" href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <a className="block__a" href={href}>
          {children}
        </a>
      );
    },
  },
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
      return (
        <Image
          asset={asset}
          alt={alt}
          position={position}
          crop={crop}
          hotspot={hotspot}
        />
      );
    },
    file: ({ node: { asset } }) => {
      return (
        <FileDownload
          key={asset.filename}
          asset={asset.url}
          filename={asset.originalFilename}
          extension={asset.extension}
        />
      );
    },
    gallery: ({ node: { images } }) => {
      return <Gallery images={images} />;
    },
    youtube: ({ node: { url } }) => {
      return <YouTube url={url} />;
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
      <Section color="primary">
        <h2 className="heading-secondary">Partner with me?</h2>
        <p className="paragraph">
          Would you like to hear more about the work Cameron is doing on campus
          in Launceston?
        </p>
        <p className="paragraph">
          Would you be willing to invest in this ministry so that students will
          be trained and equipped to proclaim Christ at University?
        </p>
        <p className="paragraph">
          Please see the options below to either give financially or join my
          prayer network.
        </p>
        <div className="section-support__buttons">
          <Button href="/partner">Give Financially</Button>
          <Button href="/subscribe">Support Prayerfully</Button>
        </div>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { page: blog.title, blog, preview },
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

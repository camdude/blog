import { PortableText } from "@portabletext/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { RefTagger } from "react-reftagger";
import Image from "../../components/Image";
import NextImage from "next/image";
import Section from "../../layouts/Section";
import { urlFor, getAllBlogs, getBlogBySlug, checkProtection, getSubscriberByToken } from "../../lib/api";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertMessage from "../../components/AlertMessage";
import Layout from "../../layouts/Layout";
import FileDownload from "../../components/FileDownload";
import Gallery from "../../components/Gallery";
import Button from "../../components/Button";
import YouTube from "../../components/YouTube";
import TextBlock from "../../components/TextBlock";
import ImageTextBlock from "../../components/ImageTextBlock";
import { createFragmentId } from "../../utils/urlFunctions";
import { useState } from "react";
import ReactionElement from "../../components/ReactionElement";
import Facebook from "../../components/Facebook";
import Banner from "../../components/Banner";

export default function BlogPost({ blog, preview, siteOrigin }) {
  const reactionHeading = (Tag) => ({ children }) => {
    const headingText = String(children);
    const idLink = `${siteOrigin}/blog/${blog?.slug}#${createFragmentId(headingText)}`;
    return (
      <ReactionElement subject={`Response to "${headingText}"`} body={idLink} link={idLink}>
        <Tag className={`blog__${Tag}`} id={createFragmentId(headingText)}>
          {children}
        </Tag>
      </ReactionElement>
    );
  };

  const components = {
    marks: {
      link: ({ value, children }) => {
        const { blank, href } = value;

        return blank ? (
          <a
            className="blog__a"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </a>
        ) : (
          <a className="blog__a" href={href}>
            {children}
          </a>
        );
      },
    },

    list: {
      bullet: ({ children }) => (
        <ul className="blog__list">{children}</ul>
      ),

      number: ({ children }) => (
        <ol className="blog__list">{children}</ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li className="blog__listItem">{children}</li>
      ),

      number: ({ children }) => (
        <li className="blog__listItem">{children}</li>
      ),
    },

    block: {
      h1: reactionHeading("h1"),
      h2: reactionHeading("h2"),
      h3: reactionHeading("h3"),
      h4: reactionHeading("h4"),
      h5: reactionHeading("h5"),
      h6: reactionHeading("h6"),

      normal: ({ children }) =>
        children?.[0] === "" ? (
          <div className="blog__break" />
        ) : (
          <p className="blog__paragraph">{children}</p>
        ),

      blockquote: ({ children }) => (
        <blockquote className="blog__quote">
          {children}
        </blockquote>
      ),
    },

    types: {
      image: ({
        value: {
          asset,
          alt,
          position = "center",
          crop,
          hotspot,
        },
      }) => {
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

      file: ({ value: { asset } }) => {
        return (
          <FileDownload
            key={asset.filename}
            asset={asset.url}
            filename={asset.originalFilename}
            extension={asset.extension}
          />
        );
      },

      gallery: ({ value: { images } }) => {
        return <Gallery images={images} />;
      },

      youtube: ({ value: { url } }) => {
        return <YouTube url={url} />;
      },

      facebook: ({ value: { url, size } }) => {
        return <Facebook url={url} size={size} />;
      },

      textBlock: ({ value: { heading, body } }) => {
        return (
          <TextBlock heading={heading} slug={blog.slug} siteOrigin={siteOrigin}>
            {body}
          </TextBlock>
        );
      },

      imageTextBlock: ({
        value: { heading, body, image },
      }) => {
        return (
          <ImageTextBlock
            heading={heading}
            slug={blog.slug}
            image={image}
          >
            {body}
          </ImageTextBlock>
        );
      },

      banner: ({ value: { image, alt, link } }) => {
        return (
          <Banner
            image={image}
            alt={alt}
            link={link}
          />
        );
      },
    },
  };

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

  if (
    blog.protected?.isHidden &&
    router.query.pwd != blog.protected.pwd
  ) {
    const [pwdInput, setPwdInput] = useState("");

    return (
      <Layout
        meta={{
          title: "Password Protected",
          type: "article",
          image: "",
          url: `/blog/${blog.slug}`,
          desc: "",
        }}
      >
        <Head>
          <meta
            property="og:article:published_time"
            content={blog.date}
          />
          <meta
            property="og:article:author"
            content="Cameron Clifford"
          />
          <meta
            property="og:article:tag"
            content={blog.tags}
          />
        </Head>

        {preview && <AlertMessage />}

        <article id="Content">
          <NextImage
            className="BlogPost__coverImage"
            src={urlFor(blog.coverImage).url()}
            width={blog.coverImage.metadata.dimensions.width}
            height={blog.coverImage.metadata.dimensions.height}
            alt=""
            placeholder="blur"
            blurDataURL={blog.coverImage.metadata.lqip}
            loading="lazy"
          />
        </article>

        <Section color="grey">
          <h1 className="BlogPost__title">{blog.title}</h1>

          <div className="BlogPost__detailSection">
            <h4 className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="user"
              />
              {blog.author.name}
            </h4>

            <h4 className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="calendar-alt"
              />
              {moment(blog.date).format("MMMM Do, YYYY")}
            </h4>

            <div className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="tag"
              />

              <Link
                className="BlogPost__tag"
                href={`/blog?tag=${blog.tags}`}
              >
                {blog.tags}
              </Link>
            </div>
          </div>
        </Section>

        <Section color="grey">
          <h1 className="u-center-text">
            Password Protected
          </h1>

          <p className="paragraph u-center-text">
            This post is protected with a password.
            Please enter it below to access its
            contents.
          </p>

          <br />

          <div className="u-center-text">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  pwdInput === blog.protected.pwd
                ) {
                  router.push(
                    `/blog/${blog.slug}?pwd=${blog.protected.pwd}`
                  );
                } else {
                  alert("Incorrect Password");
                }
              }}
            >
              <input
                className="Form__field"
                type="text"
                value={pwdInput}
                onChange={(e) =>
                  setPwdInput(e.target.value)
                }
              />

              <input
                className="Form__button"
                type="submit"
              />
            </form>
          </div>
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
        <meta
          property="og:article:published_time"
          content={blog.date}
        />

        <meta
          property="og:article:author"
          content="Cameron Clifford"
        />

        <meta
          property="og:article:tag"
          content={blog.tags}
        />
      </Head>

      <RefTagger
        bibleVersion="NIV"
        roundCorners={true}
        socialSharing=""
        customStyle={{
          heading: {
            backgroundColor: "#1e91d6",
            color: "#ffffff",
          },
          body: {
            moreLink: {
              color: "#1e91d6",
            },
          },
        }}
      />

      {preview && <AlertMessage />}

      <article id="Content">
        <NextImage
          className="BlogPost__coverImage"
          src={urlFor(blog.coverImage).url()}
          width={blog.coverImage.metadata.dimensions.width}
          height={blog.coverImage.metadata.dimensions.height}
          alt=""
          placeholder="blur"
          blurDataURL={blog.coverImage.metadata.lqip}
          loading="lazy"
        />

        <Section color="grey">
          <h1 className="BlogPost__title">
            {blog.title}
          </h1>

          <div className="BlogPost__detailSection">
            <h4 className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="user"
              />
              {blog.author.name}
            </h4>

            <h4 className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="calendar-alt"
              />
              {moment(blog.date).format("MMMM Do, YYYY")}
            </h4>

            <div className="BlogPost__detail">
              <FontAwesomeIcon
                className="BlogPost__detailIcon"
                icon="tag"
              />

              <Link
                className="BlogPost__tag"
                href={`/blog?tag=${blog.tags}`}
              >
                {blog.tags}
              </Link>
            </div>
          </div>

          <div className="BlogPost__content">
            <PortableText
              value={blog.content}
              components={components}
            />
          </div>
        </Section>
      </article>

      <Section color="primary">
        <h2 className="heading-secondary">
          Are you a partner?
        </h2>

        <p className="paragraph">
          Would you like to support and stay updated
          with what Cameron is doing at Moore College
          as he is further equipped for future ministry?
        </p>

        <p className="paragraph">
          I also have a few people who like to support
          me through giving to my AFES scholarship.
        </p>

        <p className="paragraph">
          Please see the options below to either give
          financially or subscribe to my prayer
          updates.
        </p>

        <div className="section-support__buttons">
          <Button href="/subscribe">
            Support Prayerfully
          </Button>

          <Button href="/partner">
            Give Financially
          </Button>
        </div>
      </Section>
    </Layout>
  );
}

// export async function getStaticProps({
//   params,
//   preview = false,
// }) {
//   const blog = await getBlogBySlug(
//     params.slug,
//     preview
//   );

//   return {
//     props: {
//       page: blog.title,
//       blog,
//       preview,
//     },
//     revalidate: 1,
//   };
// }

// export async function getStaticPaths() {
//   const blogs = await getAllBlogs();

//   return {
//     paths: blogs?.map((b) => ({
//       params: {
//         slug: b.slug,
//       },
//     })),
//     fallback: true,
//   };
// }

export async function getServerSideProps({ params, req, preview = false }) {
  console.log(params.slug)
  const post = await checkProtection(params.slug)
  console.log("post:", post)

  if (!post) {
    return { notFound: true }
  }

  if (post.isProtected) {
    const cookieToken = req.cookies.access_token
    const subscriber = cookieToken
      ? await getSubscriberByToken(cookieToken)
      : null

    console.log(cookieToken, subscriber)

    if (!subscriber) {
      return {
        redirect: {
          destination: '/blog?err=401',
          permanent: false,
        },
      }
    }
  }

  const blog = await getBlogBySlug(params.slug, preview)

  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const siteOrigin = `${protocol}://${host}`;

  return {
    props: {
      page: blog.title,
      blog,
      preview,
      siteOrigin,
    },
  }
}
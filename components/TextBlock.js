import { PortableText } from "@portabletext/react";
import { createFragmentId } from "../utils/urlFunctions";
import ReactionElement from "./ReactionElement";

const headingTag = (Tag) => ({ children }) => (
  <Tag
    className={`blog__${Tag}`}
    id={createFragmentId(String(children))}
  >
    {children}
  </Tag>
);

const TextBlock = ({ heading, slug, siteOrigin, children }) => {
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
        <li className="blog__listItem">
          {children}
        </li>
      ),

      number: ({ children }) => (
        <li className="blog__listItem">
          {children}
        </li>
      ),
    },

    block: {
      h1: headingTag("h1"),
      h2: headingTag("h2"),
      h3: headingTag("h3"),
      h4: headingTag("h4"),
      h5: headingTag("h5"),
      h6: headingTag("h6"),

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
  };

  const headingUrl = `${siteOrigin}/blog/${slug}#${createFragmentId(heading)}`;

  return (
    <div className="TextBlock">
      <ReactionElement
        subject={`Response to "${heading}"`}
        body={headingUrl}
        link={headingUrl}
      >
        <h2
          className="heading-secondary TextBlock__heading"
          id={createFragmentId(heading)}
        >
          {heading}
        </h2>
      </ReactionElement>

      <PortableText
        value={children}
        components={components}
      />
    </div>
  );
};

export default TextBlock;
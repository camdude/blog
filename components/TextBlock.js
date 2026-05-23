import { PortableText } from "@portabletext/react";
import { createFragmentId } from "../utils/urlFunctions";
import ReactionElement from "./ReactionElement";

const TextBlock = ({ heading, slug, children }) => {
  const overrides = {
    h1: ({ children }) => {
      const headingText = String(children);

      return (
        <h1
          className="blog__h1"
          id={createFragmentId(headingText)}
        >
          {children}
        </h1>
      );
    },

    h2: ({ children }) => {
      const headingText = String(children);

      return (
        <h2
          className="blog__h2"
          id={createFragmentId(headingText)}
        >
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const headingText = String(children);

      return (
        <h3
          className="blog__h3"
          id={createFragmentId(headingText)}
        >
          {children}
        </h3>
      );
    },

    h4: ({ children }) => {
      const headingText = String(children);

      return (
        <h4
          className="blog__h4"
          id={createFragmentId(headingText)}
        >
          {children}
        </h4>
      );
    },

    h5: ({ children }) => {
      const headingText = String(children);

      return (
        <h5
          className="blog__h5"
          id={createFragmentId(headingText)}
        >
          {children}
        </h5>
      );
    },

    h6: ({ children }) => {
      const headingText = String(children);

      return (
        <h6
          className="blog__h6"
          id={createFragmentId(headingText)}
        >
          {children}
        </h6>
      );
    },

    normal: ({ children }) =>
      children?.[0] === "" ? (
        <div className="blog__break" />
      ) : (
        <p className="blog__paragraph">
          {children}
        </p>
      ),
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
      h1: ({ children }) =>
        overrides.h1({ children }),

      h2: ({ children }) =>
        overrides.h2({ children }),

      h3: ({ children }) =>
        overrides.h3({ children }),

      h4: ({ children }) =>
        overrides.h4({ children }),

      h5: ({ children }) =>
        overrides.h5({ children }),

      h6: ({ children }) =>
        overrides.h6({ children }),

      normal: ({ children }) =>
        overrides.normal({ children }),

      blockquote: ({ children }) => (
        <blockquote className="blog__quote">
          {children}
        </blockquote>
      ),
    },
  };

  return (
    <div className="TextBlock">
      <ReactionElement
        subject={`Response to "${heading}"`}
        body={`https://cameronclifford.com/blog/${slug}#${createFragmentId(
          heading
        )}`}
        link={`https://cameronclifford.com/blog/${slug}#${createFragmentId(
          heading
        )}`}
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
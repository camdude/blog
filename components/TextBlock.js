import BlockContent from "@sanity/block-content-to-react";

const TextBlock = ({heading, children}) => {
  const overrides = {
    h1: (props) => <h1 className="blog__h1" id={props.children[0]} {...props} />,
    h2: (props) => <h2 className="blog__h2" id={props.children[0]} {...props} />,
    h3: (props) => <h3 className="blog__h3" id={props.children[0]} {...props} />,
    h4: (props) => <h3 className="blog__h4" id={props.children[0]} {...props} />,
    h5: (props) => <h3 className="blog__h5" id={props.children[0]} {...props} />,
    h6: (props) => <h3 className="blog__h6" id={props.children[0]} {...props} />,
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
        return <ul className="blog__list" {...props} />;
      }
      return <ol className="blog__list" {...props} />;
    },
    listItem: (props) => <li className="blog__listItem" {...props} />,
    marks: {
      link: ({ mark, children }) => {
        const { blank, href } = mark;
        return blank ? (
          <a className="blog__a" href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ) : (
          <a className="blog__a" href={href}>
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
    },
  };

  return (
    <div className="TextBlock">
      <h2 className="heading-secondary TextBlock__heading" id={heading}>{heading}</h2>
      <BlockContent serializers={serializers} blocks={children} />
    </div>
  );
};

export default TextBlock;

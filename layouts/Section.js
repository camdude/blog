const Section = ({ color, children }) => {
  return <div className={`Section Section--${color}`}>{children}</div>;
};

export default Section;

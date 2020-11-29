import Link from "next/link";
import Section from "../layouts/Section";

const AlertMessage = () => {
  return (
    <Section color="grey">
      <h4>You are in preview mode</h4>
      <Link href="/api/exit-preview">
        <a>Leave preview mode</a>
      </Link>
    </Section>
  );
};

export default AlertMessage;

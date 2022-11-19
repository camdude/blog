import Section from "../layouts/Section";

import Layout from "../layouts/Layout";
import SupportGraph from "../components/SupportGraph";
import { getSupport } from "../lib/api";
import Button from "../components/Button";

export default function Subscribe({ supportData }) {
  return (
    <Layout
      meta={{
        title: "Support",
        type: "website",
        url: "/support",
        desc: "",
      }}
    >
      <Section color="secondary">
        <h2 className="heading-secondary">Ministry Partnership</h2>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sapiente
          autem, quae aliquam odio earum voluptas quo distinctio maxime quod
          porro omnis voluptatibus quam debitis nihil nobis molestias? Odit,
          harum.
        </p>
        <SupportGraph
          heading={`Monthly Target: $${(supportData.target / 12).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          raised={supportData.raisedMonthly}
          target={supportData.target / 12}
        />
        <SupportGraph
          heading={`Annual Target: $${supportData.target.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          raised={supportData.raisedAnnual}
          target={supportData.target}
        />
        <br />
        <Button
          target="_blank"
          href="https://support.afes.org.au/support-cameron-clifford-university-of-tasmania-launceston-6441"
        >
          Give Financially
        </Button>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const supportData = await getSupport();

  return {
    props: {
      supportData: supportData[0],
    },
  };
}

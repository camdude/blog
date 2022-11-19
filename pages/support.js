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
          I am currently seeking people to support me financially to start
          working with{" "}
          <a className="link" href="https://afes.org.au/" target="_blank">
            AFES
          </a>{" "}
          in 2023. I'm hoping to be able to support the Launceston students on
          campus {supportData.time} days a week. Before I start I will need to raise 80% of my annual target.
        </p>
        <p className="paragraph">
          Please prayerfully consider if you would be able to make a regular
          pledge of $25/$50/$75/$100/month or another amount as you feel led.
          One off contributions are also very welcome.
        </p>
        <p className="paragraph">
          You can see below my current support-raising progress.
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
          minTarget={80}
        />
        <br />
        <Button
          target="_blank"
          href="https://support.afes.org.au/support-cameron-clifford-university-of-tasmania-launceston-6441"
        >
          Partner Financially
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

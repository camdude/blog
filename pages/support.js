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
          I’m very grateful for you considering how you can partner with me to
          serve the students at UTAS. Although Launceston is a small and quiet
          campus, there is still a great need for people to hear the good news.
        </p>
        <p className="paragraph">
          Please prayerfully consider if you would be able to make a regular
          pledge of $25/$50/$100/month or another amount as you feel led. One
          off contributions are also very welcome.
        </p>
        <p className="paragraph">
          I hope to spend {supportData.time} days per week on campus but before
          I start I will need to raise 80% of my annual target.
          {/* You can see my current support below. */}
        </p>
        <div className="u-center-text">
          <Button
            target="_blank"
            href="https://support.afes.org.au/support-cameron-clifford-university-of-tasmania-launceston-6441"
          >
            Give Financially
          </Button>
        </div>
        <br />
        
        {/* <SupportGraph
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
        <br /> */}
        <p className="paragraph">
          If now isn't a good time for you to support me in this way, please
          consider subscribing to my email updates and continue to pray for me
          and the Uni ministry. It is only through your prayers and God's grace
          that he continues to carry out his good will in people's lives.
        </p>
        <div className="u-center-text">
          <Button href="/subscribe">Support Prayerfully</Button>
        </div>
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

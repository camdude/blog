import Section from "../layouts/Section";

import Layout from "../layouts/Layout";
import SupportGraph from "../components/SupportGraph";
import { getSupport } from "../lib/api";
import Button from "../components/Button";

export default function Partner({ supportData }) {
  return (
    <Layout
      meta={{
        title: "Partner with Cameron",
        type: "website",
        image: "/support-banner.png",
        url: "/partner",
        desc: "Would you be willing to prayerfully consider if you would be able to generously give to help me support the students on campus?",
      }}
    >
      {/* <img className="BlogPost__coverImage" src="/support-banner.png" /> */}
      <Section color="secondary">
        <h2 className="heading-secondary">Partner with Cameron?</h2>
        <p className="paragraph">
          I’m very grateful for you considering how you can partner with me to
          help support at college as I'm trained to prepare me serve in gospel
          ministry.
        </p>

        <p className="paragraph">
          Thankfully most of my expenses will be covered through goverment
          assistance and a paid ministry placement. Although my need is not
          great, if you would like to support me financially you can contibute
          to my scholarship through AFES.
        </p>
        <p className="paragraph">
          Most importantly however I appreciate your prayers. You can stay
          informed of what to prayer for through my prayer updates. want to. It
          is only through your prayers and God's grace that I can do what I'm
          currently doing.
        </p>
        <div className="section-support__buttons">
          <Button href="/subscribe">Support Prayerfully</Button>
          <Button
            id="give_financially"
            target="_blank"
            href="https://support.afes.org.au/support-cameron-clifford-university-of-tasmania-launceston-6441"
          >
            Give Financially
          </Button>
        </div>
      </Section>
      <Section color="primary">
        <h2 className="heading-secondary">Support Progress</h2>
        <p className="paragraph">
          You can see the current support for my scholarship below.
        </p>
        {/* <img className="" src="/budget.png" /> */}
        <SupportGraph
          heading={`Scholarship Annual Target: $${supportData.target.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          raised={supportData.raisedAnnual}
          target={supportData.target}
          minTarget={(supportData.raisedAnnual / supportData.target) * 100}
        />
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const supportData = await getSupport();

  return {
    props: {
      page: "partner",
      supportData: supportData[0],
    },
    revalidate: 1,
  };
}

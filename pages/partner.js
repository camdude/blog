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
      <img className="BlogPost__coverImage" src="/support-banner.png" />
      <Section color="secondary">
        <h2 className="heading-secondary">Partner with Cameron?</h2>
        <p className="paragraph">
          I’m very grateful for you considering how you can partner with me to
          serve the students at UTAS. Although Launceston is a small and quiet
          campus, there is still a great need for people to hear the good news.
        </p>
        <p className="paragraph">
          If you haven't already read my partnership letter yet, please do so{" "}
          <a href="/blog/afes-partnership-letter">here</a>, to find out more
          about the ministry and what my role is.
        </p>
        <p className="paragraph">
          Would you be willing to prayerfully consider if you would be able to
          generously give to help me support the students {supportData.time}{" "}
          days per week on campus? A regular pledge of $25/$50/$100/$200 per month or
          another amount as you feel led would be most appreciated. One-off
          contributions are also very welcome.
        </p>
        <p className="paragraph">
          If now isn't a good time for you to support me in this way, please
          consider subscribing to my prayer newsletter so you can continue to pray for me
          and the Uni ministry. It is only through your prayers and God's grace
          that he continues to carry out his good will in people's lives.
        </p>
        <div className="section-support__buttons">
          <Button
            id="give_financially"
            target="_blank"
            href="https://support.afes.org.au/support-cameron-clifford-university-of-tasmania-launceston-6441"
          >
            Give Financially
          </Button>
          <Button   href="/subscribe">Support Prayerfully</Button>
        </div>
      </Section>
      {/* <Section color="primary">
      <h2 className="heading-secondary">Support Progress</h2>
        <p className="paragraph">You can see my current support below.</p>
        <p className="paragraph">
          The marking indicates the minimum AFES requires me to raise before I can
          can commit to {supportData.time} days a week with the
          students.
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
          minTarget={60}
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
      </Section> */}
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

import Section from "../layouts/Section";

import Layout from "../layouts/Layout";
import Button from "../components/Button";

export default function About({}) {
  return (
    <Layout
      meta={{
        title: "About",
        type: "website",
        image: "",
        url: "/about",
        desc: "",
      }}
    >
      <img className="BlogPost__coverImage" src="/about-banner.png" />
      <Section color="secondary">
        <h2 className="heading-secondary">Hi, I'm Cameron</h2>
        <p className="paragraph">
          I'm a current MTS apprentice living in Launceston. I enjoy playing
          clarinet in concert bands, playing board games, bushwalking, hanging
          out with friends and getting out of the city lights to stargaze into
          earth's amazing galaxy.
        </p>
        <p className="paragraph">
          Over the two years of my apprenticeship, by God's grace, I have grown
          in my character, conviction and competencies, which I seek to continue
          to use in gospel ministry. I have a passion for seeing people come to
          know Christ and to be encouraging others to constantly be growing in
          their own spiritual maturity.
        </p>
        <p className="paragraph">
          I am currently seeking support to start working with the Australian
          Fellowship of Evangelical Students in 2023. I will also continue to
          serve on staff at my home church, The Branch Christian Church.
        </p>
      </Section>
      <Section color="primary">
        <h2 className="heading-secondary">Partner with me?</h2>
        <p className="paragraph">
          Would you like to hear more about the work Cameron is doing on campus
          in Launceston?
        </p>
        <p className="paragraph">
          Would you be willing to invest in this ministry so that students will
          be trained and equipped to procliam Christ at University?
        </p>
        <p className="paragraph">
          Please see the options below to either give financially or join my
          prayer network.
        </p>
        <div className="section-support__buttons">
          <Button href="/support">Give Financially</Button>
          <Button href="/subscribe">Support Prayerfully</Button>
        </div>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { page: "about" },
  };
}

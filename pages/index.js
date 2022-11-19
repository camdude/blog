import Button from "../components/Button";
import Layout from "../layouts/Layout";
import Section from "../layouts/Section";

export default function Home() {
  return (
    <Layout
      meta={{
        title: "Home",
        type: "website",
        url: "/",
        desc: "Welcome to my personal website. Check out my blog to get updates on what I am currently thinking and doing.",
      }}
    >
      <Section color="grey">
        <div className="hero">
          <div className="hero__content">
            <div className="hero__headingContainer">
              <h1 className="hero__heading">
                To be equipped with everything good for doing his will, to whom
                be glory for ever.
              </h1>
              <h2 className="hero__subheading">Hebrews 13:21</h2>
            </div>
            <div className="hero__cta">
              <Button href="/#support">Partner With Me</Button>
            </div>
          </div>

          <div className="hero__portrait">
            <img className="hero__image" src="/portrait.jpg" alt="Cameron" />
          </div>
        </div>
      </Section>
      <Section color="secondary">
        <div id="about" className="section-about">
          <div className="section-about__content">
            <h2 className="heading-secondary">About Me</h2>
            <p className="paragraph">
              Hi, I'm Cameron, a current{" "}
              <a className="link" href="https://mts.com.au/" target="_blank">
                MTS apprentice
              </a>{" "}
              living in Launceston. I enjoy playing clarinet in concert bands,
              playing board games, bushwalking, hanging out with friends and
              getting out of the city lights to stargaze into earth's amazing
              galaxy.
            </p>
            <p className="paragraph">
              Over the two years of my apprenticeship, by God's grace, I have
              grown in my character, conviction and competencies, which I seek
              to continue to use in gospel ministry. I have a passion for seeing
              people come to know Christ and to be encouraging others to
              constantly be growing in their own spiritual maturity.
            </p>
            <p className="paragraph">
              I am currently seeking support to start working with the{" "}
              <a className="link" href="https://afes.org.au/" target="_blank">
                Australian Fellowship of Evangelical Students
              </a>{" "}
              in 2023. I will also continue to serve on staff at my home church,{" "}
              <a
                className="link"
                href="https://thebranch.org.au/"
                target="_blank"
              >
                The Branch Christian Church
              </a>
              .
            </p>
          </div>
          <div className="section-about__partner">
            <div className="section-about__logos">
              <div className="section-about__image">
                <a href="https://afes.org.au/" target="_blank">
                  <img src="/afes.png" alt="AFES" />
                </a>
              </div>
              <div className="section-about__image">
                <a href="https://thebranch.org.au/" target="_blank">
                  <img src="/thebranch_new.png" alt="The Branch" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section color="white">
        <div id="support" className="section-support">
          <div className="section-support__content">
            <h2 className="heading-secondary">Support</h2>
            <p className="paragraph">Will you consider partnering with me?</p>
            <p className="paragraph">
              I am currently seeking people to support me financially to start
              working with{" "}
              <a className="link" href="https://afes.org.au/" target="_blank">
                AFES
              </a>{" "}
              in 2023. I'm hoping to be able to support the Launceston students
              on campus 2 days a week. Please prayerfully consider if you would
              be able to make a regular pledge.
            </p>
            <p className="paragraph">
              If you aren't currently in a position to partner with me
              financially, I would still highly value your prayers for me and
              the ministry.
            </p>
          </div>
          <div className="section-support__buttons">
            <Button href="/support">AFES Partnership</Button>
            <Button href="/blog?tag=MTS%20Updates">Prayer Updates</Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

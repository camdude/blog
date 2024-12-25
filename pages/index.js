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
                Proclaiming Jesus Christ at University to make everyone mature
                in him.
              </h1>
              {/* <h2 className="hero__subheading">Hebrews 13:21</h2> */}
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
              <a className="link" href="https://moore.edu.au/" target="_blank">
                Moore Theological College
              </a>{" "}
              student living in Sydney. I enjoy playing clarinet in concert
              bands, playing board games, bushwalking, hanging out with friends
              and getting out of the city lights to stargaze into earth's
              amazing galaxy.
            </p>
            <p className="paragraph">
              I've prevously worked for the{" "}
              <a className="link" href="https://afes.org.au/" target="_blank">
                Australian Fellowship of Evangelical Students
              </a>{" "}
              and{" "}
              <a
                className="link"
                href="https://thebranch.org.au/"
                target="_blank"
              >
                The Branch Christian Church
              </a>{" "}
              after completing my 2-year{" "}
              <a className="link" href="https://mts.com.au/" target="_blank">
                MTS
              </a>{" "}
              apprenticeship with both of them in 2022.
            </p>
            <p className="paragraph">
              Over many years, I believe God has been growing my character,
              conviction and competencies, for his use in gospel ministry. I
              hope to continue developing those qualities in order to serve him
              more effectively. I have a passion for seeing people come to know
              Christ and encouraging others to constantly be growing in their
              own spiritual maturity.
            </p>
          </div>
          <div className="section-about__partner">
            <div className="section-about__logos">
              <div className="section-about__image">
                <a href="https://moore.edu.au/" target="_blank">
                  <img src="/moore.png" alt="Moore Theological College" />
                </a>
              </div>
              {/* <div className="section-about__image">
                <a href="https://www.barneysingleburn.com/" target="_blank">
                  <img src="/stbarnabas.png" alt="St Barnabas Anglican" />
                </a>
              </div> */}
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
            <h2 className="heading-secondary">Partner with me</h2>
            <p className="paragraph">Will you consider partnering with me?</p>
            <p className="paragraph">
              I'd love for you to join with me as I continue to be trained in
              ministry. I post semi-regular prayer updates for those who are
              interested in what I'm doing and staying connected with me.
            </p>
            <p className="paragraph">
              If you would like to financially support me to help cover some of
              my costs, you can do so by making a regular pledge.
            </p>
          </div>
          <div className="section-support__buttons">
            <Button href="/blog?tag=Moore%20Updates">Prayer Newsletter</Button>
            <Button href="/partner">Financial Partnership</Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { page: "home" },
  };
}

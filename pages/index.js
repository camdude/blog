import Head from "next/head";
import Button from "../components/Button";
import Footer from "../layouts/Footer";
import Layout from "../layouts/Layout";
import Navbar from "../layouts/Navbar";
import Section from "../layouts/Section";

export default function Home() {
  return (
    <Layout>
      <div className="">
        <Head>
          <title>Cameron Clifford</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Welcome to my personal website. Check out my blog to get updates on what I am currently thinking and doing."
          />
        </Head>
        <Navbar />
        <main className="">
          <Section color="grey">
            <div className="hero">
              <div className="hero__content">
                <div className="hero__headingContainer">
                  <h1 className="hero__heading">
                    To be equipped with everything good for doing his will, to
                    whom be glory for ever.
                  </h1>
                  <h2 className="hero__subheading">Hebrews 13:21</h2>
                </div>
                <div className="hero__cta">
                  <Button href="/#support">Partner With Me</Button>
                </div>
              </div>

              <div className="hero__portrait">
                <img className="hero__image" src="/portrait.jpg" alt="" />
              </div>
            </div>
          </Section>
          <Section color="secondary">
            <div id="about" className="section-about">
              <div className="section-about__content">
                <h2 className="heading-secondary">About Me</h2>
                <p className="paragraph">
                  Hi, I'm Cameron, a recent ICT graduate at UTAS currently
                  living in Launceston. I enjoy playing clarinet in concert
                  bands, playing board games, bushwalking, hanging out with
                  friends and more recently started appreciating astronomy.
                </p>
                <p className="paragraph">
                  Over the past few years while being at University I have
                  discovered how important it is to be actively living the
                  Christian life. I have a passion for seeing people come to
                  know Christ and to be encouraging others to constantly be
                  growing in their own spiritual maturity.
                </p>
                <p className="paragraph">
                  As I continue to learn how God wants me to serve him in his
                  kingdom, I am working with my home church,{" "}
                  <a
                    className="link"
                    href="https://thebranch.org.au/"
                    target="_blank"
                  >
                    The Branch Christian Church
                  </a>{" "}
                  as well as{" "}
                  <a
                    className="link"
                    href="https://mts.com.au/"
                    target="_blank"
                  >
                    Ministry Training Strategy
                  </a>{" "}
                  to help equip me with the right character, conviction and
                  competencies to be working in gospel ministry.
                </p>
              </div>
              <div className="section-about__partner">
                {/* <p className="u-center-text u-italic-text">Partnering with</p> */}
                <div className="section-about__logos">
                  <div className="section-about__image">
                    <a href="https://thebranch.org.au/" target="_blank">
                      <img src="/thebranch.png" alt="The Branch" />
                    </a>
                  </div>
                  <div className="section-about__image">
                    <a href="https://mts.com.au/" target="_blank">
                      <img src="/mts.png" alt="MTS" />
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
                <p className="paragraph">
                  Will you consider partnering with me? I am not asking for any
                  financial support but would love for your support in prayer as
                  I continue this journey. I plan to send out updates every now
                  and then of what I'm thinking and learning through email and
                  my blog.
                </p>
              </div>
              <div className="section-support__buttons">
                <Button href="/subscribe">MTS Email Updates</Button>
                <Button href="/blog">Blog</Button>
              </div>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </Layout>
  );
}

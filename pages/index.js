import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Section from "../layouts/Section";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Cameron Clifford's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="">
        {/* <Section color="white">
          <h1 className="heading-primary">Heading 1</h1>
          <h2 className="heading-secondary">Heading 2</h2>
          <h3 className="heading-tertiary">Heading 3</h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
            explicabo ducimus accusantium, facilis quasi pariatur maxime eveniet
            nihil corrupti quaerat ab sapiente provident ea architecto at ullam
            similique non rem?
          </p>
          <Link href="/">
            <a className="link">Link</a>
          </Link>
        </Section> */}
        <Section color="grey">
          <div className="hero">
            <div className="hero__content">
              <h3 className="hero__subheading">Lorem ipsum</h3>
              <h1 className="hero__heading">
                dolor sit amet consectetur adipisicing elit.
              </h1>
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
                Hi, I'm Cameron, a recent ICT graduate at UTAS currently living
                in Launceston. I enjoy playing clarinet in concert bands,
                playing board games, bushwalking, hanging out with friends and
                more recently started apreciating astronomy and stagazing.
              </p>
              <p className="paragraph">
                Over the past few years while being at University I have discovered how
                important it is to be activily living the Christian life. I have
                a passion for seeing others come to know Christ and to be
                encouraging others to constantly be growing in their own
                spiritual maturity.
              </p>
              <p className="paragraph">
                As I continue to learn how God wants me to serve him in his
                kingdom, I am partnering with my home church{" "}
                <a className="link" href="https://thebranch.org.au/">
                  The Branch Christian Church
                </a>{" "}
                as well as{" "}
                <a className="link" href="https://mts.com.au/">
                  Ministry Training Strategy
                </a>{" "}
                to help equip me with the right character, conviction and
                competencies to be working in gospel ministry.
              </p>
            </div>
            <div className="section-about__partner">
              <p className="u-center-text u-italic-text">Partnering with</p>
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
                Will you consider partnering with me in the gosepel? I am not
                asking for any financial support but would love for you to pray
                as I continue this journey. I am plan to send out regular
                updates of what I'm thinking and learning through my prayer
                email and blog.
              </p>
            </div>
            <div className="section-support__buttons">
              <Button href="/">Prayer Email</Button>
              <Button href="/blog">Blog</Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

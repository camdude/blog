import Script from "next/script";

import Section from "../layouts/Section";
import Layout from "../layouts/Layout";

export default function Bookings() {
  return (
    <Layout
      meta={{
        title: "Bookings",
        type: "website",
        image: "/support-banner.png",
        url: "/bookings",
        desc: "Book a time to meet with me.",
      }}
    >
      {/* <img className="BlogPost__coverImage" src="/support-banner.png" /> */}
      <Section color="secondary">
        <h2 className="heading-secondary">Book a time to meet with me</h2>
        <p className="paragraph">
        </p>
        <div class="tidycal-embed" data-path="cmrnclffrd" />
        <Script src="https://assets.tidycal.com/js/embed.js" async></Script>
      </Section>
    </Layout>
  );
}

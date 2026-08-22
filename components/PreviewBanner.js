import Link from "next/link";

import AlertMessage from "./AlertMessage";

const PreviewBanner = () => {
  return (
    <AlertMessage>
      <h2 className="heading-secondary">You are in preview mode</h2>
      <br />
      <Link href="/api/exit-preview">
        Leave preview mode
      </Link>
    </AlertMessage>
  );
};

export default PreviewBanner;

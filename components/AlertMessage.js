import Link from "next/link";

const AlertMessage = () => {
  return (
    <div className="AlertMessage">
      <h2 className="heading-secondary">You are in preview mode</h2>
      <br />
      <Link href="/api/exit-preview">
        Leave preview mode
      </Link>
    </div>
  );
};

export default AlertMessage;

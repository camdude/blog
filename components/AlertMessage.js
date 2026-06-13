import Link from "next/link";

const AlertMessage = ({children}) => {
  return (
    <div className="AlertMessage">
      {children}
    </div>
  );
};

export default AlertMessage;

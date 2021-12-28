import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultStyles, FileIcon } from "react-file-icon";

const FileDownload = ({ asset, filename }) => {
  const extension = filename.split('.').pop();

  return (
    <Link href={asset}>
      <a className="FileDownload">
        <div className="FileDownload__icon">
          <FileIcon extension={extension} {...defaultStyles[extension]} />
        </div>
        <div className="FileDownload__link">{filename}</div>
      </a>
    </Link>
  );
};

export default FileDownload;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultStyles, FileIcon } from "react-file-icon";

const FileDownload = ({ asset, filename, extension }) => {
  return (
    <a className="FileDownload" href={asset} target="_blank">
      <div className="FileDownload__file">
        <div className="FileDownload__icon">
          <FileIcon extension={extension} {...defaultStyles[extension]} />
        </div>
        <div className="FileDownload__link">{filename}</div>
      </div>
      <div className="FileDownload__icon">
        <FontAwesomeIcon icon="download" size="lg"/>
      </div>
    </a>
  );
};

export default FileDownload;

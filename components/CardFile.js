import FileDownload from "./FileDownload";

const CardFile = ({ title, desc, files, placeholder = false }) => {
  if (placeholder) {
    return (
      <div className="CardFile">
        <h2 className="CardFile__blank">____________________</h2>
        <p className="paragraph">
          Dolor sit amet consectetur adipisicing elit. Eveniet rerum numquam.
        </p>
      </div>
    );
  } else {
    return (
      <div className="CardFile">
        <h2 className="CardFile__title">{title}</h2>
        <p className="CardFile__description">{desc}</p>
        <div className="CardFile__fileList">
          {files.map((file) => {
            return (
              <FileDownload
                asset={`${file.asset.url}?dl=`}
                filename={file.asset.filename}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default CardFile;

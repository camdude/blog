import getYouTubeId from "get-youtube-id";

const YouTube = ({ url }) => {
  return (
    <div className="YouTube">
      <iframe
        title="YouTube Preview"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default YouTube;

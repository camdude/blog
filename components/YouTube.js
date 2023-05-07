import getYouTubeId from "get-youtube-id";

const YouTube = ({ url }) => {
  return (
    <iframe
      className="YouTube"
      title="YouTube Video"
      src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};

export default YouTube;

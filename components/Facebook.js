const Facebook = ({ url, size }) => {
  return (
    <div className="Facebook">
      <iframe
        className="Facebook__iframe"
        title="Facebook Post"
        src={`https://www.facebook.com/plugins/post.php?href=${url}&width=${size.w}&show_text=true&height=${size.h}&appId`}
        height={size.h}
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default Facebook;

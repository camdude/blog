import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LIST_VIEW_ICONS = ["list", "th"];

const PostList = ({ onChange, view, children }) => {
  return (
    <div className="PostList">
      <div className="PostList__controls">
        <FontAwesomeIcon
          className="PostList__controlButton"
          size="lg"
          icon={LIST_VIEW_ICONS[view]}
          onClick={() => {
            onChange();
          }}
        />
      </div>
      <div className="PostList__posts">{children}</div>
    </div>
  );
};

export default PostList;

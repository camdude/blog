import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PillButton from "../components/PillButton";

const LIST_VIEW_ICONS = ["list", "th"];

const PostList = ({ onChange, view, tagList, blogAmount, children }) => {
  const router = useRouter();
  const selectedTag = router.query.tag;

  return (
    <div className="PostList">
      <div className="PostList__controls">
        <FontAwesomeIcon
          className="PostList__control PostList__controlButton"
          size="lg"
          icon={LIST_VIEW_ICONS[view]}
          onClick={() => {
            onChange();
          }}
        />
        <div className="PostList__control">
          <select
            className="PostList__tagSelect"
            onChange={(e) => {
              if (e.target.value == "") {
                router.push("/blog");
              } else {
                router.push(`/blog?tag=${e.target.value}`);
              }
            }}
            defaultValue={selectedTag}
          >
            <option value="">All</option>
            {tagList.map((tag) => {
              return <option value={tag.name}>{tag.name}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="PostList__searchMsg">
        {!(selectedTag && blogAmount) || (
          <p>
            Showing results for "<b>{selectedTag}</b>"
            <PillButton href="/blog">Clear</PillButton>
          </p>
        )}
      </div>
      <div className="PostList__posts">{children}</div>
      {!(selectedTag && !blogAmount) || (
        <div className="PostList__errorMsg">
          <p>
            Could not find any blogs with tag "<b>{selectedTag}</b>".
          </p>
          <p>
            Please check what you are searching for is correct and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostList;

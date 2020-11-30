import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PillButton from "../components/PillButton";

const LIST_VIEW_ICONS = ["list", "th"];
const DATE_SORT_ICONS = ["sort-numeric-down", "sort-numeric-up"];

const PostList = ({ onChange, filter, tagList, children }) => {
  const router = useRouter();
  filter.tag.selected = router.query.tag || "";

  return (
    <div className="PostList">
      <div className="PostList__controls">
        <FontAwesomeIcon
          className="PostList__control PostList__controlButton"
          size="lg"
          icon={LIST_VIEW_ICONS[filter.view.list]}
          onClick={() => onChange("view", { list: +!filter.view.list })}
        />
        <FontAwesomeIcon
          className="PostList__control PostList__controlButton"
          size="lg"
          icon={DATE_SORT_ICONS[filter.date.asc]}
          onClick={() => onChange("date", { asc: +!filter.date.asc })}
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
            value={filter.tag.selected}
          >
            <option value="">All</option>
            {tagList.map((tag) => {
              return (
                <option key={tag.name} value={tag.name}>
                  {tag.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="PostList__searchMsg">
        {!filter.tag.selected || (
          <p>
            Showing results for "<b>{filter.tag.selected}</b>"
            <PillButton
              onClick={() => {
                filter.tag.selected = "";
                router.push("/blog");
              }}
            >
              Clear
            </PillButton>
          </p>
        )}
      </div>
      <div className="PostList__posts">{children}</div>
      {/* TODO: Add message for when no blogs with tag */}
    </div>
  );
};

export default PostList;

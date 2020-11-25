import { useSWRPages } from "swr";
import { useGetBlogs } from "../actions";
import CardImage from "../components/CardImage";
import Card from "../components/Card";

export const useGetBlogsPages = ({ blogs, listView }) => {
  // TODO: Update as useSWRPages is now depricated (https://swr.vercel.app/docs/pagination)
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      let initialData = !offset && blogs;
      const { data: paginatedBlogs } = withSWR(useGetBlogs({ offset }, initialData));

      if (!paginatedBlogs) {
        return "Loading...";
      }

      return paginatedBlogs.map((post) =>
        listView ? (
          <CardImage
            key={post.slug}
            coverImage={post.coverImage}
            title={post.title}
            author={post.author.name}
            date={post.date}
            link={{ href: "/blogs/[slug]", as: `/blogs/${post.slug}` }}
          >
            {post.description}
          </CardImage>
        ) : (
          <Card
            key={post.slug}
            coverImage={post.coverImage}
            title={post.title}
            author={post.author.name}
            date={post.date}
            link={{ href: "/blogs/[slug]", as: `/blogs/${post.slug}` }}
          >
            {post.description}
          </Card>
        )
      );
    },
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) {
        return null;
      }
      return (index + 1) * 3;
    },
    [listView]
  );
};

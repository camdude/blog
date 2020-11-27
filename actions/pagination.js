import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSWRPages } from "swr";
import { useGetBlogs } from "../actions";
import CardImage from "../components/CardImage";
import Card from "../components/Card";

export const useGetBlogsPages = ({ blogs, filter }) => {
  // TODO: Update as useSWRPages is now depricated (https://swr.vercel.app/docs/pagination)

  useEffect(() => {
    window.__pagination__init = true;
  }, []);

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const router = useRouter();
      const tag = router.query.tag || "";
      let initialData = !offset && blogs;

      if (typeof window !== "undefined" && window.__pagination__init) {
        initialData = null;
      }

      const blogsData = useGetBlogs({ offset, filter, tag }, initialData);
      const { data: paginatedBlogs } = withSWR(blogsData);

      if (!paginatedBlogs) {
        return Array(4)
          .fill(0)
          .map((_, i) =>
            filter.view.list ? (
              <CardImage key={i} placeholder />
            ) : (
              <Card key={i} placeholder />
            )
          );
      }

      return paginatedBlogs.map((post) =>
        filter.view.list ? (
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
    [filter]
  );
};

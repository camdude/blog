import { useRouter } from "next/router";
import { useSWRPages } from "swr";
import { useGetBlogs } from "../actions";
// import { useSWRInfinite, Suspense, usePagination } from "swr";
import CardImage from "../components/CardImage";
import Card from "../components/Card";

const BlogList = ({ blogs, filter }) => {
  console.log(blogs);

  return blogs.map((post) =>
    filter.view.list ? (
      <CardImage
        key={post.slug}
        coverImage={post.coverImage}
        title={post.title}
        author={post.author.name}
        date={post.date}
        link={{ href: "/blog/[slug]", as: `/blog/${post.slug}` }}
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
        link={{ href: "/blog/[slug]", as: `/blog/${post.slug}` }}
      >
        {post.description}
      </Card>
    )
  );
};

export const useGetBlogsPages = ({ blogs, filter }) => {
  // TODO: Update as useSWRPages is now depricated (https://swr.vercel.app/docs/pagination)
  // const fetcher = (url) => fetch(url).then((res) => res.json());

  // const router = useRouter();
  // const tag = router.query.tag || "";
  // const getKey = (pageIndex, previousPageData) => {
  //   if (previousPageData && !previousPageData.length) return null; // reached the end
  //   return `/api/blogs?offset=${pageIndex || 0}&date=${
  //     filter.date.asc ? "asc" : "desc"
  //   }&tag=${tag}`; // SWR key
  // };

  // const { data, error, size, setSize, mutate } = useSWRInfinite(
  //   getKey,
  //   fetcher
  // );

  // const { pages, hasNextPage, isLoadingMore } = usePagination(size);

  // console.log(pages);

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const router = useRouter();
      const tag = router.query.tag || "";

      const blogsData = useGetBlogs({ offset, filter, tag });

      const { data: paginatedBlogs, error } = withSWR(blogsData);

      if (!offset && !paginatedBlogs && !error) {
        return <BlogList blogs={blogs} filter={filter} />;
      }

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

      return <BlogList blogs={paginatedBlogs} filter={filter} />;
    },
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) {
        return null;
      }
      return (index + 1) * 4;
    },
    [filter]
  );
};

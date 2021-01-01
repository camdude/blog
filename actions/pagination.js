import { useRouter } from "next/router";
import { useSWRPages } from "swr";
import { useGetBlogs } from "../actions";
import CardImage from "../components/CardImage";
import Card from "../components/Card";

const BlogList = ({ blogs, filter }) => {
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

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const router = useRouter();
      const tag = router.query.tag || "";

      const blogsData = useGetBlogs({ offset, filter, tag });

      const { data: paginatedBlogs, error } = withSWR(blogsData);

      if(!offset && !paginatedBlogs && !error) {
        return <BlogList blogs={blogs} filter={filter} />
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

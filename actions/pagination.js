import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { useSWR } from "swr";
import { useGetBlogs } from "../actions";
import CardImage from "../components/CardImage";
import Card from "../components/Card";

const BlogList = ({ blogs, filter }) => {
  console.log("cards", blogs);

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

const merge = (first, second) => {
  for (let i = 0; i < second.length; i++) {
    first.push(second[i]);
  }
  return first;
};

export const useGetBlogsPages = ({ blogs, filter }) => {
  // TODO: Update as useSWRPages is now depricated (https://swr.vercel.app/docs/pagination)

  // console.log(blogs, filter, i);

  const router = useRouter();
  const tag = router.query.tag || "";

  const { data, error, isLoading, size, setSize } = useGetBlogs(
    { offset: 0, filter, tag },
    blogs
  );
  console.log("useGetBlogs", data, error, isLoading, size);

  const paginatedBlogs = [];

  if (data.length > 1) {
    for (let i = 0; i < data.length; i++) {
      console.log(i, data[i], data[i + 1]);
      // paginatedBlogs.push(merge(data[i], data[i + 1]));
    }
  }

  console.log("paginatedBlogs", paginatedBlogs);

  // console.log(getKey(0, filter, tag));

  // const { data, size, setSize, isLoading } = useSWRInfinite(getKey(0, filter, tag), fetcher);

  // console.log(useSWRInfinite(getKey(0, filter, tag), fetcher));
  // console.log(data, isLoading);

  console.log("BlogList", <BlogList blogs={paginatedBlogs} filter={filter} />);

  // const paginatedBlogs = []
  // for (let i = 0; i < size + 1; i++) {
  //   paginatedBlogs.push(<BlogList blogs={data[size]} filter={filter} />);
  // }

  // const paginatedBlogs = data.map((page, i) => {
  //   console.log(page);
  //   <BlogList blogs={page} filter={filter} />;
  // });
  // console.log("pBlogs", paginatedBlogs);
  

  return {
    pages: <BlogList blogs={paginatedBlogs} filter={filter} />,
    size,
    setSize,
    isLoading,
  };

  // return useSWRInfinite(getKey, fetcher);

  // const getKey = (offset, filter, tag) => {
  //   return `/api/blogs?offset=${offset || 0}&date=${
  //     filter.date.asc ? "asc" : "desc"
  //   }&tag=${tag}`; // SWR key
  // };

  // return useSWRPages(
  //   "index-page",
  //   ({ offset, withSWR }) => {
  //     const router = useRouter();
  //     const tag = router.query.tag || "";

  //     const blogsData = useGetBlogs({ offset, filter, tag });

  //     const { data: paginatedBlogs, error } = withSWR(blogsData);

  //     if(!offset && !paginatedBlogs && !error) {
  //       return <BlogList blogs={blogs} filter={filter} />
  //     }

  //     if (!paginatedBlogs) {
  //       return Array(4)
  //         .fill(0)
  //         .map((_, i) =>
  //           filter.view.list ? (
  //             <CardImage key={i} placeholder />
  //           ) : (
  //             <Card key={i} placeholder />
  //           )
  //         );
  //     }

  //     return <BlogList blogs={paginatedBlogs} filter={filter} />;
  //   },
  //   (SWR, index) => {
  //     if (SWR.data && SWR.data.length === 0) {
  //       return null;
  //     }
  //     return (index + 1) * 4;
  //   },
  //   [filter]
  // );
};

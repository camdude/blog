// import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetHello = () => useSWR("/api/hello", fetcher);

// const getKey = (offset, filter, tag) => {
//   return `/api/blogs?offset=${offset || 0}&date=${
//     filter.date.asc ? "asc" : "desc"
//   }&tag=${tag}`; // SWR key
// };

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/blogs?offset=${pageIndex}&date=&tag=`;
};

export const useGetBlogs = ({ offset, filter, tag }, initialData) => {
  return useSWRInfinite(getKey, fetcher, {
    fallbackData: initialData,
  });
};

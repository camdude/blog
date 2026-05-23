import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export const useGetHello = () =>
  useSWR("/api/hello", fetcher);

// export const useGetBlogs = (
//   { offset, filter, tag },
//   fallbackData
// ) => {
//   return useSWR(
//     `/api/blogs?offset=${offset || 0}&date=${
//       filter.date.asc ? "asc" : "desc"
//     }&tag=${tag}`,
//     fetcher,
//     {
//       fallbackData,
//     }
//   );
// };
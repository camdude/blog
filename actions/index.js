import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetHello = () => useSWR("/api/hello", fetcher);

export const useGetBlogs = ({ offset, filter, tag }, initialData) => {
  // const url = `/api/blogs?offset=${offset || 0}&date=${
  //   filter.date.asc ? "asc" : "desc"
  // }&tag=${tag}`;
  // const response = await fetch(url);

  // // Handle errors appropriately
  // if (!response.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // const data = await response.json();
  // return data;

  return useSWR(
    `/api/blogs?offset=${offset || 0}&date=${
      filter.date.asc ? "asc" : "desc"
    }&tag=${tag}`,
    fetcher,
    {
      initialData,
    }
  );
};

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

const PAGE_SIZE = 4;

export const useGetBlogsPages = ({ initialBlogs, filter }) => {
  const router = useRouter();
  const tag = router.query.tag || "";

  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [offset, setOffset] = useState(PAGE_SIZE);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isReachingEnd, setIsReachingEnd] = useState(false);

  const fetchPage = useCallback(
    async (offsetValue) => {
      const res = await fetch(
        `/api/blogs?offset=${offsetValue}&date=${
          filter.date.asc ? "asc" : "desc"
        }&tag=${tag}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      return res.json();
    },
    [filter.date.asc, tag]
  );

  // 🔥 RESET when filters change
  useEffect(() => {
    let ignore = false;

    const resetAndFetch = async () => {
      setIsLoadingMore(true);
      setIsReachingEnd(false);

      const firstPage = await fetchPage(0);

      if (ignore) return;

      setBlogs(firstPage);
      setOffset(PAGE_SIZE);
      setIsReachingEnd(firstPage.length < PAGE_SIZE);
      setIsLoadingMore(false);
    };

    resetAndFetch();

    return () => {
      ignore = true;
    };
  }, [filter.view.list, filter.date.asc, tag, fetchPage]);

  // 🔼 LOAD MORE
  const loadMore = async () => {
    if (isLoadingMore || isReachingEnd) return;

    setIsLoadingMore(true);

    const nextPage = await fetchPage(offset);

    if (!nextPage.length) {
      setIsReachingEnd(true);
      setIsLoadingMore(false);
      return;
    }

    setBlogs((prev) => [...prev, ...nextPage]);
    setOffset((prev) => prev + PAGE_SIZE);

    if (nextPage.length < PAGE_SIZE) {
      setIsReachingEnd(true);
    }

    setIsLoadingMore(false);
  };

  return {
    blogs,
    loadMore,
    isLoadingMore,
    isReachingEnd,
  };
};
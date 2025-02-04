"use client";
import { useEffect, useState, useCallback } from "react";
import PostList from "@/components/PostList";
import CommonApi from "@/api/Common";
import { Post } from "@/types/post";
import InfiniteScroll from "@/components/utils/InfiniteScroll";
import Counter from "@/components/utils/Counter";
import Auth from "@/components/utils/Auth";
import TodoList from "@/components/utils/TodoList";
import ThemeSwitcher from "@/components/utils/ThemeSwitcher";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page_size = 10;

  const loadPosts = useCallback(
    async (page: number) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res = await CommonApi.getPostList({ page, page_size });
        const newPosts = res?.data?.list || [];
        if (newPosts.length < page_size) {
          setHasMore(false); // no more posts to load
        }
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, page_size]
  );

  useEffect(() => {
    return () => {
      setPosts([]); // Cleanup posts when the component unmounts
      setPage(1); // Reset page to 1
      setHasMore(true); // Ensure more posts are available on next load
    };
  }, []);

  const loadMorePosts = () => {
    if (!isLoading && hasMore) {
      // Increment page number
      loadPosts(page);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <TodoList />
      <Counter />
      <Auth />
      <ThemeSwitcher></ThemeSwitcher>
      <InfiniteScroll
        loadMore={loadMorePosts}
        isLoading={isLoading}
        hasMore={hasMore}
      >
        <PostList posts={posts} />
      </InfiniteScroll>
      {isLoading && <p className="text-center my-4">Loading...</p>}
      {!hasMore && <p className="text-center my-4">No more posts.</p>}
    </div>
  );
}

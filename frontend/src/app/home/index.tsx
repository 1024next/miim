"use client";
import { useEffect, useRef, useState } from "react";
import PostList from "@/components/PostList";
import CommonApi from "@/api/Common";
import { Post } from "@/types/post";
import InfiniteScroll from "@/components/utils/InfiniteScroll";

// Home 页面组件：用于显示文章目录，并支持下滑加载更多文章
export default function Home() {
  // posts 状态：存储当前加载的文章数组
  const [posts, setPosts] = useState<Post[]>([]);
  // page 状态：当前请求的页码
  const [page, setPage] = useState(1);
  // isLoading 状态：当前是否处于加载状态
  const [isLoading, setIsLoading] = useState(false);
  // hasMore 状态：是否还有更多文章可以加载
  const [hasMore, setHasMore] = useState(true);
  // 每页加载的文章数量
  const page_size = 10;
  // initialized 用于记录是否已进行过首次加载，防止重复请求第一页
  const initialized = useRef(false);

  // 加载文章的函数，根据传入的页码请求对应的数据
  const loadPosts = async (page: number) => {
    // 如果当前正处于加载状态，则直接返回，避免重复请求
    if (isLoading) return;
    setIsLoading(true);
    try {
      // 通过 CommonApi.getPostList 请求文章数据，传入页码和每页文章数量
      const res = await CommonApi.getPostList({ page, page_size });
      // 从返回结果中获取文章列表；若数据不存在，则默认为空数组
      const newPosts = res?.data?.list || [];

      // 如果返回的数据量小于 page_size，说明没有更多数据了
      if (newPosts.length < page_size) {
        setHasMore(false);
      }
      // 更新状态，触发页面重新渲染
      setPosts([...posts, ...newPosts]);
    } catch (error) {
      // 请求出错时，在控制台输出错误，并设置错误提示信息
      console.error("Error fetching posts:", error);
    } finally {
      // 无论请求成功还是失败，结束加载状态
      setIsLoading(false);
    }
  };

  // 页面首次加载时请求数据（仅在首次挂载时执行）

  useEffect(() => {
    if (!initialized.current) {
      // 标记首次加载已执行
      initialized.current = true;
      loadPosts(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 依赖数组为空，确保只在组件首次挂载时执行

  // 当 page 状态变化时（即加载更多时）请求新数据
  useEffect(() => {
    if (page > 1) {
      loadPosts(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 在组件卸载时，清空状态，防止切换页面时数据残留
  useEffect(() => {
    return () => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
    };
  }, []);

  // 加载更多文章的函数：当下滑时调用，将页码加 1
  const loadMorePosts = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 使用 InfiniteScroll 组件包裹 PostList，实现下滑自动加载 */}
      <InfiniteScroll loadMore={loadMorePosts} isLoading={isLoading}>
        <PostList posts={posts} />
      </InfiniteScroll>
      {/* 显示加载状态指示 */}
      {isLoading && <p className="text-center my-4">Loading...</p>}
      {/* 显示没有更多文章的提示 */}
      {!hasMore && <p className="text-center my-4">No more posts.</p>}
    </div>
  );
}

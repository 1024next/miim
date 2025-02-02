// hooks/useInfiniteScroll.ts

import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  loadMore: () => void; // 加载更多数据的函数
  isLoading: boolean; // 当前是否正在加载
};

const useInfiniteScroll = ({ loadMore, isLoading }: UseInfiniteScrollProps) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMore(); // 如果页面底部出现，调用加载更多
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "100px", // 提前100px就开始加载
      threshold: 1.0, // 完全进入视口
    });

    if (triggerRef.current) {
      observer.observe(triggerRef.current); // 观察触发元素
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current); // 清理 observer
      }
    };
  }, [isLoading, loadMore]);

  return triggerRef;
};

export default useInfiniteScroll;

import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  loadMore: () => void; // 加载更多数据的函数
  isLoading: boolean; // 是否正在加载
  children: React.ReactNode; // 需要包裹的子元素
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  isLoading,
  children,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          console.log(123123);

          loadMore(); // 当元素进入视口时，调用 loadMore 函数加载更多数据
        }
      },
      {
        rootMargin: "100px", // 提前加载 100px
        threshold: 1.0, // 可以根据需要设置触发的比例
      }
    );

    const triggerElement = triggerRef.current;
    if (triggerElement) {
      observer.observe(triggerElement);
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [isLoading, loadMore]);

  return (
    <div>
      {children}
      <div
        ref={triggerRef}
        style={{
          height: "50px",
          background: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? <p>Loading...</p> : <p>Scroll down to load more...</p>}
      </div>
    </div>
  );
};

export default InfiniteScroll;

import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  loadMore: () => void; // Function to load more data
  isLoading: boolean; // Whether loading is in progress
  hasMore: boolean; // Whether more data is available
  children: React.ReactNode; // Child elements to be wrapped
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  isLoading,
  hasMore,
  children,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // Ensure loadMore is only triggered when it's visible, and loading isn't already happening
        if (entry.isIntersecting && !isLoading && hasMore) {
          console.log("Load more triggered"); // Debugging to check loadMore is called
          loadMore(); // Trigger loading more data when element is in view
        }
      },
      {
        rootMargin: "100px", // Trigger load 100px before the element is in view
        threshold: 0.5, // Trigger when 50% of the trigger element is in view
      }
    );

    const triggerElement = triggerRef.current;
    if (triggerElement) {
      observer.observe(triggerElement); // Start observing the trigger element
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement); // Clean up the observer when component unmounts
      }
    };
  }, [isLoading, hasMore, loadMore]);

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
          textAlign: "center",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : hasMore ? (
          <p>Scroll down to load more...</p>
        ) : (
          <p>No more data to load.</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;

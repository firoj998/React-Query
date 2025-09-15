import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const fetchFruits = async ({ pageParam }) => {
  return await axios.get(
    `http://localhost:3000/fruits?${
      pageParam ? `_page=${pageParam}&_per_page=10` : ""
    }`
  );
};
const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 5) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  //console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      {data?.pages?.map((page) => {
        return page?.data?.data?.map((fruit) => {
          return (
            <div key={fruit.id} className="fruit-item">
              {fruit.name}
            </div>
          );
        });
      })}
      {/* <button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More..
      </button> */}
      {/* Infinit scrolling without using button */}
      <div ref={ref}>{isFetchingNextPage && "Loading.."}</div>
    </div>
  );
};
export default InfiniteQueries;

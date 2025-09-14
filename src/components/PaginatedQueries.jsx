import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = async (pageId) => {
  return await axios.get(
    `http://localhost:3000/fruits?${
      pageId ? `_page=${pageId}&_per_page=4` : ""
    }`
  );
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page), // ✅ use page from queryKey
  });
  console.log("Page:", page, "Data:", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data?.data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 0 ? true : false}
      >
        Prev Page
      </button>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === 4 ? true : false}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginatedQueries;

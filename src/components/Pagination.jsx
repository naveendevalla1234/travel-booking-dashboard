import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  page,
  totalPages,
  setPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <div className="page-number">
        {page} / {totalPages}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
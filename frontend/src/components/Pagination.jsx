const LIMIT_OPTIONS = [10, 25, 50, 100];

const Pagination = ({ pagination, query, onPageChange, onLimitChange }) => {
  const { currentPage, totalPages, totalItems } = pagination;
  const currentLimit = query?.limit || 10;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, Math.min(currentPage - 2, totalPages - maxVisible + 1));
      const end = Math.min(totalPages, start + maxVisible - 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between py-4 px-4 lg:px-6">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Rows per page:</span>
        <select
          value={currentLimit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          {LIMIT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-0.5">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[28px] h-7 px-2 text-xs font-medium rounded transition-colors ${
              page === currentPage
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Total info */}
      <div className="text-xs text-gray-500">
        {((currentPage - 1) * currentLimit) + 1}-{Math.min(currentPage * currentLimit, totalItems)} of {totalItems}
      </div>
    </div>
  );
};

export default Pagination;

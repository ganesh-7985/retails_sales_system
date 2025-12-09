import { useState } from 'react';
import { useSales } from './hooks/useSales';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';
import SortDropdown from './components/SortDropdown';
import SummaryCards from './components/SummaryCards';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';
import { AlertCircle, Search, Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const {
    sales,
    pagination,
    filterOptions,
    query,
    loading,
    error,
    handleSearch,
    handleFilterChange,
    clearFilters,
    handleSort,
    goToPage,
    nextPage,
    prevPage,
    handleLimitChange
  } = useSales();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header Bar - Fixed */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Sales Management System</h1>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-48 lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={query.search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Name, Phone no."
                className="block w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </header>

        {/* Filters and Sort Bar - Fixed */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-2 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <FilterBar
              filterOptions={filterOptions}
              query={query}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
            <SortDropdown
              sortBy={query.sortBy}
              sortOrder={query.sortOrder}
              onSort={handleSort}
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-auto">
          {/* Summary Cards */}
          <div className="px-4 lg:px-6 py-3">
            <SummaryCards sales={sales} pagination={pagination} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-4 lg:mx-6 mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 text-sm">Error loading data</h3>
                <p className="text-xs text-red-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="px-4 lg:px-6">
            <DataTable sales={sales} loading={loading} />
          </div>

          {/* Pagination */}
          <Pagination
            pagination={pagination}
            query={query}
            onPageChange={goToPage}
            onLimitChange={handleLimitChange}
          />
        </main>
      </div>
    </div>
  );
}

export default App;

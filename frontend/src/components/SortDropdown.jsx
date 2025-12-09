import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'date-desc', label: 'Date (Newest First)', sortBy: 'date', sortOrder: 'desc' },
  { value: 'date-asc', label: 'Date (Oldest First)', sortBy: 'date', sortOrder: 'asc' },
  { value: 'quantity-desc', label: 'Quantity (High to Low)', sortBy: 'quantity', sortOrder: 'desc' },
  { value: 'quantity-asc', label: 'Quantity (Low to High)', sortBy: 'quantity', sortOrder: 'asc' },
  { value: 'customerName-asc', label: 'Customer Name (A-Z)', sortBy: 'customerName', sortOrder: 'asc' },
  { value: 'customerName-desc', label: 'Customer Name (Z-A)', sortBy: 'customerName', sortOrder: 'desc' }
];


const SortDropdown = ({ sortBy, sortOrder, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentValue = `${sortBy}-${sortOrder}`;
  const currentOption = sortOptions.find(opt => opt.value === currentValue) || sortOptions[4];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSort(option.sortBy, option.sortOrder);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-300 rounded text-xs text-gray-600 hover:border-gray-400 transition-colors"
      >
        <span>Sort by: {currentOption.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-[100]" style={{ top: dropdownRef.current?.getBoundingClientRect().bottom + 'px', right: window.innerWidth - dropdownRef.current?.getBoundingClientRect().right + 'px' }}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t last:rounded-b transition-colors ${
                option.value === currentValue
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

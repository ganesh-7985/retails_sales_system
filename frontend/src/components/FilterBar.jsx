import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';

const FilterDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const displayText = selected.length > 0 
    ? `${selected.length} selected` 
    : label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded transition-colors ${
          selected.length > 0 
            ? 'border-purple-300 bg-purple-50 text-purple-700' 
            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
        }`}
      >
        <span>{displayText}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg z-[100] max-h-48 overflow-y-auto" style={{ top: dropdownRef.current?.getBoundingClientRect().bottom + 'px', left: dropdownRef.current?.getBoundingClientRect().left + 'px' }}>
          {options.length === 0 ? (
            <div className="px-2 py-1.5 text-xs text-gray-500">No options</div>
          ) : (
            options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="w-3.5 h-3.5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-xs text-gray-700">{option}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const AgeRangeDropdown = ({ minValue, maxValue, onMinChange, onMaxChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasValue = minValue !== '' || maxValue !== '';
  const displayText = hasValue 
    ? `${minValue || '0'} - ${maxValue || '100'}` 
    : 'Age Range';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded transition-colors ${
          hasValue 
            ? 'border-purple-300 bg-purple-50 text-purple-700' 
            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
        }`}
      >
        <span>{displayText}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-[100] p-2" style={{ top: dropdownRef.current?.getBoundingClientRect().bottom + 'px', left: dropdownRef.current?.getBoundingClientRect().left + 'px' }}>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={minValue}
              onChange={(e) => onMinChange(e.target.value)}
              placeholder="Min"
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="text-gray-400 text-xs">-</span>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => onMaxChange(e.target.value)}
              placeholder="Max"
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const DateRangeDropdown = ({ fromValue, toValue, onFromChange, onToChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasValue = fromValue !== '' || toValue !== '';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs border rounded transition-colors ${
          hasValue 
            ? 'border-purple-300 bg-purple-50 text-purple-700' 
            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
        }`}
      >
        <span>Date</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg z-[100] p-2" style={{ top: dropdownRef.current?.getBoundingClientRect().bottom + 'px', left: dropdownRef.current?.getBoundingClientRect().left + 'px' }}>
          <div className="space-y-1.5">
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">From</label>
              <input
                type="date"
                value={fromValue}
                onChange={(e) => onFromChange(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-0.5 block">To</label>
              <input
                type="date"
                value={toValue}
                onChange={(e) => onToChange(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterBar = ({ filterOptions, query, onFilterChange, onClearFilters }) => {
  const hasActiveFilters = 
    query.customerRegion.length > 0 ||
    query.gender.length > 0 ||
    query.ageMin !== '' ||
    query.ageMax !== '' ||
    query.productCategory.length > 0 ||
    query.tags.length > 0 ||
    query.paymentMethod.length > 0 ||
    query.dateFrom !== '' ||
    query.dateTo !== '';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-gray-400">
        <Filter className="w-3.5 h-3.5" />
      </div>

      <FilterDropdown
        label="Customer Region"
        options={filterOptions.customerRegions}
        selected={query.customerRegion}
        onChange={(value) => onFilterChange('customerRegion', value)}
      />

      <FilterDropdown
        label="Gender"
        options={filterOptions.genders}
        selected={query.gender}
        onChange={(value) => onFilterChange('gender', value)}
      />

      <AgeRangeDropdown
        minValue={query.ageMin}
        maxValue={query.ageMax}
        onMinChange={(value) => onFilterChange('ageMin', value)}
        onMaxChange={(value) => onFilterChange('ageMax', value)}
      />

      <FilterDropdown
        label="Product Category"
        options={filterOptions.productCategories}
        selected={query.productCategory}
        onChange={(value) => onFilterChange('productCategory', value)}
      />

      <FilterDropdown
        label="Tags"
        options={filterOptions.tags}
        selected={query.tags}
        onChange={(value) => onFilterChange('tags', value)}
      />

      <FilterDropdown
        label="Payment Method"
        options={filterOptions.paymentMethods}
        selected={query.paymentMethod}
        onChange={(value) => onFilterChange('paymentMethod', value)}
      />

      <DateRangeDropdown
        fromValue={query.dateFrom}
        toValue={query.dateTo}
        onFromChange={(value) => onFilterChange('dateFrom', value)}
        onToChange={(value) => onFilterChange('dateTo', value)}
      />

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 px-1.5 py-1 text-xs text-red-600 hover:text-red-700"
        >
          <X className="w-3 h-3" />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
};

export default FilterBar;

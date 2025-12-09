import { Copy, Package } from 'lucide-react';

const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  return d.toISOString().split('T')[0];
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '-';
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

const CopyButton = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
      title="Copy to clipboard"
    >
      <Copy className="w-3 h-3" />
    </button>
  );
};

const DataTable = ({ sales, loading }) => {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-50 border-b border-gray-200" />
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-9 border-b border-gray-100 flex items-center px-3 gap-3">
              <div className="h-2.5 bg-gray-100 rounded w-14" />
              <div className="h-2.5 bg-gray-100 rounded w-16" />
              <div className="h-2.5 bg-gray-100 rounded w-16" />
              <div className="h-2.5 bg-gray-100 rounded w-20" />
              <div className="h-2.5 bg-gray-100 rounded w-24" />
              <div className="h-2.5 bg-gray-100 rounded w-12" />
              <div className="h-2.5 bg-gray-100 rounded w-8" />
              <div className="h-2.5 bg-gray-100 rounded w-16" />
              <div className="h-2.5 bg-gray-100 rounded w-8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Transaction ID
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Date
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Customer ID
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Customer name
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Phone Number
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Gender
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Age
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Product Category
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Quantity
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Total Amount
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Customer region
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Product ID
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Employee name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sales.map((sale, index) => (
              <tr key={sale._id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2.5 text-sm text-gray-900 whitespace-nowrap">
                  {sale._id?.slice(-7) || `${1234567 + index}`}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {formatDate(sale.date)}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-900 font-medium whitespace-nowrap">
                  {sale.customerId}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-900 whitespace-nowrap">
                  {sale.customerName}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>+91 {sale.phoneNumber?.replace('+91', '')}</span>
                    <CopyButton text={sale.phoneNumber} />
                  </div>
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {sale.gender}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {sale.age}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {sale.productCategory}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {String(sale.quantity).padStart(2, '0')}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-900 font-medium whitespace-nowrap">
                  {formatCurrency(sale.finalAmount)}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {sale.customerRegion}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-900 font-medium whitespace-nowrap">
                  {sale.productId}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                  {sale.employeeName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

import { Info } from 'lucide-react';

const SummaryCards = ({ sales }) => {
  const totalUnits = sales.reduce((sum, sale) => sum + (sale.quantity || 0), 0);
  const totalAmount = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
  const totalDiscount = sales.reduce((sum, sale) => {
    const discount = (sale.totalAmount || 0) - (sale.finalAmount || 0);
    return sum + discount;
  }, 0);

  const discountedItems = sales.filter(sale => sale.discountPercentage > 0).length;

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded">
        <span className="text-xs text-gray-600">Total units sold</span>
        <Info className="w-3 h-3 text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">{totalUnits}</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded">
        <span className="text-xs text-gray-600">Total Amount</span>
        <Info className="w-3 h-3 text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
        <span className="text-xs text-gray-500">({sales.length} SRs)</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded">
        <span className="text-xs text-gray-600">Total Discount</span>
        <Info className="w-3 h-3 text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalDiscount)}</span>
        <span className="text-xs text-gray-500">({discountedItems} SRs)</span>
      </div>
    </div>
  );
};

export default SummaryCards;

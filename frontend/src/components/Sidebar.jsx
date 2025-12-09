import { useState } from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Download, 
  Settings, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  Store
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'nexus', label: 'Nexus', icon: Compass },
  { id: 'intake', label: 'Intake', icon: Download },
  { 
    id: 'services', 
    label: 'Services', 
    icon: Settings,
    children: [
      { id: 'pre-active', label: 'Pre-active' },
      { id: 'active', label: 'Active' },
      { id: 'blocked', label: 'Blocked' },
      { id: 'closed', label: 'Closed' }
    ]
  },
  { 
    id: 'invoices', 
    label: 'Invoices', 
    icon: FileText,
    children: [
      { id: 'proforma', label: 'Proforma Invoices' },
      { id: 'final', label: 'Final Invoices' }
    ]
  }
];

const Sidebar = ({ onClose }) => {
  const [expandedItems, setExpandedItems] = useState(['services', 'invoices']);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <aside className="w-56 bg-white border-r border-gray-100 h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-900 text-sm">Vault</h1>
            <p className="text-xs text-gray-500 truncate">Anurag Yadav</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                  } else {
                    setActiveItem(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  activeItem === item.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.children && (
                  expandedItems.includes(item.id) 
                    ? <ChevronDown className="w-4 h-4 text-gray-400" />
                    : <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {/* Sub-items */}
              {item.children && expandedItems.includes(item.id) && (
                <ul className="ml-7 mt-0.5 space-y-0.5">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => setActiveItem(child.id)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                          activeItem === child.id
                            ? 'bg-gray-100 text-gray-900 font-medium'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        }`}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

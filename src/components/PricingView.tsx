import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, Filter, ArrowUpDown } from 'lucide-react';
import { pricingData, PricingEntry } from '../data/pricingData';

export const PricingView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof PricingEntry; direction: 'asc' | 'desc' } | null>({
    key: 'pricePerHour',
    direction: 'asc'
  });

  const handleSort = (key: keyof PricingEntry) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let sortableData = [...pricingData];

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      sortableData = sortableData.filter(
        (item) =>
          item.gpu.toLowerCase().includes(lowercasedSearch) ||
          item.provider.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [searchTerm, sortConfig]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'High': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Waitlist': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">GPU Rental Pricing</h2>
          <p className="text-gray-400 text-sm mt-1">Compare hourly rates across major cloud providers and specialized GPU clouds.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[#333] rounded-lg leading-5 bg-[#1a1a1a] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search GPU or Provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#222]">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('gpu')}
                >
                  <div className="flex items-center gap-2">
                    GPU Model
                    {sortConfig?.key === 'gpu' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('provider')}
                >
                  <div className="flex items-center gap-2">
                    Provider
                    {sortConfig?.key === 'provider' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('memory')}
                >
                  <div className="flex items-center gap-2">
                    VRAM
                    {sortConfig?.key === 'memory' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('pricePerHour')}
                >
                  <div className="flex items-center gap-2">
                    Price / Hour
                    {sortConfig?.key === 'pricePerHour' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('availability')}
                >
                  <div className="flex items-center gap-2">
                    Availability
                    {sortConfig?.key === 'availability' && <ArrowUpDown size={12} />}
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Link
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#111] divide-y divide-[#222]">
              {filteredAndSortedData.map((item) => (
                <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-white">{item.gpu}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{item.provider}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400 font-mono">{item.memory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-emerald-400 font-bold">
                      ${item.pricePerHour.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getAvailabilityColor(item.availability)}`}>
                      {item.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAndSortedData.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No GPUs or providers found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 flex items-center gap-2 bg-[#1a1a1a] p-3 rounded-lg border border-[#222]">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        Prices are estimates for on-demand instances and may vary based on region, commitment, and availability.
      </div>
    </div>
  );
};

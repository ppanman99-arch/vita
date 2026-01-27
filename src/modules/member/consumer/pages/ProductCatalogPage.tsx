import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { consumerService } from '../../application/ConsumerService';
import type { Product } from '../../domain/consumer';
import ProductCard from '../components/ProductCard';

export default function ProductCatalogPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCoop, setFilterCoop] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    consumerService.getMemberProducts().then((list) => {
      setProducts(list);
      setLoading(false);
    });
  }, []);

  const cooperatives = Array.from(new Set(products.map((p) => p.cooperative))).sort();
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();
  const filtered = products.filter((p) => {
    if (filterCoop !== 'all' && p.cooperative !== filterCoop) return false;
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-gray-500"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Sản phẩm HTX</h1>
              <p className="text-sm text-gray-500">Giá ưu đãi xã viên</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {(cooperatives.length > 1 || categories.length > 1) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <select value={filterCoop} onChange={(e) => setFilterCoop(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option value="all">Tất cả HTX</option>
              {cooperatives.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option value="all">Tất cả danh mục</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} onSelect={() => {}} />)}
        </div>
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-shopping-bag-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Không có sản phẩm phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
}

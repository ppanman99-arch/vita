import { useState, useEffect } from 'react';
import BackButton from '@/components/shared/BackButton';
import { capitalService } from '../../application/CapitalService';
import type { CapitalTransaction, TransactionType } from '../../domain/capital';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

const formatDate = (s: string) => new Date(s).toLocaleDateString('vi-VN');

const TYPE_LABEL: Record<TransactionType, string> = {
  invest: 'Góp vốn',
  withdraw: 'Rút vốn',
  dividend: 'Cổ tức',
};

const TYPE_ICON: Record<TransactionType, string> = {
  invest: 'ri-add-circle-line',
  withdraw: 'ri-subtract-circle-line',
  dividend: 'ri-money-dollar-circle-line',
};

export default function CapitalTransactionsPage() {
  const [transactions, setTransactions] = useState<CapitalTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');

  useEffect(() => {
    capitalService.getTransactions().then((list) => {
      setTransactions(list);
      setLoading(false);
    });
  }, []);

  const filtered =
    filterType === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Lịch sử giao dịch</h1>
              <p className="text-sm text-gray-500">Góp vốn, rút vốn, cổ tức</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Tất cả
          </button>
          {(['invest', 'dividend', 'withdraw'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === t ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((tx) => {
            const isCredit = tx.type === 'dividend' || (tx.type === 'withdraw' && tx.amount > 0);
            const amt = Math.abs(tx.amount);
            return (
              <div
                key={tx.id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <i className={`${TYPE_ICON[tx.type]} text-amber-600 text-lg`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">{TYPE_LABEL[tx.type]}</p>
                  <p className="text-sm text-gray-600">{tx.description}</p>
                  {tx.projectName && <p className="text-xs text-gray-400 mt-0.5">{tx.projectName}</p>}
                  <p className="text-xs text-gray-400 mt-1">{formatDate(tx.createdAt)}</p>
                </div>
                <div className={`flex-shrink-0 font-semibold ${isCredit ? 'text-green-600' : 'text-gray-900'}`}>
                  {isCredit ? '+' : '-'}{formatCurrency(amt)}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <i className="ri-bank-card-line text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">Chưa có giao dịch.</p>
          </div>
        )}
      </div>
    </div>
  );
}

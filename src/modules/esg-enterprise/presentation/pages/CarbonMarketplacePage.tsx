import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/shared/BackButton';
import { carbonService } from '../../application/CarbonService';
import type { CarbonCredit, CarbonTransaction } from '../../domain/carbon';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function CarbonMarketplacePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'buy' | 'sell' | 'history'>('buy');
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [transactions, setTransactions] = useState<CarbonTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [sellAmount, setSellAmount] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [buyAmount, setBuyAmount] = useState('');

  useEffect(() => {
    Promise.all([carbonService.listCarbonCredits(), carbonService.getTransactionHistory()]).then(([c, t]) => {
      setCredits(c);
      setTransactions(t);
      setLoading(false);
    });
  }, []);

  const handleBuy = async (creditId: string) => {
    const amount = parseInt(buyAmount, 10);
    if (!creditId || isNaN(amount) || amount <= 0) {
      alert('Nhập số lượng hợp lệ.');
      return;
    }
    setBuyingId(creditId);
    try {
      await carbonService.buyCarbonCredits(creditId, amount);
      const [c, t] = await Promise.all([carbonService.listCarbonCredits(), carbonService.getTransactionHistory()]);
      setCredits(c);
      setTransactions(t);
      setBuyAmount('');
      setBuyingId(null);
    } catch (e: unknown) {
      alert((e as Error)?.message ?? 'Có lỗi.');
      setBuyingId(null);
    }
  };

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(sellAmount, 10);
    const price = parseInt(sellPrice.replace(/\D/g, ''), 10);
    if (isNaN(amount) || amount <= 0 || isNaN(price) || price <= 0) {
      alert('Nhập số lượng và đơn giá hợp lệ.');
      return;
    }
    try {
      await carbonService.sellCarbonCredits(amount, price);
      const c = await carbonService.listCarbonCredits();
      setCredits(c);
      setSellAmount('');
      setSellPrice('');
    } catch (e: unknown) {
      alert((e as Error)?.message ?? 'Có lỗi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-gray-500"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <BackButton className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Sàn Tín chỉ Carbon</h1>
              <p className="text-sm text-gray-500">Mua / bán tín chỉ CO₂</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          {(['buy', 'sell', 'history'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {t === 'buy' ? 'Mua tín chỉ' : t === 'sell' ? 'Đăng bán' : 'Lịch sử'}
            </button>
          ))}
        </div>

        {tab === 'buy' && (
          <div className="space-y-4">
            {credits.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{c.projectName ?? 'Tín chỉ Carbon'}</h3>
                    <p className="text-sm text-gray-500">{c.sellerName}</p>
                    <p className="text-emerald-600 font-bold mt-2">{c.amount} tấn · {formatCurrency(c.pricePerTon)}/tấn</p>
                  </div>
                  <div className="flex gap-2 items-end">
                    <input
                      type="number"
                      min={1}
                      max={c.amount}
                      value={buyingId === c.id ? buyAmount : ''}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      onFocus={() => setBuyingId(c.id)}
                      placeholder="Số tấn"
                      className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => handleBuy(c.id)}
                      disabled={buyingId === c.id && (!buyAmount || parseInt(buyAmount, 10) <= 0)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                    >
                      Mua
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {credits.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
                <i className="ri-leaf-line text-4xl mb-4" />
                <p>Hiện không có tín chỉ nào rao bán.</p>
              </div>
            )}
          </div>
        )}

        {tab === 'sell' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md">
            <h3 className="font-semibold text-gray-900 mb-4">Đăng bán tín chỉ Carbon</h3>
            <form onSubmit={handleSell} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng (tấn CO₂)</label>
                <input value={sellAmount} onChange={(e) => setSellAmount(e.target.value)} type="number" min={1} placeholder="100" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá (VNĐ/tấn)</label>
                <input value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="500000" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
              <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">Đăng tin</button>
            </form>
          </div>
        )}

        {tab === 'history' && (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{tx.type === 'buy' ? 'Mua' : 'Bán'} {tx.amount} tấn</p>
                  <p className="text-sm text-gray-500">{tx.counterparty} · {new Date(tx.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(tx.totalAmount)}</p>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
                <i className="ri-history-line text-4xl mb-4" />
                <p>Chưa có giao dịch.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import type { Product } from '../../domain/consumer';

interface ProductCardProps {
  product: Product;
  onSelect?: (id: string) => void;
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const hasMemberPrice = product.memberPrice != null && product.memberPrice < product.price;

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      role={onSelect ? 'button' : undefined}
      onClick={onSelect ? () => onSelect(product.id) : undefined}
    >
      {product.image && (
        <div className="h-36 w-full overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      )}
      {!product.image && (
        <div className="h-24 w-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
          <i className="ri-plant-line text-4xl text-blue-200" />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.cooperative}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          {hasMemberPrice && (
            <span className="text-sm text-gray-400 line-through">{formatCurrency(product.price)}</span>
          )}
          <span className="font-bold text-blue-600">
            {formatCurrency(hasMemberPrice ? product.memberPrice! : product.price)}
            {product.unit && <span className="text-gray-500 font-normal text-sm">/{product.unit}</span>}
          </span>
        </div>
        {hasMemberPrice && (
          <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
            Giá xã viên
          </span>
        )}
      </div>
    </div>
  );
}

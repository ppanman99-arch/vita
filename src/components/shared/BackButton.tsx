import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  label?: string;
  icon?: string;
}

export default function BackButton({ 
  className = '', 
  label = 'Quay lại',
  icon = 'ri-arrow-left-line'
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Quay về trang trước đó trong browser history
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 ${className}`}
    >
      <i className={`${icon} text-lg`}></i>
      <span>{label}</span>
    </button>
  );
}


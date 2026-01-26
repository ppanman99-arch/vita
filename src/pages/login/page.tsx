import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PortalSwitcher from '../../components/shared/PortalSwitcher';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') as 'farmer' | 'cooperative' | 'research' | 'enterprise' | 'physician' | 'admin' | null;
  const redirectTo = searchParams.get('redirect') as 'forestry' | 'investor' | 'consumer' | null;
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'farmer' | 'cooperative' | 'research' | 'enterprise' | 'physician' | 'admin' | null>(roleFromUrl);
  const [error, setError] = useState('');

  // Nếu có role từ URL, tự động set userType
  useEffect(() => {
    if (roleFromUrl) {
      setUserType(roleFromUrl);
    }
  }, [roleFromUrl]);

  // Redirect to home if no role selected
  useEffect(() => {
    if (!userType && !roleFromUrl) {
      navigate('/home');
    }
  }, [userType, roleFromUrl, navigate]);

  const handleLogin = () => {
    setError('');
    
    // Kiểm tra đăng nhập cho Nông dân (số điện thoại)
    if (userType === 'farmer') {
      if (phoneNumber === '1') {
        // Lưu redirect vào sessionStorage để sử dụng sau
        if (redirectTo) {
          sessionStorage.setItem('farmer_redirect', redirectTo);
        }
        
        // Điều hướng dựa trên redirect parameter
        switch(redirectTo) {
          case 'forestry':
            navigate('/farmer-forestry');
            break;
          case 'investor':
            navigate('/farmer/investor');
            break;
          case 'consumer':
            navigate('/farmer/consumer');
            break;
          default:
            navigate('/member-hub');
        }
      } else {
        setError('Số điện thoại không đúng. Vui lòng nhập: 1');
      }
      return;
    }
    
    // Kiểm tra đăng nhập cho các vai trò khác (username + password)
    if (username === '1' && password === '1') {
      switch(userType) {
        case 'cooperative':
          navigate('/cooperative/dashboard');
          break;
        case 'research':
          navigate('/research-lab');
          break;
        case 'enterprise':
          navigate('/partner');
          break;
        case 'physician':
          navigate('/physician-portal');
          break;
        case 'admin':
          navigate('/greenlight-command');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng nhập: 1');
    }
  };

  const handleFaceIDLogin = () => {
    // Chỉ Nông dân mới có Face ID login
    if (userType === 'farmer') {
      // Lưu redirect vào sessionStorage để sử dụng sau
      if (redirectTo) {
        sessionStorage.setItem('farmer_redirect', redirectTo);
      }
      
      // Điều hướng dựa trên redirect parameter
      switch(redirectTo) {
        case 'forestry':
          navigate('/farmer-forestry');
          break;
        case 'investor':
          navigate('/farmer/investor');
          break;
        case 'consumer':
          navigate('/farmer/consumer');
          break;
        default:
          navigate('/member-hub');
      }
    }
  };

  // Hàm điều hướng đến trang đăng ký tương ứng
  const handleRegister = () => {
    switch(userType) {
      case 'farmer':
        navigate('/forest-owner-register');
        break;
      case 'cooperative':
        navigate('/cooperative/onboarding');
        break;
      case 'research':
        navigate('/research-partner-register');
        break;
      case 'enterprise':
        navigate('/enterprise-register');
        break;
      case 'physician':
        navigate('/physician-register');
        break;
      default:
        break;
    }
  };

  // Màn hình chọn loại tài khoản - Redirect to Hub
  if (!userType) {
    return null;
  }

  // Login form for Farmer
  if (userType === 'farmer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Portal Switcher - Top Right */}
        <div className="absolute top-4 right-4 z-50">
          <PortalSwitcher />
        </div>
        <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className="ri-user-heart-line text-white text-4xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">VITA PLATFORM</h1>
            <p className="text-gray-600 text-sm mb-2">Đăng nhập Nông dân</p>
            <button
              onClick={() => navigate('/hub')}
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
            >
              ← Quay lại chọn vai trò
            </button>
          </div>
          {/* Demo Info */}
          <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Demo:</strong> Nhập số điện thoại: <strong>1</strong>
            </p>
          </div>

          {/* Phone Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
              <span className="px-3 py-3 bg-gray-50 text-gray-700 font-medium text-sm">+84</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="flex-1 px-4 py-3 outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          {/* Face ID Login Button */}
          <button
            onClick={handleFaceIDLogin}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg mb-3 flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <i className="ri-user-smile-line text-xl"></i>
            <span>Đăng nhập bằng Khuôn mặt</span>
          </button>

          {/* OTP Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <i className="ri-message-2-line text-xl"></i>
            <span>Gửi mã OTP</span>
          </button>

          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Chưa có tài khoản?
            </p>
            <button 
              onClick={handleRegister}
              className="w-full px-6 py-3 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2"
            >
              <i className="ri-user-add-line"></i>
              Đăng ký tài khoản nông dân
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t mt-6">
            <p>
              <i className="ri-information-line mr-1"></i>
              Cần hỗ trợ? Liên hệ: <span className="text-green-600 font-medium">1900-xxxx</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login form for other roles
  const getRoleIcon = () => {
    switch(userType) {
      case 'cooperative': return 'ri-building-2-line';
      case 'research': return 'ri-flask-line';
      case 'enterprise': return 'ri-building-line';
      case 'physician': return 'ri-stethoscope-line';
      case 'admin': return 'ri-shield-star-line';
      default: return 'ri-user-line';
    }
  };

  const getRoleName = () => {
    switch(userType) {
      case 'cooperative': return 'Hợp Tác Xã';
      case 'research': return 'Trung Tâm Khoa Học';
      case 'enterprise': return 'Doanh Nghiệp';
      case 'physician': return 'Thầy Thuốc';
      case 'admin': return 'Quản Trị Viên';
      default: return 'VITA PLATFORM';
    }
  };

  const getRoleGradient = () => {
    switch(userType) {
      case 'cooperative': return 'from-emerald-600 to-teal-600';
      case 'research': return 'from-purple-600 to-indigo-600';
      case 'enterprise': return 'from-blue-600 to-cyan-600';
      case 'physician': return 'from-teal-600 to-cyan-600';
      case 'admin': return 'from-gray-700 to-gray-900';
      default: return 'from-emerald-600 to-teal-600';
    }
  };

  const getBgGradient = () => {
    switch(userType) {
      case 'cooperative': return 'from-emerald-900 via-teal-900 to-cyan-900';
      case 'research': return 'from-purple-900 via-indigo-900 to-blue-900';
      case 'enterprise': return 'from-blue-900 via-cyan-900 to-teal-900';
      case 'physician': return 'from-teal-900 via-cyan-900 to-blue-900';
      case 'admin': return 'from-gray-900 via-slate-900 to-gray-900';
      default: return 'from-emerald-900 via-teal-900 to-cyan-900';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBgGradient()} flex items-center justify-center p-4`}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Portal Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <PortalSwitcher />
      </div>
      
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-gradient-to-br ${getRoleGradient()} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <i className={`${getRoleIcon()} text-white text-4xl`}></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getRoleName()}
          </h1>
          <p className="text-gray-600 text-sm mb-2">Đăng nhập hệ thống</p>
          <button
            onClick={() => navigate('/home')}
            className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
          >
            ← Quay lại chọn vai trò
          </button>
        </div>

        {/* Demo Info */}
        <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Demo:</strong> Tên đăng nhập: <strong>1</strong> | Mật khẩu: <strong>1</strong>
          </p>
        </div>

        {/* Email/Username Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {userType === 'research' ? 'Email công vụ' : 
             userType === 'enterprise' ? 'Email doanh nghiệp' :
             userType === 'physician' ? 'Số chứng chỉ hành nghề' :
             'Tên đăng nhập'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={
              userType === 'research' ? 'example@research.vn' :
              userType === 'enterprise' ? 'example@company.com' :
              userType === 'physician' ? 'Nhập số chứng chỉ' :
              'Nhập tên đăng nhập'
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <i className="ri-error-warning-line mr-2"></i>
            {error}
          </div>
        )}

        {/* 2FA Notice for Research */}
        {userType === 'research' && (
          <div className="mb-5 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <i className="ri-shield-check-line text-purple-600 text-lg mt-0.5"></i>
              <p className="text-xs text-purple-800">
                Hệ thống yêu cầu xác thực 2 bước (2FA) để bảo mật dữ liệu nghiên cứu
              </p>
            </div>
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full bg-gradient-to-r ${getRoleGradient()} text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mb-4`}
        >
          <i className="ri-login-box-line text-xl"></i>
          <span>Đăng nhập</span>
        </button>

        {/* Forgot Password */}
        <button className="w-full text-sm text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
          Quên mật khẩu?
        </button>

        {/* Register Link - Hiển thị cho tất cả vai trò trừ Admin */}
        {userType !== 'admin' && (
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-3">
              {userType === 'cooperative' && 'Hợp tác xã chưa có tài khoản?'}
              {userType === 'research' && 'Trung tâm nghiên cứu chưa có tài khoản?'}
              {userType === 'enterprise' && 'Doanh nghiệp chưa có tài khoản?'}
              {userType === 'physician' && 'Chưa có tài khoản?'}
            </p>
            <button 
              onClick={handleRegister}
              className="w-full px-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <i className="ri-user-add-line"></i>
              {userType === 'cooperative' && 'Đăng ký tài khoản hợp tác xã'}
              {userType === 'research' && 'Đăng ký tài khoản nghiên cứu'}
              {userType === 'enterprise' && 'Đăng ký tài khoản doanh nghiệp'}
              {userType === 'physician' && 'Đăng ký tài khoản thầy thuốc'}
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t mt-6">
          <p>
            <i className="ri-information-line mr-1"></i>
            Cần hỗ trợ? Liên hệ: <span className="text-emerald-600 font-medium">support@vita.vn</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { CooperativeService } from '../../application/CooperativeService';
import type { Cooperative } from '../../domain/Cooperative';

interface CooperativeProfileProps {
  cooperativeId?: string;
}

export default function CooperativeProfile({ cooperativeId }: CooperativeProfileProps) {
  const cooperativeService = new CooperativeService();
  const [cooperative, setCooperative] = useState<Cooperative | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    taxCode: '',
    establishedYear: '',
    memberCount: '',
    totalForestArea: '',
    location: '',
    representative: '',
    representativePosition: '',
    phone: '',
    email: '',
    currentActivities: '',
    interests: [] as string[],
    additionalInfo: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const interestOptions = [
    'Tham gia chuỗi cung ứng VITA',
    'Nhận hỗ trợ kỹ thuật và đào tạo',
    'Mở rộng quy mô sản xuất',
    'Kết nối thị trường tiêu thụ',
    'Nâng cao năng lực quản lý HTX'
  ];

  useEffect(() => {
    const loadCooperative = async () => {
      if (!cooperativeId) {
        // Try to get from session or use demo data
        setIsLoading(false);
        return;
      }

      try {
        const coop = await cooperativeService.getCooperativeById(cooperativeId);
        if (coop) {
          setCooperative(coop);
          setFormData({
            name: coop.name || '',
            taxCode: coop.taxCode || '',
            establishedYear: coop.establishedYear?.toString() || '',
            memberCount: coop.memberCount?.toString() || '',
            totalForestArea: coop.totalForestArea?.toString() || '',
            location: coop.location || '',
            representative: coop.representative || '',
            representativePosition: coop.representativePosition || '',
            phone: coop.phone || '',
            email: coop.email || '',
            currentActivities: coop.currentActivities || '',
            interests: coop.interests || [],
            additionalInfo: coop.additionalInfo || '',
          });
          if (coop.logoUrl) {
            setLogoPreview(coop.logoUrl);
          }
        }
      } catch (err) {
        console.error('Error loading cooperative:', err);
        setError('Không thể tải thông tin HTX');
      } finally {
        setIsLoading(false);
      }
    };

    loadCooperative();
  }, [cooperativeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleCheckboxChange = (value: string) => {
    const newInterests = formData.interests.includes(value)
      ? formData.interests.filter(i => i !== value)
      : [...formData.interests, value];
    
    setFormData({
      ...formData,
      interests: newInterests
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!cooperative?.id) {
      setError('Không tìm thấy thông tin HTX');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Chỉ chấp nhận file ảnh (JPG, PNG, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Kích thước file không được vượt quá 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload logo
    setIsUploadingLogo(true);
    setError(null);
    setSuccess(false);

    try {
      const logoUrl = await cooperativeService.uploadLogo(cooperative.id, file);
      
      // Update cooperative state
      const updated = await cooperativeService.getCooperativeById(cooperative.id);
      if (updated) {
        setCooperative(updated);
        setLogoPreview(logoUrl);
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error uploading logo:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload logo');
      setLogoPreview(cooperative?.logoUrl || null);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSave = async () => {
    if (!cooperative?.id) {
      setError('Không tìm thấy thông tin HTX');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const updateData = {
        name: formData.name,
        taxCode: formData.taxCode || undefined,
        establishedYear: formData.establishedYear ? parseInt(formData.establishedYear) : undefined,
        memberCount: formData.memberCount ? parseInt(formData.memberCount) : undefined,
        totalForestArea: formData.totalForestArea ? parseFloat(formData.totalForestArea) : undefined,
        location: formData.location || undefined,
        representative: formData.representative || undefined,
        representativePosition: formData.representativePosition || undefined,
        phone: formData.phone || undefined,
        email: formData.email,
        currentActivities: formData.currentActivities || undefined,
        interests: formData.interests,
        additionalInfo: formData.additionalInfo || undefined,
      };

      const updated = await cooperativeService.updateCooperative(cooperative.id, updateData);
      setCooperative(updated);
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating cooperative:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <i className="ri-loader-4-line text-4xl text-indigo-600 animate-spin"></i>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Thông tin Hợp tác xã</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <i className="ri-edit-line mr-2"></i>
            Chỉnh sửa
          </button>
        )}
      </div>

      {success && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
          <p className="text-green-700 text-sm">
            <i className="ri-checkbox-circle-line mr-2"></i>
            Cập nhật thông tin thành công!
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Logo Upload */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Logo HTX</h3>
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            {logoPreview || cooperative?.logoUrl ? (
              <img
                src={logoPreview || cooperative?.logoUrl || ''}
                alt="Logo HTX"
                className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <i className="ri-image-line text-4xl text-gray-400"></i>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload logo
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleLogoUpload}
              disabled={isUploadingLogo || !cooperative?.id}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 mt-2">
              Định dạng: JPG, PNG, WEBP. Kích thước tối đa: 5MB
            </p>
            {isUploadingLogo && (
              <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600">
                <i className="ri-loader-4-line animate-spin"></i>
                <span>Đang upload...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin HTX */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin Hợp tác xã</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên Hợp tác xã <span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="VD: HTX Lâm nghiệp ABC"
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.name || formData.name || 'Chưa có'}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Năm thành lập</label>
              {isEditing ? (
                <input
                  type="number"
                  name="establishedYear"
                  min="1990"
                  max={new Date().getFullYear()}
                  value={formData.establishedYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.establishedYear || formData.establishedYear || 'Chưa có'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số thành viên</label>
              {isEditing ? (
                <input
                  type="number"
                  name="memberCount"
                  min="1"
                  value={formData.memberCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.memberCount || formData.memberCount || 'Chưa có'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tổng diện tích (ha)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="totalForestArea"
                  min="1"
                  step="0.1"
                  value={formData.totalForestArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.totalForestArea || formData.totalForestArea || 'Chưa có'}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ trụ sở</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="VD: Xã ABC, Huyện XYZ, Tỉnh..."
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.location || formData.location || 'Chưa có'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin người đại diện */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin người đại diện</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
              {isEditing ? (
                <input
                  type="text"
                  name="representative"
                  value={formData.representative}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.representative || formData.representative || 'Chưa có'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chức vụ</label>
              {isEditing ? (
                <input
                  type="text"
                  name="representativePosition"
                  value={formData.representativePosition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.representativePosition || formData.representativePosition || 'Chưa có'}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.phone || formData.phone || 'Chưa có'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl">{cooperative?.email || formData.email || 'Chưa có'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hoạt động hiện tại */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động sản xuất hiện tại</h3>
        {isEditing ? (
          <textarea
            name="currentActivities"
            value={formData.currentActivities}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="VD: Trồng cây lâm nghiệp, khai thác gỗ..."
          ></textarea>
        ) : (
          <p className="px-4 py-3 bg-gray-50 rounded-xl min-h-[100px]">
            {cooperative?.currentActivities || formData.currentActivities || 'Chưa có thông tin'}
          </p>
        )}
      </div>

      {/* Quan tâm */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">HTX quan tâm đến</h3>
        {isEditing ? (
          <div className="space-y-3">
            {interestOptions.map((option) => (
              <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-5 h-5 text-indigo-600 mt-0.5"
                />
                <span className="text-sm text-gray-700 flex-1">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {(cooperative?.interests || formData.interests).length > 0 ? (
              (cooperative?.interests || formData.interests).map((interest, index) => (
                <div key={index} className="px-4 py-2 bg-indigo-50 rounded-lg text-sm text-gray-700">
                  {interest}
                </div>
              ))
            ) : (
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-500">Chưa có thông tin</p>
            )}
          </div>
        )}
      </div>

      {/* Thông tin bổ sung */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin bổ sung</h3>
        {isEditing ? (
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Chia sẻ thêm về thế mạnh, khó khăn hiện tại, mong muốn hợp tác..."
          ></textarea>
        ) : (
          <p className="px-4 py-3 bg-gray-50 rounded-xl min-h-[100px]">
            {cooperative?.additionalInfo || formData.additionalInfo || 'Chưa có thông tin'}
          </p>
        )}
      </div>

      {/* Action buttons */}
      {isEditing && (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsEditing(false);
              // Reset form data
              if (cooperative) {
                setFormData({
                  name: cooperative.name || '',
                  taxCode: cooperative.taxCode || '',
                  establishedYear: cooperative.establishedYear?.toString() || '',
                  memberCount: cooperative.memberCount?.toString() || '',
                  totalForestArea: cooperative.totalForestArea?.toString() || '',
                  location: cooperative.location || '',
                  representative: cooperative.representative || '',
                  representativePosition: cooperative.representativePosition || '',
                  phone: cooperative.phone || '',
                  email: cooperative.email || '',
                  currentActivities: cooperative.currentActivities || '',
                  interests: cooperative.interests || [],
                  additionalInfo: cooperative.additionalInfo || '',
                });
              }
            }}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      )}
    </div>
  );
}

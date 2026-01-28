import type { HtxBenefitSection } from './htxBenefitsSections';

interface BenefitSectionProps {
  section: HtxBenefitSection;
  isMobile: boolean;
  onContinue?: () => void;
}

export default function BenefitSection({ section, isMobile, onContinue }: BenefitSectionProps) {
  if (isMobile) {
    return (
      <div className="h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${section.mobileImage})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>

        <div className="relative h-full flex flex-col px-6 pt-16 pb-28">
          <div className={`w-12 h-12 flex items-center justify-center ${section.iconBg} rounded-xl mb-4 shadow-lg`}>
            <i className={`${section.icon} text-xl ${section.iconColor}`}></i>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
            {section.title}
          </h2>

          <p className="text-sm text-white/95 mb-5 leading-relaxed drop-shadow-md">
            {section.description}
          </p>

          <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-hide">
            {section.benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0 mt-0.5">
                    <i className={`${benefit.icon} text-white text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-0.5 text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={onContinue}
              className="w-full px-8 py-3.5 bg-white text-teal-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl whitespace-nowrap flex items-center justify-center gap-2 hover:shadow-2xl active:scale-95"
            >
              <span>Tiếp tục</span>
              <i className="ri-arrow-right-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center relative bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${section.iconBg} ${section.iconColor} rounded-full text-sm font-medium mb-6`}>
              <i className={section.icon}></i>
              <span>{section.category}</span>
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {section.title}
            </h2>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {section.description}
            </p>

            <div className="space-y-6">
              {section.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center ${section.iconBg} rounded-xl flex-shrink-0`}>
                    <i className={`${benefit.icon} text-xl ${section.iconColor}`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={section.desktopImage}
                alt={section.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

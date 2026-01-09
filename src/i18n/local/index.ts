const modules = import.meta.glob('./*/*.ts', { eager: true });

const messages: Record<string, { translation: Record<string, string> }> = {};

// Default fallback messages if no translation files exist
const defaultMessages = {
  en: {
    translation: {
      'app.name': 'VITA COOP',
      'app.title': 'Smart Agriculture Platform',
    }
  },
  vi: {
    translation: {
      'app.name': 'VITA COOP',
      'app.title': 'Nền tảng Nông nghiệp Thông minh',
    }
  }
};

Object.keys(modules).forEach((path) => {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (match) {
    const [, lang] = match;
    const module = modules[path] as { default?: Record<string, string> };
    
    if (!messages[lang]) {
      messages[lang] = { translation: {} };
    }
    
    // 合并翻译内容
    if (module.default) {
      messages[lang].translation = {
        ...messages[lang].translation,
        ...module.default
      };
    }
  }
});

// If no messages loaded, use defaults
if (Object.keys(messages).length === 0) {
  Object.assign(messages, defaultMessages);
}

export default messages; 
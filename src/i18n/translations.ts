import en from './en';
import sk from './sk';
import cs from './cs';

export type Locale = 'en' | 'sk' | 'cs';
export type TranslationKey = keyof typeof en;

const translations: Record<Locale, Record<TranslationKey, string>> = { en, sk, cs };

export const locales: Locale[] = ['en', 'sk', 'cs'];

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  sk: 'SK',
  cs: 'CS',
};

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return 'en';
}

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey, params?: Record<string, string>): string {
    let value = translations[locale]?.[key] ?? translations.en[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{${k}}`, v);
      }
    }
    return value;
  };
}

export function getLocalizedPath(locale: Locale, path: string): string {
  const cleanPath = path.replace(/^\/(en|sk|cs)/, '');
  return `/${locale}${cleanPath || '/'}`;
}

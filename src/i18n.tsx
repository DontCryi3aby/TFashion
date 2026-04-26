import i18n from "i18next";
import { initReactI18next } from "react-i18next";

let initLang = localStorage.getItem("TFashion_lang") ?? "en"

const supportedLang = ["vi","en", "de", "fr"]

if(!supportedLang.includes(initLang)){
    initLang = "en"
    localStorage.setItem("TFashion_lang", "en")
}

const LazyImportPlugin = {
    type: 'backend' as const,
    init: function (services: any, backendOptions: any, i18nextOptions: any) {
    },
    read: function (language: any, namespace: any, callback: any) {
        import(/* webpackChunkName: "i18n/[request]" */ `./locales/${language}/${namespace}.json`)
            .then((mod) => {
                // Vite (and many bundlers) wrap JSON in `default`; i18next expects the plain object.
                const data = mod && typeof mod === 'object' && 'default' in mod ? (mod as { default: Record<string, unknown> }).default : mod;
                callback(null, data);
            })
            .catch((err) => {
                callback(err, false);
            });
    },

    save: function (language: any, namespace: any, data: any) {
    },

    create: function (languages: any, namespace: any, key: any, fallbackValue: any) {
        /* save the missing translation */
    },
};

i18n
    .use(LazyImportPlugin)
    .use(initReactI18next)
    .init({
        lng: initLang,
        fallbackLng: 'en',
        defaultNS: 'translation',
        ns: ['translation'],
        interpolation: {
            escapeValue: true,
        },
        saveMissing: true,
        missingKeyHandler: function (lng: any, ns: any, key: any, fallbackValue: any) {
            console.log("missingKeyHandler", key);
        },
        load: 'all',
        nonExplicitSupportedLngs: false,
        react: {
            transSupportBasicHtmlNodes: true
        },
        ignoreJSONStructure: true
    });
// window.i18n = i18n
export default i18n;
export const i18nextTFunction = i18n.t ;
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
    const { i18n } = useTranslation();

    const [open, setOpen] = useState(false);

    const languages = [
        { code: "en", label: "English", flag: "https://flagcdn.com/w20/gb.png" },
        { code: "hi", label: "हिन्दी", flag: "https://flagcdn.com/w20/in.png" },
    ];

    // Initialize with current language from i18n
    const [language, setLanguage] = useState(() => 
        languages.find(lang => lang.code === i18n.language) || languages[0]
    );

    // Sync with i18next language changes
    useEffect(() => {
        const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];
        setLanguage(currentLang);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleSelect = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang.code);
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown button */}
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center gap-1 w-full rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none"
            >
                <img src={language.flag} alt={language.label} className="h-4" />
                <span>{language.code.toUpperCase()}</span>
                <svg
                    className="h-4 w-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute mt-2 w-32 bg-white shadow-lg border rounded-md z-10">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => handleSelect(lang)}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <img src={lang.flag} alt={lang.label} className="h-4" />
                            <span className="text-sm">{lang.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;
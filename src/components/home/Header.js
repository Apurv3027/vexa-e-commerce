import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../img/logo.svg";
import { BsBag, BsPerson, BsGlobe, BsChevronDown } from "react-icons/bs";

const Header = () => {
    // header state
    const [isActive, setIsActive] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    const { itemAmount } = useContext(CartContext);
    const { i18n } = useTranslation();

    // event listener
    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
        });
    });

    // Close language dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.language-dropdown')) {
                setIsLanguageOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLanguageOpen(false);
    };

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <header
            className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
                } fixed w-full z-10 lg:px-8 transition-all`}
        >
            <div className="container mx-auto flex items-center justify-between h-full">
                <Link to={"/"}>
                    <div className="w-[40px]">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>

                <div className="flex items-center gap-6">
                    {/* Language Dropdown */}
                    <div className="language-dropdown relative">
                        <button
                            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <BsGlobe className="text-xl" />
                            <span className="text-sm font-medium">{currentLanguage.nativeName}</span>
                            <BsChevronDown className={`text-xs transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isLanguageOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                {languages.map((language) => (
                                    <button
                                        key={language.code}
                                        onClick={() => changeLanguage(language.code)}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center justify-between ${currentLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : ''
                                            }`}
                                    >
                                        <span>{language.nativeName}</span>
                                        <span className="text-xs text-gray-500">{language.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* login */}
                    <Link
                        to={"/login"}
                        className="cursor-pointer flex relative"
                    >
                        <BsPerson className="text-2xl" />
                    </Link>

                    {/* cart */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer flex relative"
                    >
                        <BsBag className="text-2xl" />
                        <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                            {itemAmount}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
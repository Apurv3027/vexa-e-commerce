import React from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

const Hero = () => {

    const { t } = useTranslation();

    return (
        <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
            <div className="container mx-auto flex justify-around h-full">
                {/* text */}
                <div className="flex flex-col justify-center">
                    <div className="font-semibold flex items-center uppercase">
                        <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>{t("hero.hotTrend")}
                    </div>
                    <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">{t("hero.freshFashionFinds")}<br />
                        <span className="font-light">{t("hero.newCollection")}</span></h1>
                    <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary'>{t("common.discoverMore")}</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
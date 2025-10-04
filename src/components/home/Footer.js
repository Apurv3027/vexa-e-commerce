import { useTranslation } from "react-i18next";

const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer className="bg-primary py-12">
            <div className="container mx-auto">
                <p className="text-white text-center">
                    {t('common.copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
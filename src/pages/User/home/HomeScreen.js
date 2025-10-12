import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import Product from '../../../components/home/Product'
import Hero from '../../../components/home/Hero'
import Category from "../../../components/home/Category";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {

  const { t } = useTranslation();

  // get products from product context
  const { products } = useContext(ProductContext);

  console.log(products);

  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">{t('categories.title')}</h1>
          <Category />
          <h1 className="text-3xl font-semibold mb-10 text-center">{t('products.exploreOurProducts')}</h1>
          <Product />
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
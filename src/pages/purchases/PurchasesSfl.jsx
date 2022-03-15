import React, { useEffect, useState, useRef } from 'react';
import instance from '../../axios/instance';
import CategoryNestService from '../../core/services/CategoryNestService';
import PurchasesStl from './PurchasesStl';

const PurchasesSfl = () => {
  const refCategory = useRef(0);
  const refOrder = useRef(0);
  const [products, setProducts] = useState({
    loading: true,
    data: undefined,
    dataOriginal: undefined,
    categories: undefined,
  });

  const handleChangeCategory = (event) => {
    setProducts({ loading: true });
    const productsFilter = event.target.value ===  '0' ? products.dataOriginal : products.dataOriginal.filter(product => product.categoryId === event.target.value);
    setProducts({ loading: false, data: productsFilter, dataOriginal: products.dataOriginal, categories: products.categories });
  };

  const handleChangeOrder = (event) => {
    setProducts({ loading: true });
    let productsOrder = [];
    let productsOriginalOrder = [];
    switch(event.target.value) {
      case '0':
        productsOrder = products.data.sort((a, b) => a.salePrice - b.salePrice);
        productsOriginalOrder = products.dataOriginal.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case '1':
        productsOrder = products.data.sort((a, b) => b.salePrice - a.salePrice);
        productsOriginalOrder = products.dataOriginal.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case '2':
        productsOrder = products.data.sort((a, b) => a.stock - b.stock);
        productsOriginalOrder = products.dataOriginal.sort((a, b) => a.stock - b.stock);
        break;
      default:
        // code block
    }
    setProducts({ loading: false, data: productsOrder, dataOriginal: productsOriginalOrder, categories: products.categories });
  };

  const getProducts = async () => {
    try {
      setProducts({ loading: true });
      const categories = await CategoryNestService.getAll();
      const products = await instance.get('/gtw-prd/products/getAll');
      const productsOrder = products.data.sort((a, b) => a.salePrice - b.salePrice);
      setProducts({ loading: false, data: productsOrder, dataOriginal: products.data, categories: categories.data });
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <PurchasesStl products={products} 
                       refCategory={refCategory} 
                       refOrder={refOrder} 
                       handleChangeCategory={handleChangeCategory}
                       handleChangeOrder={handleChangeOrder} />;
};

export default PurchasesSfl;

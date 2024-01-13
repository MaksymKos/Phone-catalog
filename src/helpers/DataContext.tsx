import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { ContextType } from '../types/ContextType';
import { DropdownIterface, Option } from '../types/sortENUM';
import { SortProducts } from './sortFunctions';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { findAll } from './services(ROWY)/detData.mjs';
import { getDetails } from './api';

export const DataContext = React.createContext<ContextType>({
  products: null,
  setProducts: () => { },
  setCurrentOption: () => '',
  sortDropdown: {
    name: '',
    options: {},
    isOpen: false,
  },
  perPageDropdown: {
    name: '',
    options: {},
    isOpen: false,
  },
  sort: '',
  perPage: '16',
  productDetails: null,
  setProductsDetails: () => { },
  pageURL: null,
  query: '',
  isLoading: false,
});

export const useData = (): ContextType => React.useContext(DataContext);

type Props = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [productDetails, setProductsDetails] = useState<ProductDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const query = searchParams.get('query') || '';
  const pageURL = pathname;

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    // const timer = setTimeout(() => {
    const fetchData = async () => {
      const res = await findAll();

      setProducts(SortProducts([...res], sort, query));
    };
      fetchData()
    // }, 400);
    // return () => {
    //   clearTimeout(timer)
    // };


  }, [sort, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pageURL.includes('/phones/')) {
        const phoneId = pageURL.split('/').slice(-1).join('');
        setIsLoading(true);

        getDetails(phoneId)
          .then((data) => setProductsDetails(data))
          .finally(() => setIsLoading(false));
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [pageURL]);

  function setCurrentOption(options: Option, currentValue: string): string {
    const foundKey = Object.keys(options).find(
      key => options[key] === currentValue,
    );

    return foundKey || 'All';
  }

  const sortDropdown: DropdownIterface = {
    name: 'sort',
    options: {
      Year: 'age',
      Name: 'name',
      Price: 'price',
    },
    isOpen: false,
  };

  const perPageDropdown: DropdownIterface = {
    name: 'perPage',
    options: {
      16: '16',
      8: '8',
      4: '4',
      All: 'All',
    },
    isOpen: false,
  };

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        setCurrentOption,
        sortDropdown,
        perPageDropdown,
        sort,
        perPage,
        productDetails,
        setProductsDetails,
        pageURL,
        query,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

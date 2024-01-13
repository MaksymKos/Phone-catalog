import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import { DropDown } from '../../components/DropDown';
import { Pagination } from '../../components/Pagination';
import { ProductList } from '../../components/ProductList';
import { PublicPath } from '../../components/PublicPath';
import { useData } from '../../helpers/DataContext';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const {
    products,
    sortDropdown,
    perPageDropdown,
    sort,
    isLoading,
  } = useData();
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [searchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);

  useEffect(() => {
    const perPage = searchParams.get('perPage') || '16';

    if (perPage !== 'all') {
      setProductsPerPage(+perPage);
    }

    if (products && perPage === 'all') {
      setProductsPerPage(products.length);
    }
  }, [products, searchParams]);

  if (!products || isLoading) {
    return (<Oval
      visible={true}
      height="80"
      width="80"
      color="#000"
      secondaryColor=""
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass="loader-spinner"
    />);
  }

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const nPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="phones-page">

      <PublicPath linkName="phones" />

      <div className="phones-page__header">
        <h1 className="text--h1">Mobile phones</h1>
        <span className="text text--small text--gray">{`${products?.length} models`}</span>
      </div>

      <div className="phones-page__dropdowns">
        <DropDown
          dropdown={sortDropdown}
          queryKey={sortDropdown.name}
          currentValue={sort}
          title="Sort by"
        />

        <DropDown
          dropdown={perPageDropdown}
          queryKey={perPageDropdown.name}
          currentValue={productsPerPage > 16 ? 'All' : productsPerPage.toString()}
          title="Items on page"
        />
      </div>

      <div className="phones-page__content">
        <ProductList
          currentProducts={(productsPerPage < 17) ? currentProducts : products}
        />
      </div>

      {currentProducts.length > 1 && productsPerPage < 17
        ? (
          <div className="phone-page__pagination">
            <Pagination
              pages={nPages}
            />
          </div>
        )
        : (
          <span className="text">There are no results on your request</span>
        )}
    </div>
  );
};

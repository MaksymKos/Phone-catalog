import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useData } from '../../helpers/DataContext';
import { ProductSlider } from '../../components/ProductSlider';

import './ProductDetailsPage.scss';
import { ColorPallette } from '../../types/CoroPallette';
import { BackButton } from '../../components/BackButton';
import { useProductStore } from '../../helpers/store';
import { Oval } from 'react-loader-spinner'

export const ProductDetailsPage = () => {
  const { isLoading, productDetails, products } = useData();

  const favProductsId = useProductStore((state) => state.favProductsId);
  const addFavProduct = useProductStore((state) => state.addFavProductId);
  const deleteFavProduct = useProductStore((state) => state.deleteFavProductId);
  const isProductFav = favProductsId.find(p => p === productDetails?.id);
  const handleFavButtonClick = () => {
    if (isProductFav && productDetails) {
      deleteFavProduct(productDetails.id);
    } else if (productDetails) {
      addFavProduct(productDetails.id);
    }
  };

  const cartProducts = useProductStore((state) => state.cartProducts);
  const addCartProduct = useProductStore((state) => state.addCartProductId);
  const deleteCartProduct = useProductStore((state) => state.deleteCartProductId);
  const isProductAddedToCart = cartProducts.find(p => p.name === productDetails?.id);
  const handleCartButtonClick = () => {
    if (isProductAddedToCart && productDetails) {
      deleteCartProduct(productDetails.id);
    } else if (productDetails) {
      addCartProduct(productDetails.id);
    }
  };

  const { pathname, state } = useLocation();
  const path = pathname.split('-');
  const capi = path[path.length - 2];
  const colo = path[path.length - 1];
  const [imgIndex, setImgIndex] = useState(0);
  const filteredSuggestedProducts = products?.filter(p => p.capacity === productDetails?.capacity).slice(0, 8);

  if (isLoading || !productDetails) {
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

  const {
    id,
    name,
    images,
    namespaceId,
    color,
    colorsAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    capacityAvailable,
    description,
    capacity,
    camera,
    zoom,
    cell,
  } = productDetails;
  const link = `/phones/${namespaceId}`;

  return (
    <div className="details">
      <div className="details__bread-crumbs">
        <Link to="/">
          <span className="icon icon--home" />
        </Link>

        <span className="icon icon--arrow icon--next" />

        <Link
          to={{
            pathname: '..',
            search: state?.search,
          }}
          className="text text--small text--gray"
        >
          phones
        </Link>

        <span className="icon icon--arrow icon--next" />

        <span className="text text--small text--gray">{name.toLocaleLowerCase()}</span>
      </div>

      <BackButton />

      <h1 className="text--h1 details__header">{`${name} (iMT9G2FS/A)`}</h1>
      <div className="details__main-block">
        <div className="images-block">
          <ul className="images-block__list">
            {images.map((img, index) => (
              <button
                type="button"
                key={img}
                className={classNames('details__image-container', {
                  'details__image-container--selected': imgIndex === index,
                })}
                onClick={() => setImgIndex(index)}
              >
                <img
                  className="details__image"
                  src={`img/phones/${namespaceId}/${color}/0${index}.jpg`}
                  alt={id}
                />
              </button>
            ))}
          </ul>

          <div className="details__image--selected-container">
            <img
              className="details__image--selected"
              src={`img/phones/${namespaceId}/${color}/0${imgIndex}.jpg`}
              alt={id}
            />
          </div>
        </div>
        <div className="options-block">
          <div className="options-block__colors">
            <div className="options-block__colors__title">
              <span className="text text--small text--gray">Available colors</span>
              <span className="text text--gray">{`ID: ${Math.floor(100000 + Math.random() * 900000)}`}</span>
            </div>
            <div className="options-block__colors-block">
              {colorsAvailable.map(c => {
                return (
                  <button
                    type="button"
                    key={c}
                    className={classNames(
                      'options-block__colors__color',
                      {
                        'options-block__colors__color--isActive': c === colo,
                      },
                    )}
                    style={{
                      backgroundColor: ColorPallette[c],
                    }}
                  >
                    <Link
                      to={`${link}-${capi}-${c}`}
                      className="options-block__colors__colorInside"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="options-block__capacity">
            <span className="text text--small text--gray">Select capacity</span>
            <div className="options-block__capacity__items">
              {capacityAvailable.map(c => {
                c = c.toLowerCase();

                return (
                  <Link
                    key={c}
                    to={`${link}-${c}-${colo}`}
                  >
                    <button
                      type="button"
                      id={c}
                      className={classNames('options-block__capacity-input', {
                        'options-block__capacity-input--selected': c === capi,
                      })}
                    >
                      {c}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="options-block__price">
            <span className="options-block__price-regular">{`$${priceRegular}`}</span>
            <span className="options-block__price-discount">{`$${priceDiscount}`}</span>
          </div>
          <div className="options-block__buttons">
            <button
              className={
                classNames('button__cart options-block__buttons__cart', {
                  'button__cart-selected': isProductAddedToCart,
                })
              }
              type="button"
              onClick={handleCartButtonClick}
            />
            <button
              className={
                classNames('button__fav options-block__buttons__fav', {
                  'button__fav-selected': isProductFav,
                })
              }
              type="button"
              onClick={handleFavButtonClick}
            />
          </div>
          <div className="options-block__details">
            <p className="options-block__details__item">
              <span className="text text--small text--gray">Screen</span>
              <span>{screen}</span>
            </p>
            <p className="options-block__details__item">
              <span className="text text--small text--gray">Resolution</span>
              <span>{resolution}</span>
            </p>
            <p className="options-block__details__item">
              <span className="text text--small text--gray">Processor</span>
              <span>{processor}</span>
            </p>
            <p className="options-block__details__item">
              <span className="text text--small text--gray">RAM</span>
              <span>{ram}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="descrition-block">
        <div className="descrition-block__about">
          <h2 className="text text--h2 descrition-block__header">About</h2>
          {description.map(d => (
            <p key={d.title} className="descrition-block__about__item">
              <span className="text text--h3 descrition-block__about__item__header">{d.title}</span>
              <span className="text text--gray">{d.text}</span>
            </p>
          ))}
        </div>
        <div className="descrition-block__tech-specs">
          <h2 className="text text--h2 descrition-block__header">Tech specs</h2>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Screen</span>
            <span>{screen}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Resolution</span>
            <span>{resolution}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Processor</span>
            <span>{processor}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">RAM</span>
            <span>{ram}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Capacity</span>
            <span>{capacity}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Camera</span>
            <span>{camera}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Zoom</span>
            <span>{zoom}</span>
          </p>
          <p className="descrition-block__tech-specs__item">
            <span className="text text--small text--gray">Cell</span>
            <span>{cell.join(', ')}</span>
          </p>
        </div>
      </div>
      <div className="suggested-products">
        {filteredSuggestedProducts
          && <ProductSlider filteredSuggestedProducts={filteredSuggestedProducts} title="You may also like" />}
      </div>
    </div>
  );
};

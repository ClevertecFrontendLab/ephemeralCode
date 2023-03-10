/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { StarRating } from '../../components/product-general/star-rating/star-rating';
import { ProductPageBreadcrumbs } from '../../components/product-page/product-page-breadcrumbs/product-page-breadcrumbs';
import { ProductPageDetailedInfo } from '../../components/product-page/product-page-detailed-info/product-page-detailed-info';
import { ProductPageInfoTitle } from '../../components/product-page/product-page-info-title/product-page-info-title';
import { ProductPagePreview } from '../../components/product-page/product-page-preview/product-page-preview';
import { ProductPageReview } from '../../components/product-page/product-page-review/product-page-review';
import {
  categoryProductsAction,
  getSelectedProduct,
  selectCategories,
  selectProduct,
} from '../../store/slices/loader-slice';

import './product-page.css';

export const ProductPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const product = useSelector(selectProduct);

  const { id, type } = useParams();

  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isCategory, setIsCategory] = useState(null);

  const token = localStorage.getItem('authorization');

  useEffect(() => {
    if (!categories.length && token) {
      dispatch(categoryProductsAction());
    }
  }, [dispatch]);

  useEffect(() => {
    if (product?.id !== Number(id) && token) {
      dispatch(getSelectedProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (categories.length) {
      setIsCategory(categories.find((item) => item.path === type)?.id);
    }
  }, [categories]);

  return (
    <section className="product-page">
      <ProductPageBreadcrumbs path={type} category={categories[isCategory]?.name} title={product?.title} />

      <main className="container-page-product">
        {!!Object.keys(product).length && (
          <div className="wrapper-page-product">
            <div className="container-page-product-preview">
              <ProductPagePreview product={product} />
            </div>

            <div className="container-page-product-further-info">
              <div className="container-page-product-rating">
                <ProductPageInfoTitle title="??????????????" />

                <div className="container-page-product-star-rating">
                  <StarRating amount={product?.rating} showRatingNumber={true} />
                </div>
              </div>

              <div className="container-page-product-detailed-info">
                <ProductPageInfoTitle title="?????????????????? ????????????????????" />

                <ProductPageDetailedInfo product={product} />
              </div>

              <ProductPageReview isOpenReview={isOpenReview} onToggleReview={() => setIsOpenReview(!isOpenReview)} />
            </div>

            <button className="page-product-btn-add-review-user primary" type="button" data-test-id="button-rating">
              ?????????????? ??????????
            </button>
          </div>
        )}
      </main>
    </section>
  );
};

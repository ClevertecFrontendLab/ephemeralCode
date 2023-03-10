import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectLoadingCategories, selectLoadingProducts, selectToastMessage } from '../../../store/slices/loader-slice';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import { Loader } from '../../loader/loader';
import { ToastMessage } from '../../toast-message/toast-message';

import './layout.css';

export const Layout = () => {
  const loadingCategoies = useSelector(selectLoadingCategories);
  const loadingProducts = useSelector(selectLoadingProducts);
  const readyToastMessage = useSelector(selectToastMessage);

  const loading = loadingCategoies || loadingProducts;

  return (
    <div className="container">
      {loading && <Loader />}
      {readyToastMessage && <ToastMessage />}

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

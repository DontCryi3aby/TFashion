import { ChangeEvent, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import productApi from 'src/api/product-api';
import { CONFIG } from 'src/config-global';
import { Product } from 'src/models/product';

import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  const [isLoadingListProduct, setIsLoadingListProduct] = useState(true);
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
      (async () => {
          const { data, meta } = await productApi.getAll({ per_page: 10, page: currentPage });
          console.log("data: ", data);
          setProductList(data);
          setTotalPage(meta.last_page);
          setIsLoadingListProduct(false);
      })();
  }, [currentPage]);

  const handleChangePage = (event: ChangeEvent<any>, page: number) => {
      setCurrentPage(page);
  };

  
  return (
    <>
      <title>{`Products - ${CONFIG.appName}`}</title>

      <ProductsView />
      <Outlet />
    </>
  );
}

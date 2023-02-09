import { addMonths } from 'date-fns';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ClosedProducts } from './components/ClosedProducts';
import { HomePage } from './components/HomePage';
import { OpenedProducts } from './components/OpenedProducts';
import { ReplaceSoonProducts } from './components/ReplaceSoonProducts';
import { useLocalStorage } from './utils/localStorage';

export interface IProduct {
  openedDate: string;
  name: string;
  months?: string;
  expiryDate?: string;
}

function App() {
  const [openedProducts, setOpenedProducts] = useLocalStorage(
    'skincare_tracker_open_products',
    []
  );
  const [unopenedProducts, setUnopenedProducts] = useLocalStorage(
    'skincare_tracker_unopened_products',
    []
  );
  const [replaceSoonProducts, setReplaceSoonProducts] = useLocalStorage(
    'skincare_tracker_repl-soon-products',
    []
  );
  const [months, setMonths] = useState<string>('');

  const [openedDate, setOpenedDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  const handleDelete = (delProduct: IProduct) => {
    const updatedOpen = openedProducts.filter(
      (product: IProduct) => product !== delProduct
    );
    const updatedUnopen = unopenedProducts.filter(
      (product: IProduct) => product !== delProduct
    );
    const updatedRplSoon = replaceSoonProducts.filter(
      (product: IProduct) => product !== delProduct
    );
    setOpenedProducts(updatedOpen);
    setUnopenedProducts(updatedUnopen);
    setReplaceSoonProducts(updatedRplSoon);
  };

  const submit = (product: IProduct) => {
    const newProduct = {
      months: months,
      openedDate: openedDate,
      name: product.name,
    };
    // if the expiry date is sooner than the amount of months it can remain opened, give warning that it can't remain opened for as long
    const newExpiryDate = addMonths(new Date(product.openedDate), parseInt(months))
    const expiryDateObj = new Date(product.expiryDate!)
    if (expiryDateObj >= newExpiryDate) {
      setOpenedDate(new Date().toISOString().substring(0, 10));
      setOpenedProducts([...openedProducts, newProduct]);
      const filteredUnopened = unopenedProducts.filter(
        (unProduct: IProduct) => product !== unProduct
        );
        const filteredReplaceSoon = replaceSoonProducts.filter(
          (unProduct: IProduct) => product !== unProduct
          );
          setReplaceSoonProducts(filteredReplaceSoon)
          setUnopenedProducts(filteredUnopened);
          setMonths('');
    }else {
      const newProduct = {
        expiryDate: product.expiryDate,
        openedDate: openedDate,
        name: product.name,
      };
      alert("The product needs to remain opened less than that amount of months because the expiry date is sooner! The product will be opened but will keep the same expiry date")
      setOpenedDate(new Date().toISOString().substring(0, 10));
      setOpenedProducts([...openedProducts, newProduct]);
      const filteredUnopened = unopenedProducts.filter(
        (unProduct: IProduct) => product !== unProduct
        );
        const filteredReplaceSoon = replaceSoonProducts.filter(
          (unProduct: IProduct) => product !== unProduct
          );
          setReplaceSoonProducts(filteredReplaceSoon)
          setUnopenedProducts(filteredUnopened);
          setMonths('');
    }
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              unopenedProducts={unopenedProducts}
              months={months}
              openedDate={openedDate}
              openedProducts={openedProducts}
              setMonths={setMonths}
              setOpenedDate={setOpenedDate}
              setOpenedProducts={setOpenedProducts}
              setReplaceSoonProducts={setReplaceSoonProducts}
              setUnopenedProducts={setUnopenedProducts}
            />
          }
        />
        <Route
          path="opened-products"
          element={
            <OpenedProducts
              handleDelete={handleDelete}
              months={months}
              openedProducts={openedProducts}
              setMonths={setMonths}
              submit={submit}
            />
          }
        />
        <Route
          path="closed-products"
          element={
            <ClosedProducts
              handleDelete={handleDelete}
              months={months}
              setMonths={setMonths}
              submit={submit}
              unopenedProducts={unopenedProducts}
            />
          }
        />
        <Route
          path="replace-soon-products"
          element={
            <ReplaceSoonProducts
              handleDelete={handleDelete}
              replaceSoonProducts={replaceSoonProducts}
              setMonths={setMonths}
              submit={submit}
              months={months}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { addMonths, differenceInMonths } from 'date-fns';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ClosedProducts } from './components/ClosedProducts';
import { HomePage } from './components/HomePage';
import { OpenedProducts } from './components/OpenedProducts';
import { ReplaceSoonProducts } from './components/ReplaceSoonProducts';
import { useLocalStorage } from './utils/localStorage';
import { calculateTimeLeftOpenedProducts } from './utils/timeLeftOpened';

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
  const [closedProducts, setClosedProducts] = useLocalStorage(
    'skincare_tracker_closed_products',
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
    const updatedUnopen = closedProducts.filter(
      (product: IProduct) => product !== delProduct
    );
    const updatedRplSoon = replaceSoonProducts.filter(
      (product: IProduct) => product !== delProduct
    );
    setOpenedProducts(updatedOpen);
    setClosedProducts(updatedUnopen);
    setReplaceSoonProducts(updatedRplSoon);
  };

  const submit = (product: IProduct) => {
    const newProduct = {
      months: months,
      openedDate: openedDate,
      name: product.name,
    };
    const newExpiryDate = addMonths(
      new Date(product.openedDate),
      parseInt(months)
    );
    const expiryDateObj = new Date(product.expiryDate!);
    if (expiryDateObj >= newExpiryDate) {
      const filteredClosedProducts = closedProducts.filter(
        (unProduct: IProduct) => product !== unProduct
      );
      const filteredReplaceSoonProducts = replaceSoonProducts.filter(
        (unProduct: IProduct) => product !== unProduct
      );
      setReplaceSoonProducts(filteredReplaceSoonProducts);
      setClosedProducts(filteredClosedProducts);
      setOpenedDate(new Date().toISOString().substring(0, 10));
      setOpenedProducts([...openedProducts, newProduct]);
      setMonths('');
    } else {
      alert(
        'The product needs to remain opened less than that amount of months because the expiry date is sooner! The product will be opened but will keep the same expiry date'
      );
      const months = differenceInMonths(
        new Date(product.expiryDate!),
        new Date()
      ).toString();
      const newProduct = {
        months: calculateTimeLeftOpenedProducts(openedDate, months),
        openedDate: openedDate,
        name: product.name,
      };
      const filteredClosedProducts = closedProducts.filter(
        (unProduct: IProduct) => product !== unProduct
      );
      const filteredReplaceSoon = replaceSoonProducts.filter(
        (unProduct: IProduct) => product !== unProduct
      );
      setOpenedDate(new Date().toISOString().substring(0, 10));
      setOpenedProducts([...openedProducts, newProduct]);
      setReplaceSoonProducts(filteredReplaceSoon);
      setClosedProducts(filteredClosedProducts);
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
              closedProducts={closedProducts}
              months={months}
              openedDate={openedDate}
              openedProducts={openedProducts}
              setMonths={setMonths}
              setOpenedDate={setOpenedDate}
              setOpenedProducts={setOpenedProducts}
              setReplaceSoonProducts={setReplaceSoonProducts}
              setClosedProducts={setClosedProducts}
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
              closedProducts={closedProducts}
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

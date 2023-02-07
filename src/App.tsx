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
    setOpenedDate(new Date().toISOString().substring(0, 10));
    setOpenedProducts([...openedProducts, newProduct]);
    const filteredUnopened = unopenedProducts.filter(
      (unProduct: IProduct) => product !== unProduct
    );
    setUnopenedProducts(filteredUnopened);
  };
  const [openedDate, setOpenedDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  return (
      <BrowserRouter>
  
        <Routes>
          <Route path="/"element={<HomePage unopenedProducts={unopenedProducts}months={months} openedDate={openedDate} openedProducts={openedProducts} setMonths={setMonths} setOpenedDate={setOpenedDate} setOpenedProducts={setOpenedProducts} setReplaceSoonProducts={setReplaceSoonProducts} setUnopenedProducts={setUnopenedProducts}/>}/>
          <Route path="opened-products" element={<OpenedProducts handleDelete={handleDelete} months={months} openedProducts={openedProducts} setMonths={setMonths} submit={submit}/>}/>
          <Route path="closed-products" element={<ClosedProducts handleDelete={handleDelete} months={months} setMonths={setMonths} submit={submit} unopenedProducts={unopenedProducts}/>}/>
          <Route path="replace-soon-products" element={<ReplaceSoonProducts handleDelete={handleDelete} replaceSoonProducts={replaceSoonProducts}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

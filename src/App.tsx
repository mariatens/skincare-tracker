import React, { useEffect, useState } from 'react';
import { useLocalStorage } from './utils/localStorage';
import './App.css';
import { InputBar } from './components/InputBar';
import { Product } from './components/Product';
import { differenceInMonths } from 'date-fns';
import { RplProduct } from './components/RplProduct';

export interface IProduct {
  openedDate: string;
  name: string;
  months?: string | undefined;
  expiryDate?: string | undefined;
}

function App() {
  const [opened, setOpened] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [closed, setClosed] = useState<boolean>(false);
  const [months, setMonths] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [openedDate, setOpenedDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [openedProducts, setOpenedProducts] = useLocalStorage(
    'op-products',
    []
  );
  const [unopenedProducts, setUnopenedProducts] = useLocalStorage(
    'unop-products',
    []
  );
  const [replaceSoonProducts, setReplaceSoonProducts] = useLocalStorage(
    'repl-s-products',
    []
  );
  const handleEnter = () => {
    const product: IProduct = {
      name: input,
      openedDate: openedDate,
      months: months,
      expiryDate: expiryDate,
    };
    if (months) {
      setOpenedProducts([...openedProducts, product]);
    }
    if (expiryDate) {
      setUnopenedProducts([...unopenedProducts, product]);
    }
    setInput('');
    setOpened(false);
    setClosed(false);
    setOpenedDate(new Date().toISOString().substring(0, 10));
    setMonths('');
    setExpiryDate('');
  };

  
  const submit = (product: IProduct) => {
    product = {
      months: months,
      openedDate: openedDate,
      name: product.name,
    };
    setOpenedDate(new Date().toISOString().substring(0, 10));
    setOpenedProducts([...openedProducts, product]); //?how does it know what is product
     //TODO: this filter is not working
    const filteredUnopened = unopenedProducts.filter(
      (unProduct: IProduct) => product === unProduct
    );
    setUnopenedProducts(filteredUnopened);
   
  };

  const replaceSoon = () => {
    const replaceSoonOpened = openedProducts.filter(
      (product: IProduct) => product.months && parseInt(product.months) < 1
    );
    const replaceSoonClosed = unopenedProducts.filter(
      (product: IProduct) =>
        product.expiryDate &&
        differenceInMonths(new Date(product.expiryDate), new Date()) < 1
    );
    const replaceSoonAll = replaceSoonClosed.concat(replaceSoonOpened);
    setReplaceSoonProducts(replaceSoonAll);
    //do i need to do a useffect so that every time it rerenders it shows the updated list, maybe everytime the months or current date changes?
  };
  useEffect(() => {
    replaceSoon();
  }, []); //TODO: look into it. [openedProducts, unopenedProducts] and empty [] gave error saying missing dependency

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
  const handleOpened = (e: any) => {
    setOpened(e.target.checked);
    setClosed(false);
    if (e.target.checked) {
      setClosed(false);
    }
  }
  const handleClosed = (e: any) => {
    setOpened(false);
    setClosed(e.target.checked);
    if (e.target.checked) {
      setOpened(false);
    }
  }

  return (
    <>
      <h1>Skincare Expiry Manager App</h1>
      <InputBar
        handleMonths={(e) => setMonths(e.target.value)}
        months={months}
        input={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        handleOpened={handleOpened}
        handleClosed={handleClosed}
        opened={opened}
        closed={closed}
        handleEnter={handleEnter}
        handleExpiryDate={(e) => setExpiryDate(e.target.value)}
        handleOpenedDate={(e) => setOpenedDate(e.target.value)}
        openedDate={openedDate}
        expiryDate={expiryDate}
      />
      <h1>Replace soon!</h1>
      <div className="container">
        {replaceSoonProducts.map((product: IProduct, i: number) => (
          <RplProduct key = {i} product={product} handleDelete={handleDelete} />
        ))}
      </div>
      <h1>Opened products</h1>
      <div className="container">
        {openedProducts.map((product: IProduct, i: number) => (
          <div className="cell">
            <Product
              key={i}
              product={product}
              handleDelete={() => handleDelete(product)}
              handleSubmit={() => submit(product)}
              handleMonths={(e) => setMonths(e.target.value)}
              months={months}
            />
          </div>
        ))}
      </div>
      <h1>Unopened products</h1>
      <div className="container">
        {unopenedProducts.map((product: IProduct, i: number) => (
          <div className="cell">
            <Product
              key={i}
              product={product}
              handleDelete={() => handleDelete(product)}
              handleSubmit={() => submit(product)}
              handleMonths={(e) => setMonths(e.target.value)}
              months={months}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

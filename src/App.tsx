import React, { useState } from "react";
import { useLocalStorage } from "./utils/localStorage";
import "./App.css";
import { InputBar } from "./components/InputBar";
import { Product } from "./components/Product";

export interface IProduct {
  openedDate: string;
  name: string;
  months?: string | undefined;
  expiryDate?: string | undefined;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);
  const [months, setMonths] = useState<string>("24M");
  const [expiryDate, setExpiryDate] = useState<string>();
  const [openedDate, setOpenedDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [openedProducts, setOpenedProducts] = useState<IProduct[]>([]);
  const [unopenedProducts, setUnopenedProducts] = useState<IProduct[]>([]);

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
    setInput("");
    setOpened(false);
    setClosed(false);
    setOpenedDate(new Date().toISOString().substring(0, 10));
    setMonths("24M");
    setExpiryDate("");
  };

  return (
    <>
      <h1>Skincare Expiry Manager App</h1>
      <h3>Write the product and its expiry date or when you opened it</h3>
      <InputBar
        handleMonths={(e) => setMonths(e.target.value)}
        months={months}
        input={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        handleOpened={(e) => {
          setOpened(e.target.checked);
          setClosed(false);
          if (e.target.checked) {
            setClosed(false);
          }
        }}
        handleClosed={(e) => {
          setOpened(false);
          setClosed(e.target.checked);
          if (e.target.checked) {
            setOpened(false);
          }
        }}
        opened={opened}
        closed={closed}
        handleEnter={handleEnter}
        handleExpiryDate={(e) => setExpiryDate(e.target.value)}
        handleOpenedDate={(e) => setOpenedDate(e.target.value)}
        openedDate={openedDate}
        expiryDate={expiryDate}
      />
      <h1>Opened products</h1>
      <div className="container">
        {openedProducts.map((product: IProduct, i: number) => (
          <div className="cell">
            <Product key={i} product={product} />
          </div>
        ))}
      </div>
      <h1>Unopened products</h1>
      <div className="container">
        {unopenedProducts.map((product: IProduct, i: number) => (
          <div className="cell">
            <Product key={i} product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

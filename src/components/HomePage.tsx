import { differenceInMonths } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../App';
import { InputBar } from './InputBar';
import { NavBar } from './NavBar';

interface HomePageProps {
  openedDate: string;
  months: string;
  openedProducts: IProduct[];
  setOpenedProducts: React.Dispatch<any>;
  unopenedProducts: IProduct[];
  setUnopenedProducts: React.Dispatch<any>;
  setOpenedDate: (value: React.SetStateAction<string>) => void;
  setMonths: (value: React.SetStateAction<string>) => void;
  setReplaceSoonProducts: React.Dispatch<any>;
}

export function HomePage({
  openedDate,
  months,
  openedProducts,
  setOpenedProducts,
  unopenedProducts,
  setUnopenedProducts,
  setOpenedDate,
  setMonths,
  setReplaceSoonProducts,
}: HomePageProps): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [closed, setClosed] = useState<boolean>(false);
  const [expiryDate, setExpiryDate] = useState<string>('');
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

  const replaceSoon = useCallback(() => {
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
  }, [openedProducts, setReplaceSoonProducts, unopenedProducts]);

  useEffect(() => {
    replaceSoon();
    setMonths('');
  }, [replaceSoon, setMonths]);

  const handleOpened = (e: any) => {
    setOpened(e.target.checked);
    setClosed(false);
    if (e.target.checked) {
      setClosed(false);
    }
  };
  const handleClosed = (e: any) => {
    setOpened(false);
    setClosed(e.target.checked);
    if (e.target.checked) {
      setOpened(false);
    }
  };
  return (
    <>
      <div className="app-ctn">
        <h1>Skincare Expiry Manager App</h1>
        <NavBar />
        <br />
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
      </div>
    </>
  );
}

import { differenceInMonths } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../App';
import { InputBar } from './InputBar';
import { NavBar } from './NavBar';

interface HomePageProps {
  openedDate: string;
  months: string;
  openedProducts: IProduct[];
  closedProducts: IProduct[];
  setOpenedProducts: React.Dispatch<any>;
  setClosedProducts: React.Dispatch<any>;
  setOpenedDate: (value: React.SetStateAction<string>) => void;
  setMonths: (value: React.SetStateAction<string>) => void;
  setReplaceSoonProducts: React.Dispatch<any>;
}

export function HomePage({
  openedDate,
  months,
  openedProducts,
  closedProducts,
  setOpenedProducts,
  setClosedProducts,
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
      setClosedProducts([...closedProducts, product]);
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
    const replaceSoonClosed = closedProducts.filter(
      (product: IProduct) =>
        product.expiryDate &&
        differenceInMonths(new Date(product.expiryDate), new Date()) < 1
    );
    const replaceSoonAll = replaceSoonClosed.concat(replaceSoonOpened);
    setReplaceSoonProducts(replaceSoonAll);
  }, [openedProducts, setReplaceSoonProducts, closedProducts]);

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

  useEffect(() => {
    replaceSoon();
    setMonths('');
  }, [replaceSoon, setMonths]);

  return (
    <>
      <div className="app-ctn">
        <h1>Skincare Expiry Manager App</h1>
        <NavBar />
        <br />
        <InputBar
          handleMonths={(e) => setMonths(e.target.value)}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          handleOpened={handleOpened}
          handleClosed={handleClosed}
          handleEnter={handleEnter}
          handleExpiryDate={(e) => setExpiryDate(e.target.value)}
          handleOpenedDate={(e) => setOpenedDate(e.target.value)}
          opened={opened}
          closed={closed}
          months={months}
          input={input}
          openedDate={openedDate}
          expiryDate={expiryDate}
        />
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { useLocalStorage } from './utils/localStorage';
import './App.css';
import { InputBar } from './components/InputBar';
import { Product } from './components/Product';

export interface IProduct{
  openedDate: Date,
  name: string,
  months?: string|undefined, 
  expiryDate?: Date|undefined
}

function App() {
  const [input, setInput] = useState<string>("")
  const [opened, setOpened] = useState<boolean>(false)
  const [closed, setClosed] = useState<boolean>(false)
  const [products, setProducts] = useLocalStorage("products", [])
  const [months, setMonths] = useState<string>()
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [openedDate, setOpenedDate]= useState<Date>(new Date())
  const handleEnter = () => {
    const product = ({
      name: input, 
      date: openedDate, 
      months: months, 
      expiryDate: expiryDate
    })
    setProducts([...products, product])
    // setInput("")
  }

  
  return (
    <>
    <h1>Skincare Expiry Manager App</h1>
    <h3>Write the input and its expiry date or when you opened it</h3>
    <InputBar 
    handleMonths={(e)=> setMonths(e.target.value)}
    months = {months}
    input = {input} 
    onChange = {(e) => {setInput(e.target.value)}}
    handleOpened = {(e)=> {setOpened(e.target.checked); setClosed(false); if (e.target.checked) {
      setClosed(false);
    }}}
    handleClosed = {(e)=> {setOpened(false); setClosed(e.target.checked); if (e.target.checked) {
      setOpened(false);
    }}}
    opened = {opened}
    closed = {closed}
    handleEnter = {handleEnter}
    handleExpiryDate = {(e)=> setExpiryDate(e.target.value)}
    handleOpenedDate= {(e)=> setOpenedDate(e.target.value)}
    openedDate={openedDate}
    expiryDate={expiryDate}
    />
    <div className = "container">
    {products.map((product: IProduct, i: number) => 
      months ? (
      <Product key = {i} product = {product} />):
      <Product  key = {i} product = {product}/> 
      ) }
      </div>
    </>
  );
}

export default App;

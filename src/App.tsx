import React, { useState } from 'react';
import { useLocalStorage } from './utils/localStorage';
import './App.css';
import { InputBar } from './InputBar';
import { Product } from './Product';

interface Product{
  date: Date,
  name: string,
  month: string|undefined
}

function App() {
  const [input, setInput] = useState<string>("")
  const [opened, setOpened] = useState<boolean>(false)
  const [closed, setClosed] = useState<boolean>(false)
  const [products, setProducts] = useLocalStorage("products", [])
  const [month, setMonth] = useState<string>()
  const handleEnter = () => {
    const product = ({
      name: input, 
      date: new Date(), //TODO: here I would need to put the date they selected from the calendar
      month: month
    })
    setProducts([...products, product])
    // setInput("")
  }
  
  return (
    <><h1>Write the input and its expiry date or when you opened it</h1>
    <InputBar 
    handleMonths={(e)=> setMonth(e.target.value)}
    months = {month}
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
    handleEnter = {handleEnter}/>
    <div className = "container">
    {products.map((product: Product, i: number) => 
      month ? (
      <Product key = {i} name = {product.name} date = {product.date} month = {month} />):
      <Product  key = {i} name = {product.name} date = {product.date} /> 
      ) }
      </div>
    </>
  );
}

export default App;

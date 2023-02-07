import { IProduct } from "../App";
import { Product } from "./Product";
import { useNavigate } from 'react-router-dom';

interface ClosedProductsProps {
    unopenedProducts: IProduct[];
     handleDelete: (product: IProduct) => void;
     submit:(product: IProduct) => void ;
     setMonths: (value: React.SetStateAction<string>) => void;
     months: string;
}


export function ClosedProducts({unopenedProducts, handleDelete, submit, setMonths, months}:ClosedProductsProps): JSX.Element{
  let navigate = useNavigate();
    
    return (
<>
<h1>Closed products</h1>
<button onClick={() => navigate("/")}>Home</button>

<div className="container">
  {unopenedProducts.map((product: IProduct, i: number) => (
    <div className="cell" key={i}>
      <Product
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
  )
}
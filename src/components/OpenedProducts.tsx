import { IProduct } from "../App";
import { Product } from "./Product";
import { useNavigate } from 'react-router-dom';


interface OpenedProductsProps {
    openedProducts: IProduct[];
     handleDelete: (product: IProduct) => void;
     submit:(product: IProduct) => void ;
     setMonths: (value: React.SetStateAction<string>) => void;
     months: string;
}

export function OpenedProducts({openedProducts, handleDelete, submit, setMonths, months}: OpenedProductsProps): JSX.Element{
  let navigate = useNavigate();  
  return(
        <>
        <h1>Opened products</h1>
        <button onClick={() => navigate("/")}>Home</button>
        <div className="container">
          {openedProducts.map((product: IProduct, i: number) => (
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
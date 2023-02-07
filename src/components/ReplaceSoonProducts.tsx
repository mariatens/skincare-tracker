import { IProduct } from "../App";
import { RplProduct } from "./RplProduct";
import { useNavigate } from 'react-router-dom';

interface ReplaceSoonProductsProps{
    replaceSoonProducts: IProduct[];
    handleDelete: (product: IProduct) => void;
}
export function ReplaceSoonProducts({replaceSoonProducts, handleDelete}: ReplaceSoonProductsProps): JSX.Element{
  let navigate = useNavigate();
    
    return (
<>
<h1>Replace soon!</h1>
<button onClick={() => navigate("/")}>Home</button>
<div className="container">
  {replaceSoonProducts.map((product: IProduct, i: number) => (
    <div key={i}>
      <RplProduct
        key={i}
        product={product}
        handleDelete={handleDelete}
      />
    </div>
  ))}
</div>
</>
    )
}
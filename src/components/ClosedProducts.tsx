import { IProduct } from '../App';
import { Product } from './Product';
import { useNavigate } from 'react-router-dom';

interface ClosedProductsProps {
  handleDelete: (product: IProduct) => void;
  submit: (product: IProduct) => void;
  setMonths: (value: React.SetStateAction<string>) => void;
  months: string;
  closedProducts: IProduct[];
}

export function ClosedProducts({
  handleDelete,
  submit,
  setMonths,
  months,
  closedProducts
}: ClosedProductsProps): JSX.Element {
  let navigate = useNavigate();

  return (
    <>
      <h1>Closed products</h1>
      <button onClick={() => navigate('/')}>Home</button>

      <div className="container">
        {closedProducts.map((product: IProduct, i: number) => (
          <div className="cell" key={i}>
            <Product
              product={product}
              months={months}
              handleDelete={() => handleDelete(product)}
              handleSubmit={() => submit(product)}
              handleMonths={(e) => setMonths(e.target.value)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

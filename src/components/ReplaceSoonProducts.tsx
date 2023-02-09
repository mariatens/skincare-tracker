import { IProduct } from '../App';
import { useNavigate } from 'react-router-dom';
import { Product } from './Product';

interface ReplaceSoonProductsProps {
  replaceSoonProducts: IProduct[];
  handleDelete: (product: IProduct) => void;
  submit: (product: IProduct) => void;
  setMonths: (value: React.SetStateAction<string>) => void;
  months: string;
}
export function ReplaceSoonProducts({
  replaceSoonProducts,
  handleDelete,
  submit,
  setMonths,
  months,
}: ReplaceSoonProductsProps): JSX.Element {
  let navigate = useNavigate();

  return (
    <>
      <h1>Replace soon!</h1>
      <button onClick={() => navigate('/')}>Home</button>
      <div className="container">
        {replaceSoonProducts.map((product: IProduct, i: number) => (
          <div key={i}>
            <Product
              handleSubmit={() => submit(product)}
              handleMonths={(e) => setMonths(e.target.value)}
              months={months}
              key={i}
              product={product}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </>
  );
}

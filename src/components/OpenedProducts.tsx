import { IProduct } from '../App';
import { Product } from './Product';
import { useNavigate } from 'react-router-dom';

interface OpenedProductsProps {
  handleDelete: (product: IProduct) => void;
  submit: (product: IProduct) => void;
  setMonths: (value: React.SetStateAction<string>) => void;
  months: string;
  openedProducts: IProduct[];
}

export function OpenedProducts({
  handleDelete,
  submit,
  setMonths,
  months,
  openedProducts,
}: OpenedProductsProps): JSX.Element {
  let navigate = useNavigate();
  return (
    <>
      <h1>Opened products</h1>
      <button onClick={() => navigate('/')}>Home</button>
      <div className="container">
        {openedProducts.map((product: IProduct, i: number) => (
          <div className="cell" key={i}>
            <Product
              product={product}
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

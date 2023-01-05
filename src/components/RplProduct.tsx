import { IProduct } from '../App';
import { timeLeftOpened } from '../utils/timeLeftOpened';
import { timeLeftUnopened } from '../utils/timeLeftUnOpened';

interface RplProductProps {
  product: IProduct;
  handleDelete: (product: IProduct) => void;
}

export function RplProduct({
  product,
  handleDelete,
}: RplProductProps): JSX.Element {
  return (
    <div className="cell">
      <h1>{product.name}</h1>
      <br></br>
      {product.months && (
        <h2 className="time-remain">
          {timeLeftOpened(product.openedDate, product.months)}
        </h2>
      )}
      {product.expiryDate && (
        <>
          <h2 className="time-remain">
            {timeLeftUnopened(product.expiryDate)}
          </h2>
        </>
      )}
      <button onClick={() => handleDelete(product)}>Delete</button>
    </div>
  );
}

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
      <div className="product">
        <h1>{product.name}</h1>
        <br></br>
        {product.months && (
          <p className="time-remain">
            {timeLeftOpened(product.openedDate, product.months)}
          </p>
        )}
        {product.expiryDate && (
          <>
            <p className="time-remain">
              {timeLeftUnopened(product.expiryDate)}
            </p>
          </>
        )}
        <button onClick={() => handleDelete(product)}>Delete</button>
      </div>
    </div>
  );
}

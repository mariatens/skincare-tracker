import { IProduct } from '../App';
import { useState } from 'react';
import { calculateTimeLeftClosedProducts } from '../utils/timeLeftClosed';
import { calculateTimeLeftOpenedProducts } from '../utils/timeLeftOpened';

interface ProductProps {
  product: IProduct;
  handleSubmit: () => void;
  handleMonths?: (e: any) => void;
  handleDelete: (product: IProduct) => void;
}

export function Product(props: ProductProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeToOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="product">
        <h1>{props.product.name}</h1>
        <br />
        {props.product.months && (
          <p className="time-remain">
            {calculateTimeLeftOpenedProducts(
              props.product.openedDate,
              props.product.months
            )}
          </p>
        )}
        {props.product.expiryDate && (
          <>
            <p className="time-remain">
              {calculateTimeLeftClosedProducts(props.product.expiryDate)}
            </p>
            <button
              className="change-open"
              onClick={() => handleChangeToOpen()}
            >
              I opened the product!
            </button>
          </>
        )}
        <button onClick={() => props.handleDelete(props.product)}>
          Delete
        </button>
        {isOpen && (
          <>
            <div>
              <br />
              <label>Duration</label>
              <select onChange={props.handleMonths}>
                <option value="Months">Months</option>
                <option value="24">24M</option>
                <option value="12">12M</option>
                <option value="6">6M</option>
                <option value="3">3M</option>
              </select>
            </div>
            <br />
            <button
              className="submit"
              onClick={() => {
                props.handleSubmit();
                setIsOpen(false);
              }}
            >
              Submit{' '}
            </button>
          </>
        )}
      </div>
    </>
  );
}

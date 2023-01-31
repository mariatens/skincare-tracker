import { timeLeftOpened } from '../utils/timeLeftOpened';
import { timeLeftUnopened } from '../utils/timeLeftUnOpened';
import { IProduct } from '../App';
import { useState } from 'react';

interface ProductProps {
  product: IProduct;
  months?: string;
  handleSubmit: () => void;
  handleMonths?: (e: any) => void;
  handleDelete: (product: IProduct) => void;
  setMonths: React.Dispatch<React.SetStateAction<string>>
}

export function Product(props: ProductProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeToOpen = (product: IProduct) => {
    setIsOpen(!isOpen); //to ask how many months it can remain opened
  };
  return (
    <>
      <div className="product">
        <h1>{props.product.name}</h1>
        <br />
        {props.product.months && (
          <p className="time-remain">
            {timeLeftOpened(props.product.openedDate, props.product.months)}
          </p>
        )}
        {props.product.expiryDate && (
          <>
            <p className="time-remain">
              {timeLeftUnopened(props.product.expiryDate)}
            </p>
            <button
              className="change-open"
              onClick={() => handleChangeToOpen(props.product)}
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
              <label>Duration</label>
              <select onChange={props.handleMonths}>
                <option value="Months">Months</option>
                <option value="24">24M</option>
                <option value="12">12M</option>
                <option value="6">6M</option>
                <option value="3">3M</option>
              </select>
            </div>
            <button className="submit" onClick={()=> {props.handleSubmit(); setIsOpen(false); props.setMonths("")}}>
              Submit{' '}
            </button>
          </>
        )}
      </div>
    </>
  );
}

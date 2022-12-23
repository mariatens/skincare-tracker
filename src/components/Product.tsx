import { timeLeftOpened } from "../utils/timeLeftOpened";
import { timeLeftUnopened } from "../utils/timeLeftUnOpened";
import { IProduct } from "../App";

interface ProductProps {
  product: IProduct;
  handleChangeToOpen?:  () => void;
  isOpen?: boolean;
  months?: string;
  handleMonths?: (e: any) => void;
}

export function Product(props: ProductProps): JSX.Element {
  return (
    <>
      <h1>{props.product.name}</h1>
      {props.product.months && (
        <h2>
          {timeLeftOpened(props.product.openedDate, props.product.months)}
        </h2>
      )}
      {props.product.expiryDate && (<>
        <h2>{timeLeftUnopened(props.product.expiryDate)}</h2>
        <button onClick = {props.handleChangeToOpen}>I opened the product!</button>
      </>
      )}
       {props.isOpen && (
      <div>
        <label>Duration</label>
          <select onChange={props.handleMonths}>
            <option value="24">24M</option>
            <option value="12">12M</option>
            <option value="6">6M</option>
            <option value="3">3M</option>
          </select>
      </div>
    )}
    </>
  );
}

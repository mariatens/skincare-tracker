
import { timeLeftOpened} from "../utils/timeLeftOpened"
import {timeLeftUnopened } from "../utils/timeLeftUnOpened"
import { IProduct } from "../App"


interface ProductProps{
    product: IProduct
}

export function Product(props: ProductProps):JSX.Element{
    return (
        <>
        <h1>
            {props.product.name}
        </h1>
        {props.product.months && 
            <h2>{timeLeftOpened(props.product.openedDate, props.product.months)}</h2>}
        {props.product.expiryDate &&
            <h2>{timeLeftUnopened(props.product.expiryDate)}</h2>}
        </>
    )
}
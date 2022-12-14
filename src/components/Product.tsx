
import { timeLeft } from "../utils/timeLeft"
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
            <h2>{timeLeft(props.product.openedDate, props.product.months)}</h2>}
        {props.product.expiryDate &&
            <h2>{timeLeft(props.product.openedDate, props.product.expiryDate.toISOString())}</h2>}
        </>
    )
}
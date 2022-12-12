
import { daysLeft } from "./utils/daysLeft"

interface ProductProps{
    name: string, 
    date:Date, 
    month?: string
    }
export function Product(props: ProductProps):JSX.Element{
    return (
        <>
        <h1>
            {props.name}
        </h1>
        {props.month && 
            <h2>{daysLeft(props.date, props.month)}</h2>}
        
        </>
    )
}
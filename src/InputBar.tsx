interface InputBarProps{
    input: string,
    onChange: (product: any) => void, 
    handleOpened: (event: any) => void,
    handleClosed: (event: any) => void,
    opened: boolean, 
    closed: boolean, 
    handleEnter: ()=>void, 
    handleMonths: (e: any)=> void, 
    months: string|undefined

}

export function InputBar(props: InputBarProps): JSX.Element{
    return (
        <>
        <input placeholder = "Write your product here" 
        value = {props.input} 
        onChange = {props.onChange}></input>
        <label>Opened</label>
        <input type="checkbox" value = "Opened" checked = {props.opened} onChange ={props.handleOpened}></input>
        <label>Closed</label>
        <input type="checkbox" value = "Closed" checked = {props.closed} onChange ={props.handleClosed}></input>
        {props.opened  && (
            <>
      <label>Duration</label>
      <select value = {props.months} onChange = {props.handleMonths}>
        <option value = "24">24M</option>
        <option value = "12">12M</option>
        <option value = "6">6M</option>
        <option value = "3">3M</option>
      </select>
      <label>
            Date Opened:
            <input type="date" />
          </label>
      </>
    )}
    {props.closed &&
        (<label>
            Expiry Date:
            <input type="date" />
          </label>
        )
        }
    <button onClick = {props.handleEnter}>Enter</button>
        </>
    )
}
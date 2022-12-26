interface InputBarProps {
  //TODO: maybe change to product: IProduct and input as name. think this isn't sensible
  onChange: (product: any) => void;
  handleOpened: (event: any) => void;
  handleClosed: (event: any) => void;
  handleEnter: () => void;
  handleMonths: (e: any) => void;
  handleOpenedDate: (event: any) => void;
  handleExpiryDate?: (event: any) => void;
  input: string;
  months: string | undefined;
  opened: boolean;
  closed: boolean;
  openedDate: string;
  expiryDate?: string;
}

export function InputBar(props: InputBarProps): JSX.Element {
  return (
    <>
      <input
        placeholder="Write your product here"
        value={props.input}
        onChange={props.onChange}
      ></input>
      <label>Opened</label>
      <input
        type="checkbox"
        value="Opened"
        checked={props.opened}
        onChange={props.handleOpened}
      ></input>
      <label>Closed</label>
      <input
        type="checkbox"
        value="Closed"
        checked={props.closed}
        onChange={props.handleClosed}
      ></input>
      {props.opened && (
        <>
          <label>Duration</label>
          <select value={props.months} onChange={props.handleMonths}>
            <option value="Months">Months</option> 
            <option value="24">24M</option>
            <option value="12">12M</option>
            <option value="6">6M</option>
            <option value="3">3M</option>
          </select>
          <label>
            Date Opened:
            <input
              type="date"
              value={props.openedDate}
              onChange={props.handleOpenedDate}
            />
          </label>
        </>
      )}
      {props.closed && (
        <label>
          Expiry Date:
          <input
            type="date"
            value={props.expiryDate}
            onChange={props.handleExpiryDate}
          />
        </label>
      )}
      <button onClick={props.handleEnter}>
        Enter
      </button>
    </>
  );
}

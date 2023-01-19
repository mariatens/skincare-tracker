export type PageView = "Rpl"|"Opened"|"Closed"

interface NavBarProps{
    setView : React.Dispatch<React.SetStateAction<PageView>>
}


export function NavBar({setView}: NavBarProps){
    return (
    <>
    <div className="nav-bar">
    <a onClick = {()=>setView("Opened")}>Opened products</a>
    <a onClick = {()=>setView("Closed")}>Closed products</a>
    <a onClick = {()=>setView("Rpl")}>Replace Soon products</a>
    </div>
    </>)
}
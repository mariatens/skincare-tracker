export type PageView = 'Rpl' | 'Opened' | 'Closed';

interface NavBarProps {
  setView: React.Dispatch<React.SetStateAction<PageView>>;
}

export function NavBar({ setView }: NavBarProps) {
  return (
    <>
      <div className="nav-bar">
        <button onClick={() => setView('Opened')}>Opened products</button>
        <button onClick={() => setView('Closed')}>Closed products</button>
        <button onClick={() => setView('Rpl')}>Replace Soon products</button>
      </div>
    </>
  );
}

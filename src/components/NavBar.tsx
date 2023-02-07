import { useNavigate } from 'react-router-dom';

export function NavBar() {
  let navigate = useNavigate();

  return (
    <>
      <div className="nav-bar">
        <button onClick={() => navigate('opened-products')}>
          Opened products
        </button>
        <button onClick={() => navigate('closed-products')}>
          Closed products
        </button>
        <button onClick={() => navigate('replace-soon-products')}>
          Replace Soon products
        </button>
      </div>
    </>
  );
}

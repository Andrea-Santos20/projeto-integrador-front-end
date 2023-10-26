import { Link, useLocation } from 'react-router-dom';
import styles from "./Navbar.module.css"; 

const Navbar = () => {

  const location = useLocation();

  return (
    <nav className={styles.navbar}>
     <div>
        <ul>
        <li className={styles.item}>
            <Link to="/">digital booking</Link>
          </li>
        </ul>
     </div>   

      <div className="navbar-login" id="navbar-login">
        <ul className={styles.list}>
        {location.pathname !== '/login' && (
            <li className={styles.item}>
              <Link to="/login">
                <button className={styles.button}>Iniciar sessão</button>
              </Link>
            </li>
          )}

          {location.pathname !== '/register' && (
            <li className={styles.item}>
              <Link to="/register">
                <button className={styles.button}>Criar conta</button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
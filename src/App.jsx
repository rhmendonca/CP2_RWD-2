import { Outlet } from 'react-router-dom'
import Header from './assets/components/Header.jsx';
import Footer from './assets/components/Footer.jsx';
import styles from './App.module.css';

function App() {

  return (
    <>
      <div className={styles.container}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App

import { GlobalStyles } from './styles/GlobalStyles.ts';

import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header/Header.tsx';
import { Orders } from './components/Orders/Orders.tsx';

export function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <Header />
      <Orders />
    </>
  );
}

// pages/_app.js

import '../styles/styles.css';
import '../styles/footer.css';
import '../styles/Navbar.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

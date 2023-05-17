import "../styles/globals.css";
import { context } from "../components/base/contex";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [state, setState] = useState(false);
  return (
    <context.Provider value={{ state, setState }}>
      <Component {...pageProps} />
    </context.Provider>
  );
}

export default MyApp;

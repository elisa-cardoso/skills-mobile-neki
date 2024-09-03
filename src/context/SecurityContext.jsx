import { createContext ,useState} from "react";


export const Context = createContext({});

export const SecurityContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  

  const setIsLogged = () => {
    setLogged(true);
  };
  const setNotLogged = () => {
    setLogged(false);
  };
  const value = {
    logged: logged,
    setIsLogged: setIsLogged,
    setNotLogged:setNotLogged,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
import { useState, createContext, useEffect } from "react";

export const AlertContext = createContext({
  title: "",
  body: "",
  show: false,
  variant: "",
});

const AlertContextProvider = (props) => {
  const [toast, setToast] = useState({
    title: "",
    body: "",
    show: false,
    variant: "",
  });

  return (
    <AlertContext.Provider
      value={{ toast, setToast }}
    >
      {props.children}
    </AlertContext.Provider>
  );

};

export default AlertContextProvider;
import React, { createContext, useContext } from 'react';
import Toast from 'react-native-toast-message';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ToastContext.Provider>
  );
};

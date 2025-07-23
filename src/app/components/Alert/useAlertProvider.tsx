"use client"

import { createContext, useContext, useState } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertStateProps {
  message: string;
  type?: AlertType;
}

interface AlertContextProps {
  alert: AlertStateProps | null;
  showAlert: (msg: string, type?: AlertType) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined)


export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertStateProps | null>(null);

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }


  const clearAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider")
  }
  return context;
}
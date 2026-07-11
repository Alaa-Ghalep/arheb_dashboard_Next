import { useState, useEffect } from 'react';

export default function useSuccessAlert() {
  const [show,      setShow]      = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const hideAlert = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setShow(false);
    }, 400);
  };

  const showAlert = () => setShow(true);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => hideAlert(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return { show, isExiting, showAlert, hideAlert };
}
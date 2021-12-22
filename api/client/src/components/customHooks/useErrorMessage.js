import { useEffect, useState } from 'react';

import { get_error_message } from '../../utils/errorMessages';

export const useErrorMessage = ({ errorResponse }) => {
  const [errorMessage, setErrorMessage] = useState(
    get_error_message(errorResponse?.status)
  );

  useEffect(() => {
    return () => {
      console.log('clean up useErrorMsg');
      setErrorMessage(null);
    };
  }, []);

  return {
    errorMessage,
    setErrorMessage,
  };
};

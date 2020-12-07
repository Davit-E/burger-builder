import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    const [initialized, setInitialized] = useState(null);

    useEffect(() => {
      const reqInterceptror = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      const resInterceptror = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          setError(err);
        }
      );
      setInitialized(true);
      return () => {
        axios.interceptors.request.eject(reqInterceptror);
        axios.interceptors.response.eject(resInterceptror);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    if (!initialized) return null;
    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;

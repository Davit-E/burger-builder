import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = <T extends any>(
  WrappedComponent: React.FC<T>,
  axios: AxiosInstance
) => {
  return (props: any) => {
    const [error, setError] = useState<AxiosError | null>(null);
    const [initialized, setInitialized] = useState<boolean | null>(null);

    useEffect(() => {
      const reqInterceptror = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      const resInterceptror = axios.interceptors.response.use(
        (res: AxiosResponse) => res,
        (err: AxiosError) => {
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

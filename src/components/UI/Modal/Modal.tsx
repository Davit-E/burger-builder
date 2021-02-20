import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

interface ModalProps {
  show: any;
  children: React.ReactNode;
  modalClosed: () => void;
}

const modal = (props: ModalProps) => {
  let modalClass = [classes.Modal];
  if (props.show) modalClass.push(classes.Show);
  return (
    <>
      <div className={modalClass.join(' ')}>{props.children}</div>
      <Backdrop show={props.show} clicked={props.modalClosed} />
    </>
  );
};

const checkShow = (prevProps: ModalProps, nextProps: ModalProps) =>
  prevProps.show === nextProps.show &&
  prevProps.children === nextProps.children;

export default React.memo(modal, checkShow);

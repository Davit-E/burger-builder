import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = (props) => {
  let modalClass = [classes.Modal];
  if (props.show) modalClass.push(classes.Show);
  return (
    <>
      <div className={modalClass.join(' ')}>{props.children}</div>
      <Backdrop show={props.show} clicked={props.modalClosed} />
    </>
  );
};

const checkShow = (prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children;

export default React.memo(modal, checkShow);

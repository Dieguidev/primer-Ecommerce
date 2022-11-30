import React from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCarThunk } from '../store/slices/car.slice';

const CarSlide = ({show, handleClose}) => {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getProductsCarThunk())
  },[])

  const productsCart = useSelector(state => state.cart)


  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {productsCart.map (car => (
            <div>{car.title}</div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default CarSlide;
import React from 'react';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCarThunk, deleteItenCarThunk, getProductsCarThunk } from '../store/slices/car.slice';
import { Button } from 'react-bootstrap';

const CarSlide = ({ show, handleClose }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsCarThunk())
  }, [])

  const productsCart = useSelector(state => state.cart)
  console.log(productsCart)

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {productsCart.map(car => (
          <div key={car.id}>
            {car.title}
            <Button
              variant="light"
              onClick={() => dispatch(deleteItenCarThunk(car.id))}><i className="fa-solid fa-trash-can"></i></Button>
            <p>$ {car.price}</p>
            <p>quantity: <span style={{width:20, border:2}}>{car.productsInCart.quantity}</span></p>
          </div>
        ))}
        <Button
          className='mt-5'
          variant="danger"
          onClick={() => dispatch(checkoutCarThunk())}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CarSlide;
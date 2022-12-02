import React, { useEffect } from 'react';
import { CarouselItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import purchasesSlice, { getPurchasesThunk } from '../store/slices/purchases.slice'

const Purchages = () => {

  const dispatch = useDispatch()
  const purchases = useSelector(state => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  // console.log(purchases)

  return (
    <div>
      {purchases.map(purchase => (
        <div key={purchase.id}>
          <p><b>{purchase.createdAt}</b></p>
          {purchase.cart.products.map(prod => (
            <div key={prod.id}>
              <p>{prod.title}</p>
              <p>{prod.price}</p>
            </div>
          ))
          }
        </div>
      )
      )}
    </div>
  );
};

export default Purchages;
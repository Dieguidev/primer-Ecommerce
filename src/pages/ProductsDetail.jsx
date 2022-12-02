import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { createPurchasesThunk } from '../store/slices/car.slice';


const ProductsDetail = () => {

  const { id } = useParams()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  const productsList = useSelector(state => state.products)

  const products = productsList.find(product => product.id === Number(id))

  const similarProducts = productsList.filter(product =>
    product.category.id === products.category.id)

  const [rate, setRate] = useState('')

  const addIItem = () => {
    const productsInCart = {
      id: products.id,
      quantity: rate
    }
    dispatch(createPurchasesThunk(productsInCart))
  }

  // console.log(similarProducts)

  return (
    <div>


      <Row>
        <Col lg={4}>
          <img
            style={{ height: 500, objectFit: 'contain' }}
            src={products?.productImgs[0]} alt="" className='img-fluid' />
        </Col>
        <Col lg={8}>
          <h1>{products?.title}</h1>
          <p>{products?.description}</p>
          <p>price <span style={{ fontSize: 25 }}>$ {products?.price}</span></p>
          <input
            placeholder='Quantity'
            type="text"
            value={rate}
            onChange={e => setRate(e.target.value)}
          />
          <Button
            variant='danger'
            style={{ width: 62, borderRadius: 4 }}
            onClick={addIItem}><i className="fa-solid fa-cart-shopping"></i>
          </Button>
        </Col>

      </Row>
      <Row className='mt-5'>
        <h4>Discover Similar Products</h4>
        <ListGroup variant="flush">
          {similarProducts.map(productItem => (
            <ListGroup.Item 
              style={{maxWidth: 300}}
              key={productItem.id}>
              {productItem.id !== products.id &&
                <Link key={productItem.id} to={`/product/${productItem.id}`}>
                  <img
                    style={{ height: 150, objectFit: 'contain', marginTop: 10 }}
                    src={productItem.productImgs[0]} alt="" className='img-fluid'
                  />
                  <p>{productItem.title}</p>
                  <p style={{ marginTop: -10 }}>price</p>

                  <p style={{ marginTop: -10 }}><b>$ {productItem.price}</b></p>
                  <Button
                    variant='danger'
                    style={{ width: 62, borderRadius: 24, marginTop: -10 }}
                  ><i className="fa-solid fa-cart-shopping"></i></Button>
                </Link>
              }

            </ListGroup.Item>
          ))}

        </ListGroup>

      </Row>


    </div>
  );
};

export default ProductsDetail;
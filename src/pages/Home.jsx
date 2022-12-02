import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProductsThunk, getProductsThunk, filterNameProductsThunk } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, Col, Row, InputGroup, ListGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { createPurchasesThunk } from '../store/slices/car.slice';


const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.products);

  const [categoryList, setCategoryList] = useState([]);
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk());

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategoryList(res.data.data.categories))
  }, [])



  const addIItem = () => {
    const productsInCart = {
      id: products.id,
      quantity: 1
    }
    dispatch(createPurchasesThunk(productsInCart))
  }

  // console.log(products)

  return (
    <div>
      <Row>
        <Col lg={3}>
          <ListGroup>
            {
              categoryList.map(category => (
                <ListGroup.Item key={category.id} onClick={() => dispatch(filterProductsThunk(category.id))} style={{ cursor: 'pointer' }}>
                  {category.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        
        <Col lg={9}>
          <InputGroup className="mb-3" style={{ maxWidth: 700 }}>
            <Form.Control
              placeholder="What are you looking for?"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={e => setInputSearch(e.target.value)}
            />
            <Button
              style={{ width: 100, }}
              onClick={() => dispatch(filterNameProductsThunk(inputSearch))}
              variant="danger" id="button-addon2">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <div key={product.id}>
                <Col>
                  <Card style={{ border:'none' }}>

                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                      <Card.Img
                        variant="top"
                        src={product.productImgs[0]}
                        style={{ height: 300, objectFit: 'contain', marginTop: 10 }} />
                      <Card.Body>

                        <Card.Title ><p>{product.title}</p></Card.Title>
                        <Card.Text>
                          <p style={{ marginTop: -10 }}>price</p>

                          <p style={{ marginTop: -10 }}><b>$ {product.price}</b></p>
                          <Button
                            variant='danger'
                            style={{ width: 62, borderRadius: 24 , marginTop: -10}}
                          ><i className="fa-solid fa-cart-shopping"></i></Button>
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProductsThunk, getProductsThunk, filterNameProductsThunk } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button,  Col,  Row ,InputGroup, ListGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';




const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.products);

  const [categoryList, setCategoryList]= useState([]);
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk());

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategoryList(res.data.data.categories))
  },[])

  // console.log(products)

  return (
    <div>
      <Row>
        <Col lg={3}>

          <ListGroup>
            {
            categoryList.map(category => (
              <ListGroup.Item onClick={()=> dispatch(filterProductsThunk(category.id))} style={{cursor: 'pointer'}}>
                {category.name}
              </ListGroup.Item>
            ))}
            
          </ListGroup>
        </Col>
        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={e=> setInputSearch(e.target.value)}
            />
            <Button 
              onClick={() => dispatch(filterNameProductsThunk(inputSearch))}
              variant="outline-secondary" id="button-addon2">
              Button
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product =>(
              <div key={product.id}>

                <Col>
                  <Card>

                    <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                      <Card.Img 
                        variant="top" 
                        src={product.productImgs[0]} 
                        style={{height: 200, objectFit: 'contain', marginTop: 10}}/>
                      <Card.Body>

                          <Card.Title >{product.title}</Card.Title>
                          <Card.Text>
                            {product.description}
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
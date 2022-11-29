import React from 'react';
import { useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

  const {id} = useParams()

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])

  const productsList = useSelector(state => state.products)

  const products = productsList.find(product  => product.id === Number(id))
  
  const similarProducts = productsList.filter(product=>
    product.category.id === products.category.id)
    
    
    
    // console.log(similarProducts)

  return (
    <div>
      
      <h1>{products?.title}</h1>
      <Row>
        <Col lg={9}>
          <img src={products?.productImgs[0]} alt="" className='img-fluid'/>
          <p>{products?.description}</p>
        </Col>
        <Col lg={3}>
          <h3>Similar Products</h3>
          <ListGroup variant="flush">
            {similarProducts.map(productItem => (
                <ListGroup.Item>
                  {productItem.id !==products.id && 
                    <Link key={productItem.id} to={`/product/${productItem.id}`}>
                      <img src={productItem.productImgs[0]} alt="" className='img-fluid'/>
                      {productItem.title}
                    </Link> 
                  }
                
                </ListGroup.Item>
            ))}
            
          </ListGroup>
        </Col>

      </Row>


      
    </div>
  );
};

export default ProductsDetail;
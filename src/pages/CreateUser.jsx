import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CreateUser = () => {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate()

  const submit = newUser => {
    axios.post('https://e-commerce-api.academlo.tech/api/v1/users', newUser)
      .then(res => navigate('/')
      )
    console.log(newUser)
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register('email')} />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter First Name" {...register('firstName')} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last Name" {...register('lastName')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" {...register('password')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Phone Number" {...register('phone')}/>
        <Form.Text className="text-muted">
        (10 characters)
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateUser;
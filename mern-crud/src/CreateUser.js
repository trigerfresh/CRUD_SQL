import { useState } from 'react';
import axios from 'axios';
import { Navigation } from './Navigation.js';
import { Alert, Form, Container, Row, Col, Button } from 'react-bootstrap';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const hName = (e) => { setName(e.target.value); };
  const hEmail = (e) => { setEmail(e.target.value); };

  const hSubmit = (e) => {
    e.preventDefault(); // Prevent form submission (refresh) when the button is clicked
    if (name === "") {
      setErr("Name is required");
      return;
    }

    if (email === "") {
      setErr("Email is required");
      return;
    }

    let data = { name, email };
    let url = 'http://localhost:5000/create';

    axios.post(url, data)
      .then(res => {
        setMsg('Data stored successfully.');
        console.log(url, data);
        setName("");
        setEmail("");
        setErr("");
      }).catch(err => {
        setErr("Error is: " + (err.response?.data || err.message || "Unknown error"));
      })
  };

  return (
    <>
      <Navigation />
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh', width: '100vh' }}>
        <Row className="justify-content-center bg-info bg-gradient rounded text-light w-100">
          <Col>
            <h1 className="text-center">Create User Data</h1>
            <Form onSubmit={hSubmit}>
              <Form.Group className="m-3">
                <Form.Control type="text" placeholder="Enter name" onChange={hName} value={name} />
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Control type="email" placeholder="Enter email" onChange={hEmail} value={email} />
              </Form.Group>

              <Button type="submit" variant="primary" style={{ marginLeft: '40%', marginBottom: '10px'}}>Save</Button>
            </Form>
            {err && !msg && <Alert variant="danger" className="mt-3">{err}</Alert>}
            {msg && !err && <Alert variant="info" className="mt-3">{msg}</Alert>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;

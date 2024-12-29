import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Container, Col, Row, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {Navigation} from './Navigation.js';

const EditUser = () => {
  const { id } = useParams();
  const [users, setUsers] = useState({ name: '', email: '' });
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:5000/show/${id}`;
        const res = await axios.get(url);
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setErr('Error fetching user data: ' + err.message);
      }
    };
    fetchData();
  }, [id]);

  const { name, email } = users;

  const hForm = async (e) => {
  e.preventDefault();

  if (name === '') {
    setErr('Name required');
    return;
  }

  if (email === '') {
    setErr('Email required');
    return;
  }

  const userData = { name, email };

  try {
    let url = `http://localhost:5000/update/${id}`;
    const res = await axios.put(url, userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(res.data);
    setMsg('User data updated successfully');
    navigate('/show');
  } catch (err) {
    console.error('Error updating user:', err);
    setErr('Error updating user: ' + err.response.data.message || err.message);
  }
};

  return (
    <>
      <Navigation />
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh', width: '100vh' }}>
        <Row className="justify-content-center bg-info bg-gradient rounded text-light w-100">
          <Col>
            <h1 className="text-center">Edit User Data</h1>
            <Form onSubmit={hForm}>
              <Form.Group className="m-3">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setUsers({ ...users, name: e.target.value })}
                  value={name}
                />
              </Form.Group>

              <Form.Group className="m-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setUsers({ ...users, email: e.target.value })}
                  value={email}
                />
              </Form.Group>

              <Button type="submit" variant="primary" style={{ marginLeft: '40%', marginBottom: '10px' }}>Update Data</Button>
            </Form>
            {err && !msg && <Alert variant="danger" className="mt-3">{err}</Alert>}
            {msg && !err && <Alert variant="info" className="mt-3">{msg}</Alert>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditUser;

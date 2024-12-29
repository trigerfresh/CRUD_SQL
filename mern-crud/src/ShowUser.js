import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigation } from './Navigation.js';
import {Link} from 'react-router-dom';

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const showUsers = async () => {
      try {
        let url = 'http://localhost:5000/show';
        let res = await axios.get(url);
        setUsers(res.data);
      } catch (err) {
        console.error('Error is :' + err);
        setErr('Error is : ' + err.message);
      }
    };
    showUsers();
  }, []);

  const hDelete = async (id) => {
    try {
      let url = `http://localhost:5000/delete/${id}`;
      await axios.delete(url); // Await the delete
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update state after delete
    } catch (err) {
      console.error(err);
      setErr('Error while deleting data: ' + err.message);
    }
  };

  return (
    <>
      <Navigation />
      <Container className = 'text-center mt-3'>
        <Row>
          <Col>
            <Table striped bordered hover responsive size="sm" variant="dark">
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
			<Link to={`/update/${user.id}`} className="btn2"><Button variant="outline-primary">Edit</Button>
                    </Link>{' '}
                        <Button
                          variant="outline-danger"
                          className="btn1"
                          onClick={() => hDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No users found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {err && <p>{err}</p>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShowUser;

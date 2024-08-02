import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password, password2);
      router.push('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { authenticateUser, readToken } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [, setFavourites] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  const updateAtoms = async () => {
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser(username, password);
      await updateAtoms();
      router.push('/favourites');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
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
          <Button type="submit">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

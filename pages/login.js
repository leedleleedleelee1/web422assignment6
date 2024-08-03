import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { authenticateUser, readToken } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const [loggedIn, setLoggedIn] = useState(false);

  const updateAtoms = async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      setLoggedIn(true);
      router.push('/favourites');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loggedIn) {
    window.location.reload();  // Force a page reload if logged in successfully
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

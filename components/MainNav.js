import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, NavDropdown, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { removeToken, readToken } from '@/lib/authenticate';

const MainNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    const savedToken = readToken();
    setToken(savedToken);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory(current => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };

  const handleInputChange = (event) => {
    setSearchField(event.target.value);
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    setToken(null);
    router.push('/login');
  };

  return (
    <Navbar expanded={isExpanded} fixed="top" className="navbar-dark bg-primary" expand="lg">
      <Container>
        <Navbar.Brand href="/">Frank Fu</Navbar.Brand>
        <Navbar.Toggle onClick={toggleNavbar} />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link onClick={closeNavbar} active={router.pathname === "/"}>Home</Nav.Link>
            </Link>
            {token && (
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={closeNavbar} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
              </Link>
            )}
          </Nav>
          &nbsp;
          {token && (
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control type="text" placeholder="Search" name="search" value={searchField} onChange={handleInputChange} />
              <Button type="submit" variant="outline-success" className="btn btn-outline-success">Search</Button>
            </Form>
          )}
          &nbsp;
          <Nav>
            {token ? (
              <NavDropdown title={token.username} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={closeNavbar} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={closeNavbar} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link onClick={closeNavbar} active={router.pathname === "/login"}>Login</Nav.Link>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link onClick={closeNavbar} active={router.pathname === "/register"}>Register</Nav.Link>
                </Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;

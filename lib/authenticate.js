import jwtDecode from 'jwt-decode';

export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function readToken() {
  const token = getToken();
  return token ? jwtDecode(token) : null;
}

export function isAuthenticated() {
  const token = getToken();
  return !!token;
}

export async function authenticateUser(username, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const { token } = await res.json();
    setToken(token);
    return true;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
}

export async function registerUser(username, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, password2 })
  });

  if (res.ok) {
    return true;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
}

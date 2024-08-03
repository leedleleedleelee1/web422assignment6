import { jwtDecode } from "jwt-decode";

export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
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
    body: JSON.stringify({ userName: username, password: password })
  });

  const data = await res.json();
  if (res.ok) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(username, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: username, password: password, password2: password2 })
  });

  const data = await res.json();
  if (res.ok) {
    return true;
  } else {
    throw new Error(data.message || "Registration failed");
  }
}

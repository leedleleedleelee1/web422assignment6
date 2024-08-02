import { getToken } from './authenticate';

async function fetchWithToken(url, options = {}) {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}`, ...options.headers };

  const res = await fetch(url, { ...options, headers });

  if (res.ok) {
    return res.json();
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }
}

export async function addToFavourites(id) {
  return fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, {
    method: 'PUT'
  });
}

export async function removeFromFavourites(id) {
  return fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`, {
    method: 'DELETE'
  });
}

export async function getFavourites() {
  return fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`);
}

export async function addToHistory(id) {
  return fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`, {
    method: 'PUT'
  });
}

export async function removeFromHistory(id) {
  return fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`, {
    method: 'DELETE'
  });
}

export async function getHistory() {
  return fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/api/user/history`);
}

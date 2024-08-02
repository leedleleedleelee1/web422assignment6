import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { isAuthenticated, readToken } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/', '/login', '/register'];

function RouteGuard({ children }) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = readToken();
      if (!isAuthenticated() && !PUBLIC_PATHS.includes(router.pathname)) {
        router.push('/login');
      } else if (isAuthenticated()) {
        await updateAtoms();
      }
    };

    const updateAtoms = async () => {
      setFavourites(await getFavourites());
      setSearchHistory(await getHistory());
    };

    checkAuthentication();
  }, [router]);

  return children;
}

export default RouteGuard;

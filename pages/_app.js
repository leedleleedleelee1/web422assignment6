import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from '@/components/RouteGuard';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.style.paddingTop = '100px';
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          const res = await fetch(url);
          if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            error.info = await res.json();
            error.status = res.status;
            throw error;
          }
          return res.json();
        },
      }}
    >
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}

export default MyApp;

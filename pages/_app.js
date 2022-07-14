import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Layouts from '../frontend/Layouts/Layouts';
import '../styles/globals.css';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/gql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </ApolloProvider>
  );
}
export default MyApp;

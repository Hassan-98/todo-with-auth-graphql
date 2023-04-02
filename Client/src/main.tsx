import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
//= GraphQL Client
import client from './graphql';
//= Router
import router from './routes';
//= Styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
    <Toaster position="top-right" gutter={8} />
  </ApolloProvider>
)

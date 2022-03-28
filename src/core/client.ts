import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {onError} from 'apollo-link-error';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL
});

const errorLink: any = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
    
    if (graphQLErrors[0].message === "Unauthorized") {
      localStorage.removeItem("token");
    }
  }

  if (networkError) {
    console.log('networkError', networkError);
  }
});

const middleware = new ApolloLink((operation, forward) => {
  if (typeof window !== "object") {
    return forward(operation);
  }

  const token = localStorage.getItem("token");

  operation.setContext(({headers = {}}, cookies: any) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    credentials: "include",
  }));
  return forward(operation);
});

const link = ApolloLink.from([errorLink, middleware, uploadLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache: cache,
  credentials: "include",
  connectToDevTools: process.env.NODE_ENV === "development",
});

export default client;

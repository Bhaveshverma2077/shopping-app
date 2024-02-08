"use client";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5050/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log("token");
  console.log(token);

  return {
    headers: { ...headers, Authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  // uri: "http://localhost:5050/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

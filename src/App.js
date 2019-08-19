import React from "react";
import "./App.css";

import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const CharactersQuery = () => {
  return (
    <Query
      query={gql`
        {
          characters {
            results {
              id
              name
              status
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error!</p>;

        return data.characters.results.map(character => {
          return (
            <p key={character.id}>
              <b>✳️ {character.name}</b> - {character.status}
            </p>
          );
        });
      }}
    </Query>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>My first Apollo app 🚀</h2>
        <CharactersQuery />
      </div>
    </ApolloProvider>
  );
}

export default App;

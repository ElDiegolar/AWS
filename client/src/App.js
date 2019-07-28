import React from 'react';

// components

import PrinterList from './components/PrinterList';
import AddPrinter from './components/AddPrinter';

// apollo client & setup

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <h1> AWS printer list</h1>
        <PrinterList></PrinterList>
        <AddPrinter></AddPrinter>
      </div>
    </ApolloProvider>
  );
}

export default App;

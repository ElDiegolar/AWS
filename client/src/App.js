import React from 'react';

// components

import PrinterList from './components/PrinterList';
import AddPrinter from './components/AddPrinter';

// apollo client & setup

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://ec2-52-15-71-122.us-east-2.compute.amazonaws.com:4000/graphql'
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

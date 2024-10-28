import React, { Suspense} from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import App from "./App";
import "./i18n";
import "./index.css";
import { ContextProvider } from "./view/Login/context/Auth.context";
// import { ThirdwebProvider } from "@thirdweb-dev/react";


function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  console.log(library);
  library.pollingInterval = 12000; // frequency provider is polling
  return library;
}
const httpLink = new HttpLink({
  // uri: "http://localhost:5001",
  uri: "https://api.nftrakuichirakuza.io/",
}); 
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
ReactDOM.render(
 
  <Web3ReactProvider getLibrary={getLibrary}>
    <Suspense fallback="...loading">
      <ApolloProvider client={client}>
        <ContextProvider value={500}>
        <ThirdwebProvider activeChain="ethereum" clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </ThirdwebProvider>
        </ContextProvider>
      </ApolloProvider>
    </Suspense>
  </Web3ReactProvider>

  ,
  document.getElementById("root")
);

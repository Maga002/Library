import "./App.css";
import { Navbar } from "./Layouts/NavbarAndFooter/Navbar";
import { Footer } from "./Layouts/NavbarAndFooter/Footer";
import { HomePage } from "./Layouts/HomePage/HomePage";
import SearchBookPage from "./Layouts/SearchBooksPage/SearchBookPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./Layouts/BookCheckoutPage/BookCheckoutPage";
import { oktaConfig } from "./Lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security,LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBookPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
          <Route path='/login/callback' component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};

export default App;

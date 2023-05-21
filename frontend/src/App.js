import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import BusinessPage from "./components/BusinessPage";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/business/:businessId">
            <BusinessPage />
          </Route>

          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}

      <Footer />
    </>
  );
}

export default App;

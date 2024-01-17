import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import { UserProvider } from "./context/UserProvider";
import ComponentWrapper from "./ComponentWrapper";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ComponentWrapper />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;

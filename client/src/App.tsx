import { BrowserRouter } from "react-router-dom";
import { AccessTokenProvider } from "./Contexts/AccessTokenContext";
import Router from "./Components/Routing/Router";

function App() {
  return (
    <BrowserRouter>
      <AccessTokenProvider>
        <Router />
      </AccessTokenProvider>
    </BrowserRouter>
  );
}

export default App;

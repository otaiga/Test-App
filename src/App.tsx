import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

// Wrapped with router component
function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;

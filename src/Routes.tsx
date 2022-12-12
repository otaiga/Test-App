import { Routes as Switch, Route } from "react-router-dom";
import Colors from "./pages/Colors";
import Users from "./pages/Users";

// Routes used for the application (v6 of react-router-dom)
const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Users />} />
      <Route path="/colors" element={<Colors />} />
    </Switch>
  );
};

export default Routes;

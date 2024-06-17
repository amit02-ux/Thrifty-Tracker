import {Routes,Route} from "react-router-dom"
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Loginpage from "./pages/Loginpage";
import ProtectedRoutes from "./components/protectedroute";
import Transaction from "./pages/Transaction";

function App() {
  return (
  <>
<Routes>
  <Route path="/" element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Loginpage/>}/>
  <Route path="/transactions" element={<ProtectedRoutes><Transaction/></ProtectedRoutes>}/>
</Routes>
  
  </>
  );
}

export default App;

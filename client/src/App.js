import {Routes,Route} from "react-router-dom"
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Loginpage from "./pages/Loginpage";

function App() {
  return (
  <>
<Routes>
  <Route path="/" element={<Homepage/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Loginpage/>}/>
</Routes>
  
  </>
  );
}

export default App;

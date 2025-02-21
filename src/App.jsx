import { useContext } from "react";
import AuthContext from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  
  return (
    <>
      <div className="fixed top-0 w-full bg-base-100 shadow-md bg-opacity-10 z-50 backdrop-blur-lg">
        <Navbar />
      </div>
      <div className="min-h-[90vh] mt-16">
        <Outlet />
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Ashraf Azad
          </p>
        </aside>
      </footer>
    </>
  );
}

export default App;

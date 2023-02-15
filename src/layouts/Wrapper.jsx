import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components"

export default function Wrapper() {
  const location = useLocation()
  const showNavBar = location.pathname !== "/" // hides nav bar only at welcome page

  return (
    <div className="bg-white max-w-[428px] mx-auto">
      {showNavBar && <Navbar />}
      <Outlet />
    </div>
  );
}
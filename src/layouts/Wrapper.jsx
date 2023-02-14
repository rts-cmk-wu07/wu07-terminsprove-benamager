import { Outlet } from "react-router-dom";
import { BiCaretUp } from "react-icons/bi"
import { HiMenuAlt3 } from "react-icons/hi"
import { useLocation } from "react-router-dom";

export default function Wrapper() {
  const location = useLocation()
  const showNavBar = location.pathname !== "/" // hides nav bar only at welcome page

  return (
    <div className="bg-white max-w-[428px] mx-auto">
      {showNavBar && <ul className="row-span-1">
        <li><BiCaretUp size="45px" /></li>
        <li><HiMenuAlt3 size="45px" /></li>
      </ul>}
      <Outlet className="row-span-7" />
    </div>
  );
}
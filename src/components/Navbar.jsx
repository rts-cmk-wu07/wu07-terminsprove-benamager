import { useState } from "react";
import { BiCaretUp } from "react-icons/bi"
import { HiMenuAlt3 } from "react-icons/hi"
import { RiCloseFill } from "react-icons/ri"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation() // for getting pathname

  const [showMenu, setShowMenu] = useState(false); // menu on/off state
  function toggleMenu() {
    setShowMenu(prevState => !prevState);
  };

  function closeOnLink() {
    setShowMenu(false)
  }

  function isActiveMenuLink(pathname) {
    // pathname matches return tailwind class
    if (location.pathname === pathname) {
      return "text-primary"
    }
    return false
  }

  return (
    <nav className={`bg-white ${showMenu ? "absolute inset-0 z-30" : null}`}>
      <ul className="flex justify-between pt-7" aria-label="Navigation bar" role="menubar">
        <li className={showMenu ? "opacity-0 pointer-events-none" : null}>
          <BiCaretUp size="30px" className="px-4 py-4 mx-1 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" />
        </li>
        <li>{showMenu === false ?
          <HiMenuAlt3 onClick={toggleMenu} size="30px" className="px-4 py-4 mx-1 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" aria-label="Toggle menu" />
          : <RiCloseFill onClick={toggleMenu} size="30px" className="px-4 py-4 mx-1 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" aria-label="Toggle menu" />}
          {showMenu &&
            <ul onClick={closeOnLink} className="absolute inset-0 flex items-center mt-[10rem] flex-col text-2xl" role="menu" aria-label="Menu for navigation">
              <li className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/home")}`} role="menuitem" to="/home">Home</Link></li>
              <li className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/search")}`} role="menuitem" to="/search">Search</Link></li>
              <li className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/schedule")}`} role="menuitem" to="/schedule">My Schedule</Link></li>
              <li className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/login")}`} role="menuitem" to="/login">Log in</Link></li>
            </ul>}
        </li>
      </ul>
    </nav>
  );
}
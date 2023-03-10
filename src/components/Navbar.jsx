import { useState } from "react";
import { BiCaretUp } from "react-icons/bi"
import { HiMenuAlt3 } from "react-icons/hi"
import { RiCloseFill } from "react-icons/ri"
import { BsCaretLeftFill } from "react-icons/bs"
import { LoginForm } from "./index"
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { setCookie } from "react-use-cookie";

export default function Navbar() {
  const location = useLocation() // for getting pathname
  const navigate = useNavigate()
  const { authState, setAuthState } = useContext(AuthContext)

  const [showMenu, setShowMenu] = useState(false); // menu on/off state
  function toggleMenu() {
    setShowLogin(false)
    setShowMenu(prevState => !prevState);
  };

  const [showLogin, setShowLogin] = useState(false); // login on/off state
  function toggleLogin() {
    setShowLogin(prevState => !prevState);
  };

  function isActiveMenuLink(pathname) {
    // pathname matches return tailwind class
    if (location.pathname === pathname) {
      return "text-primary"
    }
    return false
  }

  function handleLogout() {
    setAuthState(prevState => ({ ...prevState, isAuthenticated: false }))
    setCookie("authCookie", JSON.stringify({ ...authState, isAuthenticated: false }), {
      days: 365,
      sameSite: "lax",
      secure: true,
    });
  }

  return (
    <nav className={`bg-white z-10 ${showMenu ? "absolute inset-0 z-100" : null}`}>
      <ul className="flex justify-between pt-7" aria-label="Navigation bar" role="menubar">
        <li className={showMenu ? "opacity-0 pointer-events-none" : "z-50"}>
          {location.pathname.includes("/class") || location.pathname == "/search" || location.pathname == "/schedule" ? <span onClick={() => navigate("/home")} className="flex items-center text-primary px-4 py-4 mx-1 box-content hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer"><BsCaretLeftFill /><span className="ml-1 -translate-y-1 text-sm">Back</span></span> : <BiCaretUp onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })} size="30px" className="px-4 py-4 mx-1 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" />}
        </li>
        <li className="">{showMenu === false ?
          <HiMenuAlt3 onClick={toggleMenu} size="30px" className="px-4 py-4 mx-1 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" aria-label="Toggle menu" />
          : <RiCloseFill onClick={toggleMenu} size="30px" className="px-4 py-4 mx-1 box-content text-grey hover:bg-grey hover:text-black active:bg-grey active:text-black rounded-xl cursor-pointer" aria-label="Toggle menu" />}
          {showMenu &&
            <ul className="absolute inset-0 flex items-center mt-[10rem] flex-col text-2xl" role="menu" aria-label="Menu for navigation">
              {!showLogin && <>
                <li onClick={toggleMenu} className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/home")}`} role="menuitem" to="/home">Home</Link></li>
                <li onClick={toggleMenu} className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/search")}`} role="menuitem" to="/search">Search</Link></li>
                {authState.isAuthenticated && <li onClick={toggleMenu} className="w-[90%]"><Link className={`block text-center py-4 hover:bg-grey active:bg-grey rounded-xl ${isActiveMenuLink("/schedule")}`} role="menuitem" to="/schedule">My Schedule</Link></li>}
                {!authState.isAuthenticated && <li onClick={toggleLogin} className="w-[90%] block text-center py-4 hover:bg-grey active:bg-grey rounded-xl cursor-pointer">Log in</li>}
              </>
              }
              {authState.isAuthenticated && <li onClick={() => handleLogout()} className="w-[90%] block text-center py-4 hover:bg-grey active:bg-grey rounded-xl cursor-pointer">Log out</li>}
              {showLogin && !authState.isAuthenticated && <li className="w-[90%]" id="loginForm">
                <LoginForm toggleLogin={toggleLogin} toggleMnu={toggleMenu} />
              </li>}
            </ul>
          }
        </li>
      </ul>
    </nav>
  );
}
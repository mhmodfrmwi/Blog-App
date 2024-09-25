import { useEffect, useState } from "react";
import { BookPlus, House, LogIn, Menu, Newspaper, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import logo from "/src/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutUser } from "@/redux/apiCalls/authApiCall";

export default function Navbar() {
  const [state, setState] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const menus = [
    { title: "Home", path: "/", icon: <House /> },
    { title: "Posts", path: "/posts", icon: <Newspaper /> },
  ];

  // Conditionally add 'Create' and 'Admin Dashboard' to the menu if the user is logged in
  if (user) {
    menus.push({ title: "Create", path: "/create-post", icon: <BookPlus /> });
    if (user.isAdmin) {
      menus.push({
        title: "Admin Dashboard",
        path: "/admin-dashboard",
        icon: <UserCog />,
      });
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setState(true);
      } else {
        setState(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();

  return (
    <nav className="bg-cyan-600 w-full border-b min-[820px]:border-0 shadow p-2 text-white">
      <div className="items-center px-4 max-w-screen-xl mx-auto min-[820px]:flex min-[820px]:px-8">
        <div className="flex items-center justify-between py-3 min-[820px]:py-5 min-[820px]:block">
          <Link className="text-3xl font-bold" to={"/"}>
            <img src={logo} className="w-10 h-10" />
          </Link>
          <div className="min-[820px]:hidden">
            <button
              className="outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>

        <div
          className={`flex-1 justify-self-center pb-3 mt-8 min-[820px]:block min-[820px]:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 min-[820px]:flex min-[820px]:space-x-6 min-[820px]:space-y-1 text-l gap-2">
            {menus.map((item, idx) => (
              <Link to={item.path} key={idx}>
                <li className="flex gap-1 items-center hover:text-cyan-800 my-3">
                  {item.icon}
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {state &&
          (user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-4 p-4 rounded-md">
                  <img
                    src={user?.profilePhoto?.url}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-800"
                  />
                  <h1 className="text-lg font-semibold text-white">
                    {user?.userName}
                  </h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to={`profile/${user._id}`}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => dispatch(LogoutUser())}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Link to={"/register"}>
                <Button className="bg-white text-cyan-800 hover:text-white hover:bg-cyan-800 gap-1 px-4 py-2 rounded-md shadow-md transition-colors">
                  <UserPlus />
                  <p>Register</p>
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button className="bg-white text-cyan-800 hover:text-white hover:bg-cyan-800 gap-1 px-4 py-2 rounded-md shadow-md transition-colors">
                  <LogIn />
                  <p>Login</p>
                </Button>
              </Link>
            </div>
          ))}
      </div>
    </nav>
  );
}

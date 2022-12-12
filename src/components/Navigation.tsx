import { NavLink } from "react-router-dom";
import { capitalise } from "../lib/utils";

// Define types for Nav
export type NavType = {
  name: string;
  href: string;
};

// Create Nav array
const navigationMenu: NavType[] = [
  { name: "users", href: "/" },
  {
    name: "colors",
    href: "/colors",
  },
];

// Change link style based on whether active
const isActiveLink = (isActive: boolean) => {
  return isActive
    ? "bg-blue-300 text-white"
    : "text-black hover:bg-blue-700 hover:text-white";
};

const Navigation = () => {
  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigationMenu.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            `flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActiveLink(
              isActive
            )}`
          }
        >
          {capitalise(item.name)}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;

import { UsersIcon, EyeDropperIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { ResourceType } from "../lib/apiClient";
import { capitalise } from "../lib/utils";

// Define types for Nav
export type NavType = {
  name: ResourceType;
  icon: (
    props: React.ComponentProps<"svg"> & { title?: string; titleId?: string }
  ) => JSX.Element;
  href: string;
};

// Create Nav array
const navigationMenu: NavType[] = [
  { name: "users", icon: UsersIcon, href: "/" },
  {
    name: "colors",
    icon: EyeDropperIcon,
    href: "/colors",
  },
];

// Change link style based on whether active
const isActiveLink = (isActive: boolean) => {
  return isActive
    ? "bg-blue-300 text-white"
    : "text-black hover:bg-blue-700 hover:text-white";
};

// Navigation component
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
          <item.icon
            className="mr-3 flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          />
          {capitalise(item.name)}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;

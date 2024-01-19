import { MdDashboardCustomize } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { BsCart3 } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const navItems = [
  { title: "Dashboard", icon: <MdDashboardCustomize className="icon-nav" /> },
  { title: "Overview", icon: <GrOverview className="icon-nav" /> },
  { title: "Products", icon: <BsCart3 className="icon-nav" /> },
  { title: "Settings", icon: <FiSettings className="icon-nav" /> },
  { title: "Log out", icon: <RiLogoutBoxRLine className="icon-nav" /> },
];

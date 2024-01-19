import { HiShoppingBag } from "react-icons/hi2";
import { FaSpellCheck } from "react-icons/fa6";
import { MdOutlineDoNotStep } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

export const statTileItems = [
  {
    title: "Total Sale",
    icon: <HiShoppingBag className="icon-stats sale" />,
    desc: <FaRupeeSign className="icon-stat-rupee" />,
  },
  {
    title: "Number of Items Sold",
    icon: <FaSpellCheck className="icon-stats sold" />,
    desc: "",
  },
  {
    title: "Number of Unsold Items",
    icon: <MdOutlineDoNotStep className="icon-stats unsold" />,
    desc: "",
  },
];

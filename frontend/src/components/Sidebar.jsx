import {
  Store,
  Table2,
  IdCard,
  Box,
  Wrench,
  UserPen,
  Rocket,
} from "lucide-react";
import { SideLinks } from "./SideLinks";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const menuItems = [
  { title: "Charts", icon: Store },
  { title: "Authors", icon: Table2 },
  { title: "Billing", icon: IdCard },
  { title: "Virtual Reality", icon: Box },
  { title: "RTL", icon: Wrench },
];

const menuItemsAccountPages = [
  { title: "Profile", icon: UserPen },
  { title: "Sign In", icon: UserPen },
  { title: "Sign Up", icon: Rocket },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const newPath = pathname.split("/").slice(0, 2).join("/");

  const [selected, setSelected] = useState(newPath);

  return (
    <aside className="min-w-[16.2rem] p-8 pr-2">
      <div className="flex gap-2 items-center ml-4 mt-2">
        <img
          src="https://demos.creative-tim.com/soft-ui-dashboard/assets/img/logo-ct-dark.png"
          alt="logo"
          width={32}
        />
        <span className="font-semibold text-[.9rem]">Atom360 Dashboard</span>
      </div>

      <hr className="border mt-6" />

      <SideLinks
        items={menuItems}
        selected={selected}
        setSelected={setSelected}
      />

      <p className="text-[.8rem] font-bold text-gray-500 mt-4 ml-4">
        ACCOUNT PAGES
      </p>

      <SideLinks
        items={menuItemsAccountPages}
        selected={selected}
        setSelected={setSelected}
      />
    </aside>
  );
};

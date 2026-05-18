import type { ReactNode } from "react";
import { BarChart3, ClipboardList, Home, Settings, ShieldPlus, UserRound, UsersRound } from "lucide-react";
import type { CareerState } from "../../data/types";

type LeftNavRailProps = {
  schoolAbbreviation: string;
  currentRoute: CareerState["route"];
  onRoute: (route: CareerState["route"]) => void;
};

type NavItem = {
  label: string;
  icon: ReactNode;
  route?: CareerState["route"];
};

const primaryNavItems: NavItem[] = [
  { route: "dashboard", label: "Home", icon: <Home size={23} strokeWidth={1.7} /> },
  { route: "roster", label: "Team", icon: <UsersRound size={24} strokeWidth={1.7} /> },
  { route: "player", label: "Profile", icon: <UserRound size={23} strokeWidth={1.7} /> },
];

const futureNavItems: NavItem[] = [
  { label: "Recruiting", icon: <ShieldPlus size={23} strokeWidth={1.6} /> },
  { label: "Scheme", icon: <ClipboardList size={23} strokeWidth={1.6} /> },
  { label: "Stats and News", icon: <BarChart3 size={23} strokeWidth={1.6} /> },
  { label: "Settings", icon: <Settings size={23} strokeWidth={1.6} /> },
];

export function LeftNavRail({ schoolAbbreviation, currentRoute, onRoute }: LeftNavRailProps) {
  return (
    <aside className="side-rail">
      <div className="brand-mark">{schoolAbbreviation}</div>
      <nav>
        {primaryNavItems.map((item) => (
          <button
            key={item.label}
            className={item.route === currentRoute ? "active" : ""}
            type="button"
            onClick={() => item.route && onRoute(item.route)}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
        {futureNavItems.map((item) => (
          <button key={item.label} type="button" disabled aria-label={item.label} title={item.label}>
            {item.icon}
          </button>
        ))}
      </nav>
      <div className="league-mark">CFBL</div>
    </aside>
  );
}

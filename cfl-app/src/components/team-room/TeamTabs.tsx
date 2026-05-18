export const teamRoomTabs = ["Overview", "Depth Chart", "Formation Subs", "NIL/Budget", "Health", "Staff"] as const;

export type TeamRoomTab = (typeof teamRoomTabs)[number];

type TeamTabsProps = {
  activeTab: TeamRoomTab;
  onTab: (tab: TeamRoomTab) => void;
};

export function TeamTabs({ activeTab, onTab }: TeamTabsProps) {
  return (
    <nav className="team-tabs" aria-label="Team room sections">
      {teamRoomTabs.map((tab) => (
        <button key={tab} className={activeTab === tab ? "active" : ""} type="button" onClick={() => onTab(tab)}>
          {tab}
        </button>
      ))}
    </nav>
  );
}

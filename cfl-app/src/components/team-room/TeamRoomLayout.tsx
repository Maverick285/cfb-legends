import type { ReactNode } from "react";

type TeamRoomLayoutProps = {
  dataPanel: ReactNode;
  featurePanel: ReactNode;
};

export function TeamRoomLayout({ dataPanel, featurePanel }: TeamRoomLayoutProps) {
  return (
    <section className="team-room roster-command-screen">
      {dataPanel}
      {featurePanel}
    </section>
  );
}

import { GameShell, type GameShellProps } from "./shell/GameShell";

export function AppShell(props: GameShellProps) {
  return <GameShell {...props} />;
}

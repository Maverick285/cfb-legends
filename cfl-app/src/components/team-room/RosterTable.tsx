import { money, titleCase } from "../../data/format";
import type { CareerState, RosterPlayerRecord, RosterSortKey } from "../../data/types";
import { DataTable, type DataTableColumn } from "../data-table/DataTable";

type RosterTableProps = {
  roster: RosterPlayerRecord[];
  selectedPersonId: string;
  sortKey: RosterSortKey;
  sortDirection: CareerState["sortDirection"];
  watchlistPersonIds: string[];
  onSort: (sortKey: RosterSortKey) => void;
  onSelectPlayer: (personId: string, openProfile?: boolean) => void;
};

const rosterColumns: Array<DataTableColumn<RosterPlayerRecord, RosterSortKey>> = [
  { id: "number", label: "#", sortKey: "rosterSlot", render: (player) => player.athlete.jerseyNumber },
  { id: "position", label: "Pos", sortKey: "primaryPosition", render: (player) => player.athlete.primaryPosition },
  { id: "classYear", label: "Yr", sortKey: "classYear", render: (player) => player.athlete.classYear },
  { id: "nil", label: "NIL", sortKey: "nilValue", render: (player) => money(player.nil?.estimatedNilValue || 0) },
  { id: "morale", label: "Morale", sortKey: "morale", render: (player) => player.ratings.morale },
  { id: "overall", label: "OVR", sortKey: "overall", className: "num", render: (player) => player.ratings.overall },
  { id: "fit", label: "Fit", sortKey: "schemeFit", render: (player) => player.athlete.schemeFit },
  {
    id: "player",
    label: "Player",
    render: (player) => (
      <>
        <strong>{player.person.displayName}</strong>
        <small>{player.athlete.depthChartRole}</small>
      </>
    ),
  },
  { id: "archetype", label: "Archetype", render: (player) => player.traits[0]?.traitName || titleCase(player.athlete.playingTimeExpectation) },
  { id: "speed", label: "SPD", render: (player) => player.ratings.speed },
  { id: "strength", label: "STR", render: (player) => player.ratings.strength },
  { id: "footballIq", label: "FBIQ", render: (player) => player.ratings.footballIQ },
  { id: "hometown", label: "Hometown", render: (player) => `${player.person.hometownCity}, ${player.person.hometownState}` },
  { id: "status", label: "Status", render: (player) => statusText(player) },
];

export function RosterTable({ roster, selectedPersonId, sortKey, sortDirection, watchlistPersonIds, onSort, onSelectPlayer }: RosterTableProps) {
  const columns = rosterColumns.map((column) => {
    if (column.id !== "status") return column;
    return {
      ...column,
      render: (player: RosterPlayerRecord) => statusText(player, watchlistPersonIds.includes(player.person.personId)),
    };
  });

  return (
    <DataTable
      rows={roster}
      columns={columns}
      getRowKey={(player) => player.person.personId}
      selectedRowKey={selectedPersonId}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
      onRowClick={(player) => onSelectPlayer(player.person.personId)}
      onRowDoubleClick={(player) => onSelectPlayer(player.person.personId, true)}
      tableClassName="roster-table roster-command-table"
    />
  );
}

function statusText(player: RosterPlayerRecord, watched = false): string {
  if (player.ratings.injuryResistance < 50) return "Risk";
  if (watched) return "Watch";
  if (player.athlete.captainStatus) return "Captain";
  return titleCase(player.athlete.transferStatus);
}

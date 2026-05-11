import type { NewsImageContext } from "../../domain/assets/newsImage";

// These are placeholder imports. Replace with your actual domain types.
type NewsItem = any;
type GameWorld = any;

export function buildNewsImageContextFromNews(
  news: NewsItem,
  world: GameWorld
): NewsImageContext {
  const event = world.events?.[news.sourceEventId];

  if (!event) {
    throw new Error(`Missing event for news item ${news.id}`);
  }

  switch (event.type) {
    case "game_moment_touchdown": {
      const game = world.games[event.gameId];
      const player = world.players[event.primaryPlayerId];
      const team = world.teams[event.teamId];
      const opponent = world.teams[event.opponentTeamId];

      return {
        eventId: event.id,
        newsId: news.id,
        eventType: "game_winning_touchdown",
        importanceTier: event.importanceTier,
        headline: news.headline,
        summary: news.summary,

        primaryPlayerId: player.id,
        primaryTeamId: team.id,
        opponentTeamId: opponent.id,
        gameId: game.id,
        venueId: game.venueId,

        period: event.payload.period,
        clock: event.payload.clock,
        scoreContext: event.payload.scoreContext,

        weather: {
          condition: game.weather.condition,
          temperatureF: game.weather.temperatureF,
          windMph: game.weather.windMph
        },

        uniform: {
          helmet: team.visual.helmetDescription,
          jersey: game.uniforms[team.id].jersey,
          pants: game.uniforms[team.id].pants,
          accentColors: [
            team.visual.primaryColor,
            team.visual.secondaryColor
          ],
          number: player.jerseyNumber
        },

        allowedFacts: [
          player.displayName,
          team.displayName,
          opponent.displayName,
          game.venueName,
          game.weather.condition,
          String(player.jerseyNumber),
          news.headline
        ],

        forbiddenClaims: [
          "injury",
          "arrest",
          "suspension",
          "NIL amount",
          "brand logo",
          "real broadcaster"
        ]
      };
    }

    case "top_recruit_commitment": {
      const prospect = world.prospects[event.prospectId];
      const team = world.teams[event.teamId];

      return {
        eventId: event.id,
        newsId: news.id,
        eventType: "top_recruit_commitment",
        importanceTier: event.importanceTier,
        headline: news.headline,
        summary: news.summary,
        primaryTeamId: team.id,
        allowedFacts: [
          prospect.displayName,
          team.displayName,
          prospect.position,
          prospect.homeState
        ],
        forbiddenClaims: [
          "NIL amount",
          "injury",
          "arrest",
          "suspension"
        ]
      };
    }

    default:
      return {
        eventId: event.id,
        newsId: news.id,
        eventType: "record_breaking_performance",
        importanceTier: event.importanceTier ?? 1,
        headline: news.headline,
        summary: news.summary,
        primaryTeamId: event.teamId,
        allowedFacts: [news.headline, news.summary],
        forbiddenClaims: [
          "injury",
          "arrest",
          "NIL amount",
          "real logo"
        ]
      };
  }
}

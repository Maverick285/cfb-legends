export type PlayerVisualIdentity = {
  playerId: string;
  visualSeed: number;
  portraitAssetId?: string;

  descriptors: {
    ageBand: string;
    build: string;
    skinToneDescriptor?: string;
    hair?: string;
    facialHair?: string;
    faceShape?: string;
    expressionDefault?: string;
  };

  locked: boolean;
};

export type TeamVisualIdentity = {
  teamId: string;
  schoolId: string;
  primaryColor: string;
  secondaryColor: string;
  helmetDescription: string;
  homeUniformDescription: string;
  awayUniformDescription: string;
  alternateUniformDescriptions: string[];
  logoAssetId?: string;
  allowRealLogoPrivateModeOnly: boolean;
};

export type VenueVisualIdentity = {
  stadiumId: string;
  name: string;
  city: string;
  state: string;
  stadiumType: "college_bowl" | "campus_stadium" | "dome" | "neutral_site" | "small_college";
  capacityBand: string;
  turfDescription: string;
  architectureDescription: string;
  crowdDescription: string;
};

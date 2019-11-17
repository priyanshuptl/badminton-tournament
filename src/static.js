export const UrlStrings = {
  HOME: "/home",
  CONFIGURE: "/configure",
  POOLS: "pools",
  SCHEDULE: "schedule",
  BRACKET: "bracket"
};

export const DefaultValues = {
  PARTICIPANTS_COUNT: 24,
  POOL_COUNT: 4,
  QUALIFIERS_COUNT_PER_POOL: 2,
  LANDING_PAGE_URL: UrlStrings.CONFIGURE,
  TAB: UrlStrings.POOLS
};

export const HeaderData = {
  title: "Badminton Tournament",
  tabs: [
    { label: "Home", path: UrlStrings.HOME },
    { label: "Configure", path: UrlStrings.CONFIGURE, goToPath: "configure" }
  ]
};

export const SubheaderData = {
  tabs: [
    { label: "Pools", path: UrlStrings.POOLS },
    { label: "Schedule", path: UrlStrings.SCHEDULE },
    { label: "Bracket", path: UrlStrings.BRACKET }
  ]
};

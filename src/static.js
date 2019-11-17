export const UrlStrings = {
  HOME: "/home",
  CONFIGURE: "/configure"
};

export const HeaderData = {
  title: "Badminton Tournament",
  tabs: [
    { label: "Home", path: UrlStrings.HOME },
    { label: "Configure", path: UrlStrings.CONFIGURE, goToPath: "configure" }
  ]
};

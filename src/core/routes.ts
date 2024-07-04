const appRoutes = {
  root: "/",
  person(id: string) {
    return `/person/${id}`;
  },
  vehicle(id: string) {
    return `/vehicle/${id}`;
  },
  planet(id: string) {
    return `/planet/${id}`;
  },
  starship(id: string) {
    return `/starship/${id}`;
  },
  species(id: string) {
    return `/species/${id}`;
  },
  film(id: string) {
    return `/film/${id}`;
  },
};

export { appRoutes };

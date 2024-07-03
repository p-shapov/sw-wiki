const appRoutes = {
  root: "/",
  character(id: string) {
    return `/character/${id}`;
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

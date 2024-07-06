const appRoutes = {
  root: "/",
  person(id?: string) {
    if (!id) {
      return "/person/[id]";
    }
    return `/person/${id}`;
  },
  vehicle(id?: string) {
    if (!id) {
      return "/vehicle/[id]";
    }
    return `/vehicle/${id}`;
  },
  planet(id?: string) {
    if (!id) {
      return "/planet/[id]";
    }
    return `/planet/${id}`;
  },
  starship(id?: string) {
    if (!id) {
      return "/starship/[id]";
    }
    return `/starship/${id}`;
  },
  species(id?: string) {
    if (!id) {
      return "/species/[id]";
    }
    return `/species/${id}`;
  },
  film(id?: string) {
    if (!id) {
      return "/film/[id]";
    }
    return `/film/${id}`;
  },
};

export { appRoutes };

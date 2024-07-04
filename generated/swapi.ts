import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Root = z
  .object({
    films: z.string().url(),
    people: z.string().url(),
    planets: z.string().url(),
    species: z.string().url(),
    starships: z.string().url(),
    vehicles: z.string().url(),
  })
  .passthrough();
const Film = z
  .object({
    title: z.string(),
    episode_id: z.number().int(),
    opening_crawl: z.string(),
    director: z.string(),
    producer: z.string(),
    release_date: z.string(),
    species: z.array(z.string()),
    starships: z.array(z.string()),
    vehicles: z.array(z.string()),
    characters: z.array(z.string()),
    planets: z.array(z.string()),
    url: z.string().url(),
    created: z.string().datetime({ offset: true }),
    edited: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Person = z
  .object({
    name: z.string(),
    birth_year: z.string(),
    eye_color: z.string(),
    gender: z.string(),
    hair_color: z.string(),
    height: z.string(),
    mass: z.string(),
    skin_color: z.string(),
    homeworld: z.string().url(),
    films: z.array(z.string()),
    species: z.array(z.string()),
    starships: z.array(z.string()),
    vehicles: z.array(z.string()),
    url: z.string().url(),
    created: z.string().datetime({ offset: true }),
    edited: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Planet = z
  .object({
    name: z.string(),
    diameter: z.string(),
    rotation_period: z.string(),
    orbital_period: z.string(),
    gravity: z.string(),
    population: z.string(),
    climate: z.string(),
    terrain: z.string(),
    surface_water: z.string(),
    residents: z.array(z.string()),
    films: z.array(z.string()),
    url: z.string().url(),
    created: z.string().datetime({ offset: true }),
    edited: z.string().datetime({ offset: true }),
  })
  .passthrough();
const species_Species = z
  .object({
    name: z.string(),
    classification: z.string(),
    designation: z.string(),
    average_height: z.string(),
    average_lifespan: z.string(),
    eye_colors: z.string(),
    hair_colors: z.string(),
    skin_colors: z.string(),
    language: z.string(),
    homeworld: z.string().url(),
    people: z.array(z.string()),
    films: z.array(z.string()),
    url: z.string().url(),
    created: z.string().datetime({ offset: true }),
    edited: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Starship = z
  .object({
    name: z.string(),
    model: z.string(),
    starship_class: z.string(),
    manufacturer: z.string(),
    cost_in_credits: z.string(),
    length: z.string(),
    crew: z.string(),
    passengers: z.string(),
    max_atmosphering_speed: z.string(),
    hyperdrive_rating: z.string(),
    MGLT: z.string(),
    cargo_capacity: z.string(),
    consumables: z.string(),
    films: z.array(z.string()),
    pilots: z.array(z.string()),
    url: z.string().url(),
    created: z.string().datetime({ offset: true }),
    edited: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Vehicle = z
  .object({
    name: z.string(),
    model: z.string(),
    vehicle_class: z.string(),
    manufacturer: z.string(),
    length: z.string(),
    cost_in_credits: z.string(),
    crew: z.string(),
    passengers: z.string(),
    max_atmosphering_speed: z.string(),
    cargo_capacity: z.string(),
    consumables: z.string(),
    films: z.array(z.string()),
    pilots: z.array(z.string()),
    url: z.string().url(),
    created: z.string().datetime({ offset: true }),
    edited: z.string().datetime({ offset: true }),
  })
  .passthrough();

export const schemas = {
  Root,
  Film,
  Person,
  Planet,
  species_Species,
  Starship,
  Vehicle,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "GetRoot",
    requestFormat: "json",
    response: Root,
  },
  {
    method: "get",
    path: "/films",
    alias: "ListFilms",
    description: `Get all the films resources.`,
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        count: z.number().int(),
        next: z.union([z.null(), z.string()]),
        previous: z.union([z.null(), z.string()]),
        results: z.array(Film),
      })
      .partial()
      .passthrough(),
  },
  {
    method: "get",
    path: "/films/:filmId",
    alias: "GetFilm",
    description: `Get a specific film resource.`,
    requestFormat: "json",
    parameters: [
      {
        name: "filmId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Film,
  },
  {
    method: "get",
    path: "/people",
    alias: "ListPeople",
    description: `Get all the people resources.`,
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        count: z.number().int(),
        next: z.union([z.null(), z.string()]),
        previous: z.union([z.null(), z.string()]),
        results: z.array(Person),
      })
      .passthrough(),
  },
  {
    method: "get",
    path: "/people/:personId",
    alias: "GetPerson",
    description: `Get a specific people resource.`,
    requestFormat: "json",
    parameters: [
      {
        name: "personId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Person,
  },
  {
    method: "get",
    path: "/planets",
    alias: "ListPlanets",
    description: `Get all the planet resources.`,
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        count: z.number().int(),
        next: z.union([z.null(), z.string()]),
        previous: z.union([z.null(), z.string()]),
        results: z.array(Planet),
      })
      .passthrough(),
  },
  {
    method: "get",
    path: "/planets/:planetId",
    alias: "GetPlanet",
    description: `Get a specific planet resource.`,
    requestFormat: "json",
    parameters: [
      {
        name: "planetId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Planet,
  },
  {
    method: "get",
    path: "/species",
    alias: "ListSpecies",
    description: `Get all the species resources.`,
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        count: z.number().int(),
        next: z.union([z.null(), z.string()]),
        previous: z.union([z.null(), z.string()]),
        results: z.array(species_Species),
      })
      .passthrough(),
  },
  {
    method: "get",
    path: "/species/:speciesId",
    alias: "GetSpecies",
    description: `Get a specific species resource.`,
    requestFormat: "json",
    parameters: [
      {
        name: "speciesId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: species_Species,
  },
  {
    method: "get",
    path: "/starships",
    alias: "ListStarships",
    description: `Get all the starship resources.`,
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        count: z.number().int(),
        next: z.union([z.null(), z.string()]),
        previous: z.union([z.null(), z.string()]),
        results: z.array(Starship),
      })
      .passthrough(),
  },
  {
    method: "get",
    path: "/starships/:starshipId",
    alias: "GetStarship",
    description: `Get a specific starship resource.`,
    requestFormat: "json",
    parameters: [
      {
        name: "starshipId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Starship,
  },
  {
    method: "get",
    path: "/vehicles",
    alias: "ListVehicles",
    description: `Get all the vehicle resources.`,
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        count: z.number().int(),
        next: z.union([z.null(), z.string()]),
        previous: z.union([z.null(), z.string()]),
        results: z.array(Vehicle),
      })
      .passthrough(),
  },
  {
    method: "get",
    path: "/vehicles/:vehicleId",
    alias: "GetVehicle",
    description: `Get a specific vehicle resource.`,
    requestFormat: "json",
    parameters: [
      {
        name: "vehicleId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Vehicle,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}

"use client";

import React from "react";
import { z } from "zod";

import { InfoCard } from "@sw-wiki/components/info-card/component";
import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
import { usePersonQuery } from "@sw-wiki/shared/queries/usePersonQuery";
import { mapQueryHook } from "@sw-wiki/shared/utils/query";

const schema = z.object({
  name: z.string().min(1),
  birth_year: z.string().min(1),
  eye_color: z.string().min(1),
  skin_color: z.string().min(1),
  gender: z.string().min(1),
  hair_color: z.string().min(1),
  height: z.string().min(1),
  mass: z.string().min(1),
  bio: z.string().min(1),
});

const infoNodes = [
  {
    type: "info" as const,
    title: "Personal Info",
    children: [
      {
        type: "info-paragraph" as const,
        title: "Bio",
        children: "bio" as const,
      },
    ],
  },
];

const attributesNodes = [
  {
    type: "attributes" as const,
    title: "Attributes",
    children: [
      {
        type: "attribute" as const,
        title: "Birth Year",
        children: "birth_year" as const,
      },
      {
        type: "attribute" as const,
        title: "Eye Color",
        children: "eye_color" as const,
      },
      {
        type: "attribute" as const,
        title: "Skin Color",
        children: "skin_color" as const,
      },
      {
        type: "attribute" as const,
        title: "Gender",
        children: "gender" as const,
      },
      {
        type: "attribute" as const,
        title: "Hair Color",
        children: "hair_color" as const,
      },
      {
        type: "attribute" as const,
        title: "Height",
        children: "height" as const,
      },
      {
        type: "attribute" as const,
        title: "Mass",
        children: "mass" as const,
      },
    ],
  },
];

const usePersonCardQuery = mapQueryHook(usePersonQuery, (data) => ({
  name: data.name,
  birth_year: data.birth_year,
  eye_color: data.eye_color,
  skin_color: data.skin_color,
  gender: data.gender,
  hair_color: data.hair_color,
  height: data.height,
  mass: data.mass,
  bio: data.bio,
}));

type PersonCardProps = {
  id: string;
};

/**
 * Renders a person card component.
 *
 * @param {string} id - The unique ID of the person card query.
 */

const PersonCard: React.FC<PersonCardProps> = clientOnly(({ id }) => {
  return (
    <InfoCard
      id={id}
      name="person-card"
      schema={schema}
      infoNodes={infoNodes}
      attributesNodes={attributesNodes}
      useInfoQuery={usePersonCardQuery}
    />
  );
});

export { PersonCard };

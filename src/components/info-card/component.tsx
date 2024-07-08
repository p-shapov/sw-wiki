// TODO - Implement logic for non string fields

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import type { Path } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { QueryHook } from "react-query-kit";
import type { z } from "zod";

import type { CardQueryVariables } from "@sw-wiki/shared/types";
import { Button } from "@sw-wiki/shared/ui/button/component";
import { Form, FormField, FormItem } from "@sw-wiki/shared/ui/form/component";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyParagraph,
  TypographyUList,
} from "@sw-wiki/shared/ui/typography/component";

type NodeType = "attributes" | "attribute" | "info" | "info-paragraph";

type Node<
  TData extends Record<TField, string>,
  TField extends string,
  TType extends NodeType,
> = {
  type: TType;
  title: string;
  children: TType extends "attributes"
    ? Node<TData, TField, "attribute">[]
    : TType extends "info"
      ? Node<TData, TField, "info-paragraph">[]
      : TField;
};

type InfoCardAttributeProps = {
  name: string;
  title: string;
  value: string;
  isEditing: boolean;
  onValueChange: (value: string) => void;
};

const InfoCardAttribute = React.forwardRef<
  HTMLInputElement,
  InfoCardAttributeProps
>(({ name, title, value, isEditing, onValueChange }, ref) => {
  return (
    <li>
      <TypographyParagraph className="flex items-baseline gap-x-4">
        <strong>{title}:</strong>{" "}
        {isEditing ? (
          <input
            ref={ref}
            type="text"
            name={name}
            value={value}
            className="bg-popover border rounded-md px-3 py-0 text-inherit/7 font-italic focus:outline-none focus:ring-offset-2 focus:ring-ring"
            onChange={(e) => onValueChange(e.target.value)}
            data-testid={`edit:${name}`}
          />
        ) : (
          <span data-testid={`data:{name}`}>{value || "n/a"}</span>
        )}
      </TypographyParagraph>
    </li>
  );
});

type InfoCardInfoParagraphProps = {
  name: string;
  title: string;
  value: string;
  isEditing: boolean;
  onValueChange: (value: string) => void;
};

const InfoCardInfoParagraph = React.forwardRef<
  HTMLTextAreaElement,
  InfoCardInfoParagraphProps
>(({ name, title, value, isEditing, onValueChange }, ref) => {
  return (
    <div>
      <TypographyH3>{title}</TypographyH3>
      <TypographyParagraph className="flex items-baseline gap-x-4">
        {isEditing ? (
          <textarea
            ref={ref}
            name={name}
            value={value}
            className="bg-popover px-3 py-2 text-inherit/7 w-full border rounded-md h-[18.25rem] min-h-max font-italic focus:outline-none focus:ring-offset-2 focus:ring-ring"
            onChange={(e) => onValueChange(e.target.value)}
            data-testid={`edit:${name}`}
          />
        ) : (
          <span data-testid={`data:${name}`}>{value || "n/a"}</span>
        )}
      </TypographyParagraph>
    </div>
  );
});

type InfoCardProps<
  TData extends Record<TField | "name", string>,
  TField extends string,
> = {
  id: string;
  name: string;
  attributesNodes: Node<TData, TField, "attributes">[];
  infoNodes: Node<TData, TField, "info">[];
  schema: z.ZodType<TData>;
  useInfoQuery: QueryHook<TData, CardQueryVariables>;
};

/**
 * Renders an information card component.
 *
 * @template TData - The type of data for the information card. There must be a field named 'name'.
 * @template TField - The type of fields for the information card.
 *
 * @param {string} id - The unique ID of the information card query.
 * @param {string} name - The unique name of the information card storage.
 * @param {Nodes<TData>} nodes - The nodes containing the information card data.
 * @param {z.ZodType<TData>} schema - The schema for validating the information card data.
 * @param {QueryHook<TData, CardQueryVariables>} useInfoQuery - The query hook for fetching the information card data.
 */

const InfoCard = <
  TData extends Record<TField | "name", string>,
  TField extends string,
>({
  id,
  name,
  infoNodes,
  attributesNodes,
  schema,
  useInfoQuery,
}: InfoCardProps<TData, TField>): React.ReactNode => {
  const form = useForm<TData>({
    resolver: zodResolver(schema),
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [persistedJson, setPersistedJson] = useLocalStorage<TData | null>(
    name +
      "/" +
      id.toString() +
      `/v${process.env.NEXT_PUBLIC_INFO_CARD_STORAGE_VERSION}`,
    null,
  );
  const persisted: TData | null = React.useMemo(() => {
    return persistedJson ? schema.safeParse(persistedJson).data ?? null : null;
  }, [schema, persistedJson]);
  const info = useInfoQuery({
    variables: { id },
    enabled: !persisted,
  });
  const data = persisted ?? info.data;
  React.useEffect(() => {
    if (data && !isEditing) {
      form.reset(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isEditing]);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    form.reset(data);
    setIsEditing(false);
  };
  const handleSave = form.handleSubmit((values) => {
    // notice: persisting both persisted and form data because card not always contain all fields
    setPersistedJson({ ...data, ...values });
    setIsEditing(false);
  });
  if (!data) {
    return <div data-testid="loading-state">Loading...</div>;
  }
  return (
    <Form {...form}>
      <form className="grid gap-y-10" onSubmit={handleSave} data-testid="form">
        <div className="flex items-center justify-between gap-x-8">
          <TypographyH1>{data.name}</TypographyH1>
          <div className="flex gap-x-4">
            {isEditing ? (
              <div className="contents">
                <Button type="submit" data-testid="save">
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="ghost"
                  data-testid="cancel"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={handleEdit} data-testid="edit">
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-x-10 w-full" onSubmit={handleSave}>
          <div className="flex-3 grid gap-y-10 h-max">
            {infoNodes.map((node) => (
              <div key={node.title} className="grid gap-y-8">
                <TypographyH2>{node.title}</TypographyH2>
                {node.children.map((child) => (
                  <FormItem key={child.children}>
                    <FormField
                      // notice: casting to Path<TData> due to name is always equal to TData keys
                      name={child.children as unknown as Path<TData>}
                      control={form.control}
                      render={({ field }) => (
                        <InfoCardInfoParagraph
                          ref={field.ref}
                          name={child.children}
                          key={child.title}
                          title={child.title}
                          // notice: casting to string due to all fields are strings
                          value={field.value as string}
                          isEditing={isEditing}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </FormItem>
                ))}
              </div>
            ))}
          </div>
          <div className="flex-2 flex-col gap-y-8 h-max">
            {attributesNodes.map((node) => (
              <div key={node.title}>
                <TypographyH3 className="pl-6">{node.title}</TypographyH3>
                <TypographyUList className="grid gap-y-4">
                  {node.children.map((child) => (
                    <FormItem key={child.children}>
                      <FormField
                        // notice: casting to Path<TData> due to name is always equal to TData keys
                        name={child.children as unknown as Path<TData>}
                        control={form.control}
                        render={({ field }) => (
                          <InfoCardAttribute
                            ref={field.ref}
                            name={child.children}
                            key={child.title}
                            title={child.title}
                            // notice: casting to string due to all fields are strings
                            value={field.value as string}
                            isEditing={isEditing}
                            onValueChange={field.onChange}
                          />
                        )}
                      />
                    </FormItem>
                  ))}
                </TypographyUList>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
};

export { InfoCard };

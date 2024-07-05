"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
import { Button } from "@sw-wiki/shared/ui/button/component";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@sw-wiki/shared/ui/form/component";
import {
  TypographyH1,
  TypographyParagraph,
  TypographyUList,
} from "@sw-wiki/shared/ui/typography/component";
import { cn } from "@sw-wiki/shared/utils/common";

import { usePersonData } from "./model";

type PersonCardProps = {
  className?: string;
  personId: number;
};

type PersonCardItemProps = {
  label: string;
  value: string;
  isEditing: boolean;
  onValueChange: (value: string) => void;
};

type PersonCardBioItemProps = {
  value: string;
  isEditing: boolean;
  onValueChange: (value: string) => void;
};

const schema = z.object({
  name: z.string().min(1),
  birth_year: z.string().min(1),
  eye_color: z.string().min(1),
  skin_color: z.string().min(1),
  gender: z.string().min(1),
  hair_color: z.string().min(1),
  height: z.string().min(1),
  mass: z.string().min(1),
  bio: z.string(),
});

const PersonCardBioItem = forwardRef<
  HTMLTextAreaElement,
  PersonCardBioItemProps
>(({ value, isEditing, onValueChange }, ref) => {
  return (
    <TypographyParagraph className="flex items-baseline gap-x-4">
      <strong>Bio:</strong>{" "}
      {isEditing ? (
        <textarea
          ref={ref}
          value={value}
          className="bg-accent px-3 py-0 text-inherit/7 w-full min-h-[25rem] font-italic"
          onChange={(e) => onValueChange(e.target.value)}
        />
      ) : (
        <span>{value || "n/a"}</span>
      )}
    </TypographyParagraph>
  );
});

const PersonCardItem = forwardRef<HTMLInputElement, PersonCardItemProps>(
  ({ label, value, isEditing, onValueChange }, ref) => {
    return (
      <li>
        <TypographyParagraph className="flex items-baseline gap-x-4">
          <strong>{label}:</strong>{" "}
          {isEditing ? (
            <input
              ref={ref}
              type="text"
              value={value}
              className="bg-accent px-3 py-0 text-inherit/7 font-italic"
              onChange={(e) => onValueChange(e.target.value)}
            />
          ) : (
            <span>{value || "n/a"}</span>
          )}
        </TypographyParagraph>
      </li>
    );
  },
);

const PersonCard: React.FC<PersonCardProps> = clientOnly(
  ({ className, personId }) => {
    const form = useForm({
      defaultValues: {
        name: "",
        birth_year: "",
        eye_color: "",
        skin_color: "",
        bio: "",
        gender: "",
        hair_color: "",
        height: "",
        mass: "",
      },
      resolver: zodResolver(schema),
    });
    const person = usePersonData({ variables: { personId } });
    React.useEffect(() => {
      if (person.data) {
        form.reset(person.data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [person.isHydrated]);
    const [isEditing, setIsEditing] = React.useState(false);
    const handleStartEdit = () => {
      setIsEditing(true);
    };
    const handleCancelEdit = () => {
      setIsEditing(false);
      if (person.data) {
        form.reset(person.data);
      }
    };
    const handleSave = () => {
      setIsEditing(false);
      if (person.data) {
        person.setPersisted(
          JSON.stringify({ ...person.data, ...form.getValues() }),
        );
      }
    };
    if (!person.data) {
      return <div>Loading...</div>;
    }
    return (
      <Form {...form}>
        <form
          className={cn(
            "grid gap-x-10 gap-y-10 grid-cols-[max-content_1fr] grid-rows-[max-content_max-content]",
            className,
          )}
          onSubmit={form.handleSubmit(handleSave)}
        >
          <FormItem className="row-start-2 pt-6 w-[30rem]">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <PersonCardBioItem
                  ref={field.ref}
                  value={field.value}
                  isEditing={isEditing}
                  onValueChange={field.onChange}
                />
              )}
            />
            <FormMessage />
          </FormItem>
          <div className="grid grid-rows-[subgrid] row-start-1 row-end-3">
            <TypographyH1 className="flex items-center gap-x-10">
              <span>{person.data.name}</span>
              <span className="flex gap-x-4">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </>
                ) : (
                  <Button type="button" onClick={handleStartEdit}>
                    Edit
                  </Button>
                )}
              </span>
            </TypographyH1>
            <TypographyUList className="grid gap-y-4">
              <FormItem>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Name"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="birth_year"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Birth year"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="eye_color"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Eye color"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="skin_color"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Skin color"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Gender"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="hair_color"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Hair color"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Height"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormField
                  control={form.control}
                  name="mass"
                  render={({ field }) => (
                    <PersonCardItem
                      ref={field.ref}
                      label="Mass"
                      value={field.value}
                      isEditing={isEditing}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
            </TypographyUList>
          </div>
        </form>
      </Form>
    );
  },
);

export { PersonCard };

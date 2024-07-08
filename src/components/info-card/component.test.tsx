import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { z } from "zod";

import { InfoCard } from "./component";

const renderComponent = (props: React.ComponentProps<typeof InfoCard>) => {
  return render(<InfoCard {...props} />);
};

describe("InfoCard", () => {
  const mockUseInfoQuery = jest.fn();
  const mockSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    attr_1: z.string(),
    attr_2: z.string(),
  });

  beforeEach(() => {
    localStorage.clear();
  });

  const mockAttributesNodes = [
    {
      type: "attributes" as const,
      title: "Attributes",
      children: [
        {
          type: "attribute" as const,
          title: "Attribute 1",
          children: "attr_1",
        },
        {
          type: "attribute" as const,
          title: "Attribute 2",
          children: "attr_2",
        },
      ],
    },
  ];

  const mockInfoNodes = [
    {
      type: "info" as const,
      title: "Info",
      children: [
        {
          type: "info-paragraph" as const,
          title: "Description",
          children: "description",
        },
      ],
    },
  ];

  it("should render loading state initially", () => {
    mockUseInfoQuery.mockReturnValue({ data: null });
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("should render card data", () => {
    mockUseInfoQuery.mockReturnValue({
      data: {
        id: "1",
        name: "Test Name",
        description: "Test Description",
        attr_1: "Test Attribute 1",
        attr_2: "Test Attribute 2",
      },
    });
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Attributes")).toBeInTheDocument();
    expect(screen.getByText("Attribute 1:")).toBeInTheDocument();
    expect(screen.getByText("Test Attribute 1")).toBeInTheDocument();
    expect(screen.getByText("Attribute 2:")).toBeInTheDocument();
    expect(screen.getByText("Test Attribute 2")).toBeInTheDocument();
  });

  it("should enable edit mode", () => {
    mockUseInfoQuery.mockReturnValue({
      data: {
        id: "1",
        name: "Test Name",
        description: "Test Description",
        attr_1: "Test Attribute 1",
        attr_2: "Test Attribute 2",
      },
    });
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    fireEvent.click(screen.getByTestId("edit"));
    expect(screen.getByTestId("edit:description")).toBeInTheDocument();
    expect(screen.getByTestId("edit:attr_1")).toBeInTheDocument();
    expect(screen.getByTestId("edit:attr_2")).toBeInTheDocument();
  });

  it("should save changes and exit edit mode", async () => {
    mockUseInfoQuery.mockReturnValue({
      data: {
        id: "1",
        name: "Test Name",
        description: "Test Description",
        attr_1: "Test Attribute 1",
        attr_2: "Test Attribute 2",
      },
    });
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    fireEvent.click(screen.getByTestId("edit"));
    fireEvent.change(screen.getByTestId("edit:description"), {
      target: { value: "Test Description Updated" },
    });
    fireEvent.change(screen.getByTestId("edit:attr_1"), {
      target: { value: "Test Attribute 1 Updated" },
    });
    fireEvent.change(screen.getByTestId("edit:attr_2"), {
      target: { value: "Test Attribute 2 Updated" },
    });
    fireEvent.click(screen.getByTestId("save"));
    await screen.findByText("Test Description Updated");
    await screen.findByText("Test Attribute 1 Updated");
    await screen.findByText("Test Attribute 2 Updated");
    await waitFor(() =>
      expect(screen.queryByTestId("edit:description")).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.queryByTestId("edit:attr_1")).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.queryByTestId("edit:attr_2")).not.toBeInTheDocument(),
    );
  });

  it("should cancel changes and exit edit mode", async () => {
    mockUseInfoQuery.mockReturnValue({
      data: {
        id: "1",
        name: "Test Name",
        description: "Test Description",
        attr_1: "Test Attribute 1",
        attr_2: "Test Attribute 2",
      },
    });
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    fireEvent.click(screen.getByTestId("edit"));
    fireEvent.change(screen.getByTestId("edit:description"), {
      target: { value: "Test Description Updated" },
    });
    fireEvent.change(screen.getByTestId("edit:attr_1"), {
      target: { value: "Test Attribute 1 Updated" },
    });
    fireEvent.change(screen.getByTestId("edit:attr_2"), {
      target: { value: "Test Attribute 2 Updated" },
    });
    fireEvent.click(screen.getByTestId("cancel"));
    await screen.findByText("Test Description");
    await screen.findByText("Test Attribute 1");
    await screen.findByText("Test Attribute 2");
    await waitFor(() =>
      expect(screen.queryByTestId("edit:description")).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.queryByTestId("edit:attr_1")).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.queryByTestId("edit:attr_2")).not.toBeInTheDocument(),
    );
  });

  it("should persist changes to local storage", async () => {
    mockUseInfoQuery.mockReturnValue({
      data: {
        id: "1",
        name: "Test Name",
        description: "Test Description",
        attr_1: "Test Attribute 1",
        attr_2: "Test Attribute 2",
      },
    });
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    fireEvent.click(screen.getByTestId("edit"));
    fireEvent.change(screen.getByTestId("edit:description"), {
      target: { value: "Test Description Updated" },
    });
    fireEvent.change(screen.getByTestId("edit:attr_1"), {
      target: { value: "Test Attribute 1 Updated" },
    });
    fireEvent.change(screen.getByTestId("edit:attr_2"), {
      target: { value: "Test Attribute 2 Updated" },
    });
    fireEvent.click(screen.getByTestId("save"));
    await waitFor(() => {
      const persistedData = JSON.parse(
        localStorage.getItem(
          `test/1/v${process.env.NEXT_PUBLIC_INFO_CARD_STORAGE_VERSION}`,
        ) ?? "{}",
      );
      expect(persistedData).toEqual({
        id: "1",
        name: "Test Name",
        description: "Test Description Updated",
        attr_1: "Test Attribute 1 Updated",
        attr_2: "Test Attribute 2 Updated",
      });
    });
  });

  it("should load persisted data from local storage", async () => {
    mockUseInfoQuery.mockReturnValue({
      data: {
        id: "1",
        name: "Test Name",
        description: "Test Description",
        attr_1: "Test Attribute 1",
        attr_2: "Test Attribute 2",
      },
    });
    localStorage.setItem(
      `test/1/v1`,
      JSON.stringify({
        id: "1",
        name: "Persisted Name",
        description: "Persisted Description",
        attr_1: "Persisted Attribute 1",
        attr_2: "Persisted Attribute 2",
      }),
    );
    renderComponent({
      id: "1",
      name: "test",
      attributesNodes: mockAttributesNodes,
      infoNodes: mockInfoNodes,
      schema: mockSchema,
      // @ts-expect-error - there is mock implementation
      useInfoQuery: mockUseInfoQuery,
    });
    setTimeout(() => {
      expect(screen.getByText("Persisted Description")).toBeInTheDocument();
      expect(screen.getByText("Persisted Attribute 1")).toBeInTheDocument();
      expect(screen.getByText("Persisted Attribute 2")).toBeInTheDocument();
    });
  });
});

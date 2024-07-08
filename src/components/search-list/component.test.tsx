import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import { SearchList } from "./component";

type RenderComponentProps = React.ComponentProps<typeof SearchList>;

const renderComponent = (props: RenderComponentProps) => {
  return render(<SearchList {...props} />);
};

beforeEach(() => {
  localStorage.clear();
});

describe("SearchList", () => {
  const mockUseListQuery = jest.fn();
  const mockOnQueryChange = jest.fn();
  const mockSelect: RenderComponentProps["select"] = (item) => item.id;

  it("should render search input", () => {
    mockUseListQuery.mockReturnValue({ data: { results: [] } });
    renderComponent({
      id: "1",
      query: "",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    expect(screen.getByTestId("open-dialog")).toBeInTheDocument();
  });

  it("should pass query to search input", () => {
    mockUseListQuery.mockReturnValue({ data: { results: [] } });
    renderComponent({
      id: "1",
      query: "test",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    expect(screen.getByTestId("input")).toHaveValue("test");
  });

  it("should open search dialog on trigger click", () => {
    mockUseListQuery.mockReturnValue({ data: { results: [] } });
    renderComponent({
      id: "1",
      query: "",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });

  it("should call onQueryChange on form submit", async () => {
    mockUseListQuery.mockReturnValue({ data: { results: [] } });
    renderComponent({
      id: "1",
      query: "",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "test" },
    });
    fireEvent.keyUp(screen.getByTestId("input"), { key: "Enter" });
    expect(mockOnQueryChange).toHaveBeenCalledWith("test");
  });

  it("should display suggested queries and handle shortcut", () => {
    const suggestedQueries = ["1", "2", "3", "4"];
    mockUseListQuery.mockReturnValue({
      data: suggestedQueries,
    });
    renderComponent({
      id: "1",
      query: "",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    for (const query of suggestedQueries) {
      expect(screen.getByTestId(`suggestion:${query}`)).toBeInTheDocument();
    }
    fireEvent.click(screen.getByTestId(`suggestion:3`));
    expect(mockOnQueryChange).toHaveBeenCalledWith("3");
  });

  it("should display recent queries and handle shortcut", async () => {
    mockUseListQuery.mockReturnValue({ data: { results: [] } });
    const recentQueries = ["1", "2", "3", "4"];
    localStorage.setItem("search-list/recent/1", JSON.stringify(recentQueries));
    renderComponent({
      id: "1",
      query: "",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    for (const query of recentQueries) {
      expect(screen.getByTestId(`recent:${query}`)).toBeInTheDocument();
    }
    fireEvent.click(screen.getByTestId(`recent:3`));
    expect(mockOnQueryChange).toHaveBeenCalledWith("3");
  });

  it("should render empty message when no results found", () => {
    mockUseListQuery.mockReturnValue({ data: { results: [] } });
    renderComponent({
      query: "nonexistent",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
  });

  it("should persist recent queries in local storage", async () => {
    renderComponent({
      id: "1",
      query: "",
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      select: mockSelect,
      onQueryChange: mockOnQueryChange,
    });
    fireEvent.click(screen.getByTestId("open-dialog"));
    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "test" },
    });
    fireEvent.keyUp(screen.getByTestId("input"), { key: "Enter" });
    expect(
      JSON.parse(localStorage.getItem("search-list/recent/1") ?? "[]"),
    ).toEqual(["test"]);
  });
});

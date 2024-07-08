import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import { PaginatedList } from "./component";

type RenderComponentProps = React.ComponentProps<typeof PaginatedList>;

const renderComponent = (props: RenderComponentProps) => {
  return render(<PaginatedList {...props} />);
};

describe("PaginatedList", () => {
  const mockUseListQuery = jest.fn();
  const mockOnPageChange = jest.fn();
  const mockRender: RenderComponentProps["render"] = (item) => (
    <div>Item {item.id}</div>
  );

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render loading state initially", async () => {
    mockUseListQuery.mockReturnValue({
      data: undefined,
    });
    renderComponent({
      page: 1,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "",
      render: mockRender,
      onPageChange: mockOnPageChange,
    });
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("should render empty message when no results", async () => {
    mockUseListQuery.mockReturnValue({
      data: {
        results: [],
        count: 0,
        pages: 0,
        next: null,
        previous: null,
      },
    });
    renderComponent({
      page: 1,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "",
      render: mockRender,
      onPageChange: mockOnPageChange,
      emptyMessage: "No data available",
    });
    expect(screen.getByTestId("empty-state")).toHaveTextContent(
      "No data available",
    );
  });

  it("should render list items", async () => {
    mockUseListQuery.mockReturnValue({
      data: {
        results: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
        ],
        count: 5,
        pages: 5,
        next: 2,
        previous: null,
      },
    });
    renderComponent({
      page: 1,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "",
      render: mockRender,
      onPageChange: mockOnPageChange,
    });
    screen.getByTestId("item:1");
    screen.getByTestId("item:2");
    screen.getByTestId("item:3");
    screen.getByTestId("item:4");
    screen.getByTestId("item:5");
    expect(mockUseListQuery).toHaveBeenCalledWith({
      variables: {
        search: "",
        page: 1,
      },
      placeholderData: expect.any(Function),
      retry: false,
    });
  });

  it("should handle page changes", async () => {
    mockUseListQuery.mockReturnValue({
      data: {
        results: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
        ],
        count: 5,
        pages: 5,
        next: 2,
        previous: null,
      },
    });
    renderComponent({
      page: 1,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "",
      render: mockRender,
      onPageChange: mockOnPageChange,
    });
    for (let page = 1; page <= 5; page++) {
      fireEvent.click(screen.getByTestId(`page:${page}`));
      expect(mockOnPageChange).toHaveBeenCalledWith(page);
    }
  });

  it("should handle previous page", async () => {
    mockUseListQuery.mockReturnValue({
      data: {
        results: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
        ],
        count: 5,
        pages: 5,
        next: null,
        previous: 4,
      },
    });
    renderComponent({
      page: 5,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "",
      render: mockRender,
      onPageChange: mockOnPageChange,
    });
    fireEvent.click(screen.getByTestId("previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("should handle next page", async () => {
    mockUseListQuery.mockReturnValue({
      data: {
        results: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
        ],
        count: 5,
        pages: 5,
        next: 2,
        previous: null,
      },
    });
    renderComponent({
      page: 1,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "",
      render: mockRender,
      onPageChange: mockOnPageChange,
    });
    fireEvent.click(screen.getByTestId("next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("should apply search query", () => {
    mockUseListQuery.mockReturnValue({
      data: {
        results: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
        ],
        count: 5,
        pages: 5,
        next: 2,
        previous: null,
      },
    });
    renderComponent({
      page: 1,
      // @ts-expect-error - there is mock implementation
      useListQuery: mockUseListQuery,
      searchQuery: "search",
      render: mockRender,
      onPageChange: mockOnPageChange,
    });
    expect(mockUseListQuery).toHaveBeenCalledWith({
      variables: {
        search: "search",
        page: 1,
      },
      placeholderData: expect.any(Function),
      retry: false,
    });
  });
});

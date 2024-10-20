"use client";

import { useCallback } from "react";
import { SortOrder } from "@/app/lib/types.d";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";
import { Select } from "@/app/components/client/dropdowns";
import { BooksPagination } from "./BooksPagination";

interface BooksFiltersProps {
  setSortOrder: (arg: SortOrder) => void;
  setPageSize: (arg: number) => void;
  pageSize: number;
  sortOrder: SortOrder;
  searchInput: string;
  setSearchInput: (arg: string) => void;
  debouncedSetSearchInput: (arg: string) => void;
  handleNextPage: () => void;
  handleLastPage: () => void;
  disableNextPage: boolean;
  disableLastPage: boolean;
}

const SORT_OPTIONS = [
  {
    value: SortOrder.titleAsc,
    label: "Title A->Z",
  },
  {
    value: SortOrder.titleDesc,
    label: "Title Z->A",
  },
  {
    value: SortOrder.authorAsc,
    label: "Author A->Z",
  },
  {
    value: SortOrder.authorDesc,
    label: "Author Z->A",
  },
  {
    value: SortOrder.lengthAsc,
    label: "Short->Long",
  },
  {
    value: SortOrder.lengthDesc,
    label: "Long->Short",
  },
];

const PAGE_SIZE_OPTIONS = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
];

export const BooksFilters = ({
  setSortOrder,
  sortOrder,
  setPageSize,
  pageSize,
  searchInput,
  setSearchInput,
  handleNextPage,
  handleLastPage,
  debouncedSetSearchInput,
  disableNextPage,
  disableLastPage,
}: BooksFiltersProps) => {
  const handleSortOrderChange = useCallback(
    (e) => setSortOrder(e.target.value),
    [setSortOrder]
  );

  const handlePageSizeChange = useCallback(
    (e) => setPageSize(e.target.value),
    [setPageSize]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSearchInput(value);
      debouncedSetSearchInput(value);
    },
    [debouncedSetSearchInput, setSearchInput]
  );

  return (
    <StyledContainer>
      <StyledFlexContainer>
        <StyledInput
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <StyledSelectContainer>
          Sort by
          <Select
            options={SORT_OPTIONS}
            onChange={handleSortOrderChange}
            value={sortOrder}
          />
        </StyledSelectContainer>
        <StyledSelectContainer>
          Page size
          <Select
            options={PAGE_SIZE_OPTIONS}
            onChange={handlePageSizeChange}
            value={pageSize}
          />
        </StyledSelectContainer>
      </StyledFlexContainer>
      <BooksPagination
        handleLastPage={handleLastPage}
        handleNextPage={handleNextPage}
        disableLastPage={disableLastPage}
        disableNextPage={disableNextPage}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
  background: ${theme["ultraDarkPurple"]};
  margin-bottom: 1rem;
  cursor: default;
  padding-top: 1rem;
`
);

const StyledFlexContainer = styled(
  "div",
  `
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 1rem;

`
);

const StyledInput = styled(
  "input",
  `
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  
  &:focus-visible {
    outline-color: ${theme["purple"]};
  }
`
);

const StyledSelectContainer = styled(
  "div",
  `
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
);

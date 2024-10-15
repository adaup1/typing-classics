"use client";

import { useCallback } from "react";
import { SortOrder } from "@/app/lib/types.d";
import { styled } from "css-template-components/client";
import { theme } from "@/app/theme";
import { Select } from "@/app/components/client/dropdowns";
import { BooksPagination } from "./BooksPagination";

interface BooksFiltersProps {
  setSortOrder: (arg: SortOrder) => void;
  sortOrder: SortOrder;
  searchInput: string;
  setSearchInput: (arg: string) => void;
  debouncedSetSearchInput: (arg: string) => void;
  handleNextPage: () => void;
  handleLastPage: () => void;
  disableNextPage: boolean;
  disableLastPage: boolean;
}

const OPTIONS = [
  {
    value: SortOrder.titleAsc,
    label: "Title A->Z",
  },
  {
    value: SortOrder.titleDesc,
    label: "Title Z->A",
  },
  {
    value: SortOrder.lengthAsc,
    label: "Shortest to Longest",
  },
  {
    value: SortOrder.lengthDesc,
    label: "Longest to Shortest",
  },
];

export const BooksFilters = ({
  setSortOrder,
  sortOrder,
  searchInput,
  setSearchInput,
  handleNextPage,
  handleLastPage,
  debouncedSetSearchInput,
  disableNextPage,
  disableLastPage,
}: BooksFiltersProps) => {
  const handleOnChange = useCallback(
    (e) => setSortOrder(e.target.value),
    [setSortOrder]
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
            options={OPTIONS}
            onChange={handleOnChange}
            value={sortOrder}
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

"use client";

import { useCallback } from "react";
import { SortOrder } from "@/app/lib/types.d";
import { styled } from "next-yak";
import { theme } from "@/app/theme";
import { Select } from "@/app/components/dropdowns";
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
        <StyledSelectsContainer>
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
        </StyledSelectsContainer>
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

const StyledContainer = styled.div`
  background: ${() => theme.ultraDarkPurple};
  margin-bottom: 1rem;
  cursor: default;
  padding-top: 1rem;
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StyledSelectsContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    margin: auto;
  }

  &:focus-visible {
    outline-color: ${() => theme.darkerPurple};
  }
`;

const StyledSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    width: 45%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
`;

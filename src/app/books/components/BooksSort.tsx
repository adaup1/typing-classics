"use client";

import { SetStateAction, useCallback, useState, useEffect } from "react";
import { SortOrder } from "@/app/lib/types.d";
import { styled } from "css-template-components/client";
import { Select } from "@/app/components/client/dropdowns";
import { useBooks } from "@/app/lib/queries/hooks/useBooks";
import { useDebounce } from "@/app/helpers/hooks/useDebounce";
import map from "lodash/map";
import Link from "next/link";
import { BookCard } from "./BookCard";
import uniqueId from "lodash/uniqueId";
import { useMediaQuery } from "react-responsive";

const OPTIONS = [
  {
    value: SortOrder.titleAsc,
    label: "Title A->Z",
  },
  {
    value: SortOrder.titleDesc,
    label: "Title Z->A",
  },
];

export const BooksSort = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.titleAsc);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const debouncedSetSearchInput = useDebounce(setDebouncedSearchInput, 1000);
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  const { data } = useBooks({
    sortOrder,
    q: debouncedSearchInput,
    limit: 20,
    offset: 0,
  });

  const handleOnChange = useCallback((e) => setSortOrder(e.target.value), []);

  const handleInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSearchInput(value);
      debouncedSetSearchInput(value);
    },
    [debouncedSetSearchInput]
  );

  return (
    <>
      <input value={searchInput} onChange={handleInputChange} />
      <Select options={OPTIONS} onChange={handleOnChange} value={sortOrder} />
      <StyledOuterContainer>
        <StyledBooksContainer>
          {data &&
            map(data, (book) => (
              <BookCard
                key={`${book.book_id}_${uniqueId()}`}
                book={book}
                isMobile={isMobile}
              />
            ))}
        </StyledBooksContainer>
      </StyledOuterContainer>
    </>
  );
};

const StyledOuterContainer = styled(
  "div",
  `
    display: flex;
    justify-content: center;
  `
);

const StyledBooksContainer = styled(
  "div",
  `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
    width: 100%;
  gap: 1rem;
  
`
);

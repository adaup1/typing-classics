"use client";

import { useCallback, useState, useMemo } from "react";
import { SortOrder } from "@/app/lib/types.d";
import { styled } from "css-template-components/client";
import { useBooks } from "@/app/lib/queries/hooks/useBooks";
import { useDebounce } from "@/app/helpers/hooks/useDebounce";
import map from "lodash/map";
import { BookCard } from "./BookCard";
import uniqueId from "lodash/uniqueId";
import { useMediaQuery } from "react-responsive";
import { BooksFilters } from "./BooksFilters";

const PAGE_SIZE = 10;

export const BooksSort = ({ totalBooks }: { totalBooks: number }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.titleAsc);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const setDebouncedSearch = useCallback((value) => {
    setDebouncedSearchInput(value);
    setPage(1);
  }, []);
  const debouncedSetSearchInput = useDebounce(setDebouncedSearch, 1000);
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  const offset = useMemo(() => (page - 1) * PAGE_SIZE, [page]);
  const disableNextPage = useMemo(
    () => offset >= totalBooks - PAGE_SIZE,
    [offset, totalBooks]
  );

  const { data, loading } = useBooks({
    sortOrder,
    q: debouncedSearchInput,
    limit: PAGE_SIZE,
    offset: offset,
  });

  const handleNextPage = useCallback(() => {
    if (!disableNextPage) {
      setPage((prev) => prev + 1);
    }
  }, []);

  const handleLastPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  return (
    <StyledContainer>
      <BooksFilters
        sortOrder={sortOrder}
        debouncedSetSearchInput={debouncedSetSearchInput}
        handleLastPage={handleLastPage}
        handleNextPage={handleNextPage}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSortOrder={setSortOrder}
        disableNextPage={disableNextPage}
        disableLastPage={page <= 1}
        setPage={setPage}
      />
      <StyledOuterContainer>
        <StyledBooksContainer>
          {!loading && !data.length && "No results"}
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
    </StyledContainer>
  );
};

const StyledContainer = styled(
  "div",
  `
`
);

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
  max-width: 1200px;
  width: fit-content;
  gap: 1rem;  
`
);

"use client";

import { useCallback, useState, useMemo, useEffect } from "react";
import { SortOrder } from "@/app/lib/types.d";
import { styled } from "next-yak";
import { theme } from "@/app/theme";
import { useBooks } from "@/app/lib/queries/hooks/useBooks";
import { useDebounce } from "@/app/helpers/hooks/useDebounce";
import map from "lodash/map";
import { BookCard } from "./BookCard";
import uniqueId from "lodash/uniqueId";
import { useMediaQuery } from "react-responsive";
import { BooksFilters } from "./BooksFilters";
import { BooksPagination } from "./BooksPagination";
import { Loader } from "@/app/components/svg/Loader";
import { useRouter, useSearchParams } from "next/navigation";

export const BooksSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get("sort") as SortOrder) || SortOrder.titleAsc
  );
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("size") || "10", 10)
  );
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [totalBooks, setTotalBooks] = useState(0);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

  const updateUrl = useCallback(
    (params: { sort?: string; q?: string; size?: string; page?: string }) => {
      const newSearchParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });
      router.push(`/books?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  const setDebouncedSearch = useCallback(
    (value: string) => {
      setDebouncedSearchInput(value);
      setPage(1);
      updateUrl({ q: value, page: "1" });
    },
    [updateUrl]
  );

  const handleSetSortOrder = useCallback(
    (value: SortOrder) => {
      setSortOrder(value);
      updateUrl({ sort: value });
    },
    [updateUrl]
  );

  const handleSetPageSize = useCallback(
    (value: number) => {
      setPageSize(value);
      setPage(1);
      updateUrl({ size: value.toString(), page: "1" });
    },
    [updateUrl]
  );

  const debouncedSetSearchInput = useDebounce(setDebouncedSearch, 1000);
  const isMobile = useMediaQuery({ maxWidth: 1000 });
  const offset = useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const disableNextPage = useMemo(
    () => offset >= totalBooks - pageSize,
    [offset, totalBooks, pageSize]
  );

  const { data, total, loading } = useBooks({
    sortOrder,
    q: debouncedSearchInput,
    limit: pageSize,
    offset: offset,
  });

  useEffect(() => {
    setTotalBooks(total);
  }, [total]);

  const handleNextPage = useCallback(() => {
    if (!disableNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      updateUrl({ page: nextPage.toString() });
    }
  }, [disableNextPage, page, updateUrl]);

  const handleLastPage = useCallback(() => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      updateUrl({ page: prevPage.toString() });
    }
  }, [page, updateUrl]);

  return (
    <StyledContainer>
      <BooksFilters
        sortOrder={sortOrder}
        pageSize={pageSize}
        setPageSize={handleSetPageSize}
        debouncedSetSearchInput={debouncedSetSearchInput}
        handleLastPage={handleLastPage}
        handleNextPage={handleNextPage}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSortOrder={handleSetSortOrder}
        disableNextPage={disableNextPage}
        disableLastPage={page <= 1}
      />
      <StyledOuterContainer>
        {loading && <StyledLoader />}
        {!loading && !data.length && (
          <StyledNoResultsContainer>No results</StyledNoResultsContainer>
        )}
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
      <StyledPaginationContainer>
        <BooksPagination
          handleLastPage={handleLastPage}
          handleNextPage={handleNextPage}
          disableLastPage={page <= 1}
          disableNextPage={disableNextPage}
        />
      </StyledPaginationContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;

const StyledLoader = styled(Loader)`
  width: 15rem;
`;

const StyledOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 18rem);
`;

const StyledBooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  width: fit-content;
  gap: 1rem;
  margin-bottom: 1rem;
  height: 100%;
`;

const StyledPaginationContainer = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  background: ${() => theme.darkPurple};
`;

const BodyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const StyledNoResultsContainer = styled.div`
  font-size: 2rem;
`;

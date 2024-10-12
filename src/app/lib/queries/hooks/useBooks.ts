import { useFetch } from "@/app/helpers/hooks/useFetch";
import { SortOrder } from "../../types";
import { Book } from "../../types.d";
import get from "lodash/get";

interface UseBooksProps {
  sortOrder: SortOrder;
  q: string;
  limit: number;
  offset: number;
}

type BookReturnType = {
  data: Array<Book>;
  total: number;
  loading: boolean;
  error: any;
};

export const useBooks = ({
  sortOrder,
  q,
  limit,
  offset,
}: UseBooksProps): BookReturnType => {
  const { data, loading, error } = useFetch(
    `/books?sortOrder=${sortOrder}&q=${q}&limit=${limit}&offset=${offset}`
  );

  return {
    data: get(data, "result", []),
    total: get(data, "total", 0),
    loading,
    error,
  };
};

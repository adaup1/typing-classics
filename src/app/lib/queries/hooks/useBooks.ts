import { useFetch } from "@/app/helpers/hooks/useFetch";
import { SortOrder } from "../../types";
import { Book } from "../../types.d";

interface UseBooksProps {
  sortOrder: SortOrder;
  q: string;
  limit: number;
  offset: number;
}

type BookReturnType = {
  data: Array<Book>;
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

  return { data, loading, error };
};

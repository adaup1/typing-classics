export type Book = {
  book_id?: number;
  title?: string;
  title_short?: string;
  author_first_name?: string;
  author_last_name?: string;
  cover_image_url?: string;
  text?: string;
  word_count?: number;
};

export enum SortOrder {
  titleAsc = "titleAsc",
  titleDesc = "titleDesc",
  lengthAsc = "lengthAsc",
  lengthDesc = "lengthDesc",
}

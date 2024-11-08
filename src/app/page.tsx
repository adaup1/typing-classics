import { styled } from "next-yak";
import { theme } from "./theme";
import { About, BooksCarousel } from "./home";
import HeadingSkeleton from "./home/heading/HeadingSkeleton";
import { getHotBooks } from "./lib/queries/getHotBooks";
import { getLatestBooks } from "./lib/queries/getLatestBooks";
import { Button } from "./components/buttons";
import Link from "next/link";
import dynamic from "next/dynamic";

const Heading = dynamic(() => import("./home/heading/Heading"), {
  ssr: false,
  loading: () => <HeadingSkeleton />,
});

export const revalidate = 3600;

export default async function Home() {
  const hotBooks = await getHotBooks();
  const latestBooks = await getLatestBooks();

  return (
    <>
      <StyledBooksContainer>
        <Heading />
        <BooksCarousel books={hotBooks} heading={`What's hot?`} />
        <br />
        <br />
        <BooksCarousel books={latestBooks} heading={`Latest additions!`} />
      </StyledBooksContainer>
      <StyledButtonContainer>
        <Link href="/books">
          <StyledButton text="View All Books" />
        </Link>
      </StyledButtonContainer>
      <StyledAboutContainer>
        <About />
      </StyledAboutContainer>
    </>
  );
}

const StyledBooksContainer = styled.div`
  padding-top: 1rem;
`;

const StyledAboutContainer = styled.div`
  background: ${() => theme.darkPurple};
  padding-bottom: 2rem;
  padding-top: 1rem;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const StyledButton = styled(Button)`
  margin-bottom: 2rem;
  font-size: 2rem;
`;

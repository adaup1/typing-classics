export default function Book({ params }: { params: { id: string } }) {
  const id = params.id;

  return <>Book {id}</>;
}

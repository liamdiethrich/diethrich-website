import { Container } from "@/components/Container";
import { FilmGridItem } from "@/components/FilmGridItem";
import { filmMusicItems } from "@/content/filmMusic";

export default function FilmMusicPage() {
  return (
    <div className="bg-canvas pb-20 pt-20 md:pb-24 md:pt-24 lg:pb-28 lg:pt-32">
      <Container className="max-w-[1320px]">
        <h1 className="mb-10 text-center font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:mb-16 md:text-left md:text-3xl md:tracking-[0.24em]">
          Film Music
        </h1>
        <div className="grid gap-x-6 gap-y-9 md:gap-y-12 md:grid-cols-2">
          {filmMusicItems.map((item) => (
            <FilmGridItem key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}

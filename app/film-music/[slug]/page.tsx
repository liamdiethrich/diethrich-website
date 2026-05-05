import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PosterVideoCard } from "@/components/PosterVideoCard";
import { filmMusicItems } from "@/content/filmMusic";

type FilmDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return filmMusicItems.map((item) => ({ slug: item.slug }));
}

export default async function FilmDetailPage({ params }: FilmDetailPageProps) {
  const { slug } = await params;
  const item = filmMusicItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-canvas py-16 md:py-20">
      <Container className="max-w-[1100px]">
        <div className="mb-8 space-y-3 text-center md:mb-10">
          {item.sourceTitle ? (
            <p className="font-heading text-[0.96rem] uppercase tracking-[0.18em] text-neutral-500 md:text-[1rem] md:tracking-[0.2em]">
              {item.sourceTitle}
            </p>
          ) : null}
          <h1 className="font-heading text-[1.9rem] tracking-[0.12em] text-neutral-900 md:text-[3.35rem] md:tracking-[0.16em]">
            {item.title}
          </h1>
        </div>
        {item.videoUrl ? (
          <PosterVideoCard
            src={item.videoUrl}
            poster={item.posterImage}
            title={item.title}
            objectFitClassName="object-contain"
            posterFitClassName="object-cover"
          />
        ) : item.embedUrl ? (
          <div className="aspect-video overflow-hidden rounded-[2px] border border-neutral-300 bg-black shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            <iframe
              title={item.title}
              src={item.embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}

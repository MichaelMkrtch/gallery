import ArtistsCarousel from "@/features/home/components/ArtistsCarousel";
import OverviewCarousel from "@/features/home/components/OverviewCarousel";
import RecentArtGrid from "@/features/home/components/RecentArtGrid";

export default function Home() {
  return (
    <main>
      <OverviewCarousel />

      <section className="mt-8 mb-8 md:mt-12">
        <h2 className="mb-2 text-center text-xl font-semibold tracking-tight">
          Welcome to the Agajanian Gallery
        </h2>
        <p className="mx-auto text-center leading-5 tracking-wide text-balance md:max-w-3/5 md:text-lg md:leading-6 lg:max-w-1/2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit error
          nisi sequi tempore obcaecati vero impedit dolores, iste totam quod
          eaque deleniti, adipisci. Soluta officiis nesciunt accusamus voluptas
          totam.
        </p>
      </section>

      <ArtistsCarousel />

      <RecentArtGrid />
    </main>
  );
}

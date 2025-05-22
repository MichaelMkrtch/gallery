import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-foreground/5 bg-background max-w-md rounded-tl-3xl rounded-tr-3xl border border-b-0 px-10 pb-6 shadow-sm md:max-w-2xl lg:max-w-6xl 2xl:max-w-7xl">
      <div className="mx-auto mt-4 flex items-center justify-center">
        <Image
          src="/logo-gold-2.png"
          alt="Agajanian Gallery logo (AG)."
          width="64"
          height="64"
        />

        <div className="top-11 h-0.5 w-10 rotate-90 rounded-tl-sm rounded-br-sm bg-neutral-300" />

        <div className="flex flex-col leading-5">
          <span>123 Main Street</span>
          <span>Main City, CA 99999</span>
          <span></span>
        </div>
      </div>

      <div className="mx-auto mt-4 grid grid-cols-3 gap-4 px-2 lg:max-w-5xl">
        <section className="mx-auto">
          <h3 className="text-primary mb-1 text-lg tracking-tight">About</h3>
          <p className="max-w-sm leading-5 tracking-wide text-balance">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            ducimus ad asperiores atque, similique totam, consequatur minima
            tempore ut eaque accusamus unde nemo.
          </p>
        </section>

        <section className="text-center">
          <h3 className="text-primary mb-1 text-lg tracking-tight">Artists</h3>
          <p className="mx-auto">Artist 1</p>
          <p className="mx-auto">Artist 2</p>
          <p className="mx-auto">Artist 3</p>
        </section>

        <section className="float-right ml-auto">
          <h3 className="text-primary mb-1 text-lg tracking-tight">
            Navigation
          </h3>
          <nav>
            <ul className="flex flex-col gap-2 tracking-tight">
              <li className="navlink">
                <Link href="/">Home</Link>
              </li>
              <li className="navlink">
                <Link href="/about">About AG Gallery</Link>
              </li>
              <li className="navlink">
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background/80 rounded-tl-xl rounded-tr-xl border border-b-0 border-neutral-200 px-2 pb-4 drop-shadow-xs md:max-w-full md:rounded-tl-3xl md:rounded-tr-3xl md:px-10 md:pb-6 lg:max-w-7xl">
      <div className="mx-auto mt-4 flex items-center justify-center">
        <Image
          src="/logo-gold-2.png"
          alt="Agajanian Gallery logo (AG)."
          width="64"
          height="64"
          className="size-16"
        />

        <div className="top-11 h-0.5 w-10 rotate-90 rounded-tl-sm rounded-br-sm bg-neutral-300" />

        <div className="ml-1 flex flex-col text-sm leading-4 md:text-base md:leading-5">
          <span>123 Main Street</span>
          <span>Main City, CA 99999</span>
          <span></span>
        </div>
      </div>

      <div className="mx-4 mt-4 grid grid-cols-2 gap-4 px-2 md:mx-auto md:grid-cols-3 lg:max-w-5xl">
        <section className="col-start-1 col-end-3 md:col-start-1 md:col-end-2 md:mx-auto">
          <h3 className="text-primary mb-1 tracking-tight md:text-lg">About</h3>
          <p className="max-w-sm leading-5 tracking-wide text-balance">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            ducimus ad asperiores atque, similique totam, consequatur minima
            tempore ut eaque accusamus unde nemo.
          </p>
        </section>

        <section className="md:text-center">
          <h3 className="text-primary mb-1 tracking-tight md:text-lg">
            Artists
          </h3>
          <ul>
            <li className="mb-2">Artist 1</li>
            <li className="mb-2">Artist 2</li>
            <li className="mb-2">Artist 3</li>
          </ul>
        </section>

        <section className="ml-auto md:float-right">
          <h3 className="text-primary mb-1 tracking-tight md:text-lg">
            Navigation
          </h3>
          <nav>
            <ul className="tracking-tight md:gap-2">
              <li className="navlink mb-2">
                <Link href="/">Home</Link>
              </li>
              <li className="navlink mb-2">
                <Link href="/about">About AG Gallery</Link>
              </li>
              <li className="navlink mb-2">
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </footer>
  );
}

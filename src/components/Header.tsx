"use client";

import Image from "next/image";
import Link from "next/link";

import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="border-foreground/5 bg-background/70 fixed top-0 right-0 left-0 z-50 mx-auto flex max-w-md items-center justify-between rounded-br-3xl rounded-bl-3xl border border-t-0 px-10 py-6 shadow-sm backdrop-blur-xl md:max-w-2xl lg:max-w-6xl 2xl:max-w-7xl">
      <Link
        href="/"
        className="flex w-[270px] items-center justify-start gap-8"
      >
        <Image
          src="/logo-simple-dark.png"
          alt="Agajanian Gallery logo (AG)."
          height="44"
          width="44"
        />
        <div className="bg-foreground absolute top-11 left-20 h-0.5 w-10 rotate-90 rounded-tl-sm rounded-br-sm" />
        <h1 className="text-primary flex flex-col text-lg leading-5 font-semibold tracking-tight transition-colors duration-150 ease-in">
          <span>AGAJANIAN</span>
          <span>GALLERY</span>
        </h1>
      </Link>

      <nav>
        {/* <ul> used for accessibility. Screen readers notify about the presence
          of a list and the number of list items. */}
        <ul className="flex justify-around gap-3.5 text-lg font-medium tracking-tight">
          <li className="navlink">
            <Link href="/artists">Artists</Link>
          </li>
          <li className="navlink">
            <Link href="/collections">Collections</Link>
          </li>
          <li className="navlink">
            <Link href="/artworks">Artworks</Link>
          </li>
          <li className="navlink">
            <Link href="/about">About</Link>
          </li>
          <li className="navlink">
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      <div className="border-foreground/10 relative flex items-center justify-center rounded-full border-1 shadow-xs">
        <Search size="20" className="ml-2" />
        <Input
          className="placeholder:text-foreground/60 h-9 w-60 border-none font-semibold shadow-none placeholder:font-medium focus-visible:ring-0"
          placeholder="Search"
        />
      </div>
    </header>
  );
}

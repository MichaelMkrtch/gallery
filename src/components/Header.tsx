"use client";

import Image from "next/image";
import Link from "next/link";

import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-background/80 fixed top-0 right-0 left-0 z-50 mx-auto flex items-center justify-between rounded-br-xl rounded-bl-xl border border-t-0 border-neutral-200 px-5 py-5 drop-shadow-xs backdrop-blur-xl md:max-w-full md:rounded-br-3xl md:rounded-bl-3xl md:px-10 md:py-6 lg:max-w-6xl 2xl:max-w-7xl">
      <Link
        href="/"
        className="flex items-center justify-start gap-3 lg:w-60 lg:gap-6 2xl:w-[270px]"
      >
        <Image
          src="/logo-simple-dark.png"
          alt="Agajanian Gallery logo (AG)."
          height="44"
          width="44"
          className="size-6 md:size-8 lg:size-10"
        />
        <div className="bg-foreground absolute left-8.5 h-0.5 w-8 rotate-90 rounded-tl-sm rounded-br-sm sm:block md:hidden lg:top-11 lg:left-18 lg:block lg:w-10" />
        <h1 className="text-primary flex flex-col leading-4 font-semibold tracking-tight transition-colors duration-150 ease-in md:hidden md:text-lg md:leading-5 lg:flex">
          <span>AGAJANIAN</span>
          <span>GALLERY</span>
        </h1>
      </Link>

      <nav>
        {/* <ul> used for accessibility. Screen readers notify about the presence
          of a list and the number of list items. */}
        <ul className="hidden justify-around gap-3.5 font-medium tracking-tight md:flex lg:text-lg">
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

      <div className="bg-background relative hidden items-center justify-center rounded-full border-1 border-neutral-200 shadow-sm md:flex lg:w-60 2xl:w-[270px]">
        <Search size="20" className="ml-2 text-neutral-500" />
        <Input
          className="h-9 w-full border-none font-semibold shadow-none placeholder:font-medium placeholder:text-neutral-400 focus-visible:ring-0"
          placeholder="Search"
        />
      </div>
    </header>
  );
}

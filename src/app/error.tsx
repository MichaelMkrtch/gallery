"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Caught by GlobalError boundary:", error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>
        {error.message ||
          "An error occurred while connecting to our gallery. Please try again."}
      </p>
      <button onClick={() => reset()}>Try again</button>
      <Link href="/">Go back home</Link>
    </div>
  );
}

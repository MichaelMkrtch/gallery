"use client";

import { ReactNode } from "react";

import client from "@/lib/apollo-client";

import { ApolloProvider } from "@apollo/client";

export default function ApolloProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

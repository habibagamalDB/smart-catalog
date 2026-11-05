"use client";

import { Direction } from "radix-ui";

type AppProvidersProps = {
  dir: "rtl" | "ltr";
  children: React.ReactNode;
};

export function AppProviders({ dir, children }: AppProvidersProps) {
  return <Direction.Provider dir={dir}>{children}</Direction.Provider>;
}

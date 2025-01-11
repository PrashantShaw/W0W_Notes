"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { type ReactNode } from "react";

export function Providers(props: { children: ReactNode }) {
  const themeProps: ThemeProviderProps = {
    attribute: "class",
    defaultTheme: "system",
    enableSystem: true,
    disableTransitionOnChange: true,
  };
  return (
    <NextThemesProvider {...themeProps}>{props.children}</NextThemesProvider>
  );
}

"use client";

import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { useAppTheme } from '../context/ThemeContext';
import React, { useMemo } from 'react';

export function ThemedMantineProvider({ children }: { children: React.ReactNode }) {
  const { primaryColor } = useAppTheme();

  // Dynamically generate a Mantine color palette from the HEX color
  // For simplicity, we'll use the same color for all shades or just the primary shade
  // A better way would be to generate shades, but Mantine can handle a single color tuple too.
  const theme = useMemo(() => {
    const customColor: MantineColorsTuple = [
      '#eef3f5', // 0
      '#dbe6eb', // 1
      '#b1cdd7', // 2
      '#84b1c2', // 3
      '#5e98af', // 4
      '#4787a2', // 5
      '#3b7b98', // 6
      primaryColor, // 7 (Primary)
      '#236481', // 8
      '#16526d', // 9
    ];

    return createTheme({
      primaryColor: 'custom',
      fontFamily: 'var(--font-myanmar), var(--font-roboto), sans-serif',
      headings: {
        fontFamily: 'var(--font-myanmar), var(--font-roboto), sans-serif',
      },
      colors: {
        custom: customColor,
      },
    });
  }, [primaryColor]);

  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}

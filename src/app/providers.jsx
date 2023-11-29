"use client"

import { ReduxProvider } from '@/redux/provider';
import store from '@/redux/store';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "@/chakra/theme";

export function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </ReduxProvider>
  )
};

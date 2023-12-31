import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#FF3C00',
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      }
    }),
  },
  components: {
    Button: {
      sizes: {
        sm: {
          width: "50px",
        },
        md: {
          width: "100px",
        }
      }
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
      sizes: {
        lg: {
          fontSize: '2xl',
        },
        md: {
          fontSize: 'xl',
        },
        sm: {
          fontSize: 'lg',
        },
      },
    },
  },
});
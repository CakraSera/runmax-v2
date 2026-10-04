import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

/**
 * ThemeProvider keeps the navigation theme in sync with the system so the
 * Liquid Glass tab bar and header buttons do not flash or flicker in dark mode
 * on iOS 26.
 */
export default function RootLayout() {
  const isDark = useColorScheme() === "dark";
  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

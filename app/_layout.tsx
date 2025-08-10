import { Stack } from 'expo-router';
import '../global.css'; // Tailwind global styles
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from './../hooks/useFonts';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useAppFonts().fontsLoaded;

  const fontsError = useAppFonts().error;

  useEffect(() => {
    if (fontsError) throw fontsError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) return null;

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/search/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/cancel/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/review/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/edit/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/settings" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/notification-settings" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/password-manager" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/privacy-policy" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/help-center" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/payment-method" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/add-card" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/chat/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/notification" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/sort-by" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/doctor-info/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/schedule/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/schedule-details/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(others)/my-appointment/[query]" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </>
  );
}

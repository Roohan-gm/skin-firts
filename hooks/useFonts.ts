import { useFonts } from 'expo-font';

const fonts = {
  /* League Spartan */
  'LeagueSpartan-Thin': require('../assets/fonts/LeagueSpartan-Thin.ttf'),
  'LeagueSpartan-ExtraLight': require('../assets/fonts/LeagueSpartan-ExtraLight.ttf'),
  'LeagueSpartan-Light': require('../assets/fonts/LeagueSpartan-Light.ttf'),
  'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf'),
  'LeagueSpartan-Medium': require('../assets/fonts/LeagueSpartan-Medium.ttf'),
  'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
  'LeagueSpartan-Bold': require('../assets/fonts/LeagueSpartan-Bold.ttf'),
  'LeagueSpartan-Black': require('../assets/fonts/LeagueSpartan-Black.ttf'),
};

export function useAppFonts() {
  const [fontsLoaded, error] = useFonts(fonts);
  return { fontsLoaded, error };
}

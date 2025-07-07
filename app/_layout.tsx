import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Playfair_Display_400Regular, Playfair_Display_700Bold } from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Playfair-Regular': Playfair_Display_400Regular,
    'Playfair-Bold': Playfair_Display_700Bold,
  });

  const [skipFonts, setSkipFonts] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useFrameworkReady();

  useEffect(() => {
    if (fontsLoaded || fontError || skipFonts) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, skipFonts]);

  // Auto-skip fonts after 10 seconds to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fontsLoaded && !fontError) {
        console.log('Font loading timeout, skipping fonts');
        setSkipFonts(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [fontsLoaded, fontError]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    // Force re-render to retry font loading
    window.location.reload();
  };

  const handleSkipFonts = () => {
    setSkipFonts(true);
  };

  // Show loading screen while fonts are loading
  if (!fontsLoaded && !fontError && !skipFonts) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Hobilik Yükleniyor...</Text>
        <Text style={styles.loadingSubtext}>Fontlar hazırlanıyor</Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipFonts}>
          <Text style={styles.skipButtonText}>Fontları Atla</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show error if fonts failed to load
  if (fontError && !skipFonts) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Font Yükleme Sorunu</Text>
        <Text style={styles.errorSubtext}>
          Fontlar yüklenirken bir sorun oluştu. Uygulamayı yeniden deneyebilir veya varsayılan fontlarla devam edebilirsiniz.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Yeniden Dene</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={handleSkipFonts}>
            <Text style={styles.continueButtonText}>Devam Et</Text>
          </TouchableOpacity>
        </View>
        {retryCount > 0 && (
          <Text style={styles.retryText}>Deneme sayısı: {retryCount}</Text>
        )}
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="seller/[id]" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="order/[id]" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 32,
  },
  skipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  continueButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  retryText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});
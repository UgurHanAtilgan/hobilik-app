import { ScrollView, View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setProducts } from '@/store/slices/productSlice';
import { mockProducts } from '@/services/mockData';
import ProductCard from '@/components/ProductCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp, Star, Heart, ArrowRight, Zap, Search, ShoppingCart, User, Menu } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { products, featuredProducts } = useAppSelector(state => state.product);
  const [isLoading, setIsLoading] = useState(true);
  const [flashProducts, setFlashProducts] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatch(setProducts(mockProducts));
        setFlashProducts(mockProducts.slice(0, 6));
        setIsLoading(false);
        
        // Start animations
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Error loading products:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch, fadeAnim, slideAnim]);

  const renderFlashProduct = ({ item, index }: { item: any; index: number }) => (
    <Animated.View 
      style={[
        styles.flashProductContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
      ]}
    >
      <TouchableOpacity 
        style={styles.flashCard}
        onPress={() => router.push(`/product/${item.id}`)}
      >
        <Image source={{ uri: item.images[0] }} style={styles.flashImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.flashOverlay}
        >
          <View style={styles.flashBadge}>
            <Zap size={12} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.flashBadgeText}>FLASH</Text>
          </View>
          <View style={styles.flashContent}>
            <Text style={styles.flashTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.flashPrice}>₺{item.price}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIconContainer}>
        <Sparkles size={16} color="#4A90A4" />
      </View>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4A90A4', '#357A8A']}
          style={styles.loadingContainer}
        >
          <Animated.View style={[styles.loadingContent, { opacity: fadeAnim }]}>
            <Image 
              source={require('@/assets/images/hobilikPrimary.png')} 
              style={styles.loadingLogo}
              resizeMode="contain"
            />
            <Text style={styles.loadingText}>Sanatkarın dünyasına hoş geldiniz</Text>
            <View style={styles.loadingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const categories = ['Seramik', 'Takı', 'Ev Dekor', 'Giyim', 'Sanat'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header Stats */}
        <Animated.View 
          style={[
            styles.headerStats,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#4A90A4', '#357A8A']}
            style={styles.statsGradient}
          >
            <Image 
              source={require('@/assets/images/hobilikPrimary.png')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
            <Text style={styles.statsTitle}>Sanatkarın Dokunuşu</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>1000+</Text>
                <Text style={styles.statLabel}>Ürün</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Sanatkar</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Şehir</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>%100</Text>
                <Text style={styles.statLabel}>Memnuniyet</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Flash Products */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53', '#FFB800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.flashHeader}
          >
            <View style={styles.flashHeaderContent}>
              <View style={styles.flashTitleContainer}>
                <Zap size={24} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.flashTitle}>Flash Ürünler</Text>
              </View>
              <TouchableOpacity style={styles.flashSeeAll}>
                <Text style={styles.flashSeeAllText}>Tümü</Text>
                <ArrowRight size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.flashSubtitle}>Sınırlı süre özel fiyatlar</Text>
          </LinearGradient>
          
          <FlatList
            data={flashProducts}
            renderItem={renderFlashProduct}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flashList}
          />
        </Animated.View>

        {/* Categories */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kategoriler</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tümü</Text>
              <ArrowRight size={16} color="#4A90A4" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </Animated.View>

        {/* Featured Products */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#4A90A4" />
              <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tümü</Text>
              <ArrowRight size={16} color="#4A90A4" />
            </TouchableOpacity>
          </View>
          <View style={styles.featuredGrid}>
            {featuredProducts.slice(0, 4).map((product, index) => (
              <Animated.View 
                key={product.id} 
                style={[
                  styles.featuredItem,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <ProductCard product={product} />
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Bottom Spacer for Tab Bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingLogo: {
    height: 80,
    width: 240,
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 30,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
  dot1: {
    animationDelay: '0s',
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
  headerStats: {
    margin: 16,
    marginTop: 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsGradient: {
    padding: 24,
    alignItems: 'center',
  },
  headerLogo: {
    height: 50,
    width: 180,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  flashHeader: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  flashHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  flashTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  flashSeeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashSeeAllText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 4,
  },
  flashSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  flashList: {
    paddingHorizontal: 16,
  },
  flashProductContainer: {
    marginRight: 12,
  },
  flashCard: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  flashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 12,
  },
  flashBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  flashBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  flashContent: {
    alignItems: 'flex-start',
  },
  flashPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4A90A4',
    fontWeight: '600',
    marginRight: 4,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  featuredItem: {
    width: (width - 48) / 2,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  bottomSpacer: {
    height: 90, // Tab bar için extra boşluk
  },
});
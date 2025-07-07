import { ScrollView, View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setProducts } from '@/store/slices/productSlice';
import { mockProducts } from '@/services/mockData';
import ProductCard from '@/components/ProductCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp, Star, Heart, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { products, featuredProducts } = useAppSelector(state => state.product);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      dispatch(setProducts(mockProducts));
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setIsLoading(false);
    }
  }, [dispatch]);

  const renderFeaturedProduct = ({ item }: { item: any }) => (
    <View style={styles.featuredProductContainer}>
      <ProductCard product={item} />
    </View>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIconContainer}>
        <Sparkles size={20} color="#4A90A4" />
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
          <Image 
            source={require('@/assets/images/hobilikPrimary.png')} 
            style={styles.loadingLogo}
            resizeMode="contain"
          />
          <Text style={styles.loadingText}>Sanatkarın dünyasına hoş geldiniz</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const categories = ['Seramik', 'Takı', 'Ev Dekor', 'Giyim', 'Sanat'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#4A90A4', '#357A8A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Image 
              source={require('@/assets/images/hobilikPrimary.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Sanatkarın Dokunuşu</Text>
            <Text style={styles.headerSubtitle}>El yapımı ürünler ve zanaat eserleri</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1000+</Text>
                <Text style={styles.statLabel}>Ürün</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Sanatkar</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Şehir</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Categories */}
        <View style={styles.section}>
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
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#FF6B6B" />
              <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tümü</Text>
              <ArrowRight size={16} color="#4A90A4" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderFeaturedProduct}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <TrendingUp size={20} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Trend Ürünler</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tümü</Text>
              <ArrowRight size={16} color="#4A90A4" />
            </TouchableOpacity>
          </View>
          <View style={styles.trendingGrid}>
            {products.slice(0, 4).map((product, index) => (
              <View key={product.id} style={styles.trendingItem}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacer */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
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
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 180,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  section: {
    marginTop: 24,
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
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  featuredList: {
    paddingHorizontal: 20,
  },
  featuredProductContainer: {
    width: 200,
    marginRight: 16,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  trendingItem: {
    width: (width - 48) / 2,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  bottomSpacer: {
    height: 20,
  },
});
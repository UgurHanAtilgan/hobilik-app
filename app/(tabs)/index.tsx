import { ScrollView, View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setProducts } from '@/store/slices/productSlice';
import { mockProducts } from '@/services/mockData';
import ProductCard from '@/components/ProductCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { products, featuredProducts } = useAppSelector(state => state.product);

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const renderFeaturedProduct = ({ item }: { item: any }) => (
    <View style={styles.featuredProductContainer}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#2E7D32', '#4CAF50']}
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
            <Text style={styles.headerSubtitle}>Sanatkarın Dokunuşu</Text>
            <Text style={styles.headerDescription}>El yapımı ürünler ve zanaat eserlerini keşfedin</Text>
          </View>
        </LinearGradient>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={24} color="#2E7D32" />
            <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
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

        {/* Popular Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color="#2E7D32" />
            <Text style={styles.sectionTitle}>Popüler Kategoriler</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {['Ev Dekorasyonu', 'Seramik', 'Takı', 'Giyim', 'El Sanatları'].map((category) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* All Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tüm Ürünler</Text>
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 200,
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  headerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
  featuredList: {
    paddingHorizontal: 16,
  },
  featuredProductContainer: {
    width: 220,
    marginRight: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 120,
    borderLeftWidth: 3,
    borderLeftColor: '#2E7D32',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  productsGrid: {
    paddingHorizontal: 16,
  },
  productItem: {
    marginBottom: 16,
  },
});
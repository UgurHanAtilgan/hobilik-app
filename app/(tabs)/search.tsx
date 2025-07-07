import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setProducts, setSearchQuery, setSelectedCategory } from '@/store/slices/productSlice';
import { mockProducts, categories } from '@/services/mockData';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { LinearGradient } from 'expo-linear-gradient';
import { Filter, SlidersHorizontal } from 'lucide-react-native';

export default function SearchScreen() {
  const dispatch = useAppDispatch();
  const { products, searchQuery, selectedCategory } = useAppSelector(state => state.product);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4A90A4', '#357A8A']}
        style={styles.header}
      >
        <Text style={styles.title}>Keşfet</Text>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
          placeholder="El yapımı ürünlerde ara..."
        />
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} color="#FFFFFF" />
            <Text style={styles.filterButtonText}>Filtrele</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Categories */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} ürün bulundu
        </Text>
        <TouchableOpacity style={styles.sortButton}>
          <Filter size={16} color="#4A90A4" />
          <Text style={styles.sortText}>Sırala</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultsText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#4A90A4',
    fontWeight: '600',
    marginLeft: 4,
  },
  productsList: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 100, // Tab bar için extra boşluk
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
});
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Product } from '@/types';
import { Heart, Star, ShoppingCart } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToWishlist?: (productId: string) => void;
}

const { width } = Dimensions.get('window');

export default function ProductCard({ product, onPress, onAddToWishlist }: ProductCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.2)']}
          style={styles.imageOverlay}
        />
        
        {/* Wishlist Button */}
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={() => onAddToWishlist?.(product.id)}
        >
          <Heart size={16} color="#666" strokeWidth={2} />
        </TouchableOpacity>
        
        {/* Featured Badge */}
        {product.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>ÖNE ÇIKAN</Text>
          </View>
        )}
        
        {/* Quick Add Button */}
        <TouchableOpacity style={styles.quickAddButton}>
          <ShoppingCart size={14} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        
        <Text style={styles.seller} numberOfLines={1}>
          {product.sellerName}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Star size={10} color="#FFB800" fill="#FFB800" />
          <Text style={styles.rating}>
            {product.rating}
          </Text>
          <Text style={styles.reviewCount}>
            ({product.reviewCount})
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₺{product.price.toFixed(2)}</Text>
          {product.stock < 5 && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>Son {product.stock}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 4,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  quickAddButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A90A4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 3,
    lineHeight: 18,
  },
  seller: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 11,
    color: '#1A1A1A',
    fontWeight: '600',
    marginLeft: 3,
  },
  reviewCount: {
    fontSize: 11,
    color: '#999999',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A90A4',
  },
  stockBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 9,
    color: '#E74C3C',
    fontWeight: '600',
  },
});
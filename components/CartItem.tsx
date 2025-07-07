import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.seller}>by {item.product.sellerName}</Text>
        
        {item.selectedOptions && (
          <View style={styles.optionsContainer}>
            {Object.entries(item.selectedOptions).map(([key, value]) => (
              <Text key={key} style={styles.option}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}
        
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={16} color="#666" />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)}>
        <Trash2 size={20} color="#E74C3C" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  seller: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  optionsContainer: {
    marginBottom: 8,
  },
  option: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    paddingHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
});
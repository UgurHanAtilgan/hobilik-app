import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { ArrowLeft, CreditCard, MapPin, User } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handlePlaceOrder = () => {
    // Validate form
    if (!shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city) {
      Alert.alert('Error', 'Please fill in all shipping address fields');
      return;
    }

    if (!paymentMethod.cardNumber || !paymentMethod.expiryDate || !paymentMethod.cvv) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    // Simulate order placement
    Alert.alert(
      'Order Placed Successfully!',
      `Your order has been placed successfully. Total: $${total.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            router.push('/(tabs)');
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.product.title}</Text>
              <Text style={styles.itemDetails}>
                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
              </Text>
              <Text style={styles.itemTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#8B4513" />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={shippingAddress.fullName}
            onChangeText={(text) => setShippingAddress({...shippingAddress, fullName: text})}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={shippingAddress.street}
            onChangeText={(text) => setShippingAddress({...shippingAddress, street: text})}
          />
          
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={shippingAddress.city}
              onChangeText={(text) => setShippingAddress({...shippingAddress, city: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={shippingAddress.state}
              onChangeText={(text) => setShippingAddress({...shippingAddress, state: text})}
            />
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={shippingAddress.zipCode}
            onChangeText={(text) => setShippingAddress({...shippingAddress, zipCode: text})}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#8B4513" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={paymentMethod.cardNumber}
            onChangeText={(text) => setPaymentMethod({...paymentMethod, cardNumber: text})}
            keyboardType="numeric"
          />
          
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              value={paymentMethod.expiryDate}
              onChangeText={(text) => setPaymentMethod({...paymentMethod, expiryDate: text})}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={paymentMethod.cvv}
              onChangeText={(text) => setPaymentMethod({...paymentMethod, cvv: text})}
              keyboardType="numeric"
            />
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Cardholder Name"
            value={paymentMethod.cardholderName}
            onChangeText={(text) => setPaymentMethod({...paymentMethod, cardholderName: text})}
          />
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order - ${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
  },
  placeholder: {
    width: 40,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'Inter-SemiBold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 8,
    fontFamily: 'Inter-Regular',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    fontFamily: 'Inter-SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: 'Inter-Bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B4513',
    fontFamily: 'Inter-Bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  placeOrderButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
});
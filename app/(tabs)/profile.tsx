import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { mockUser } from '@/services/mockData';
import { User, Settings, Package, Heart, CreditCard, CircleHelp as HelpCircle, LogOut, Star, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  
  const currentUser = user || mockUser;

  const handleLogout = () => {
    dispatch(logout());
  };

  
  const profileOptions = [
    { icon: Package, label: 'Siparişlerim', onPress: () => {}, color: '#4A90A4' },
    { icon: Heart, label: 'Favorilerim', onPress: () => {}, color: '#FF6B6B' },
    { icon: CreditCard, label: 'Ödeme Yöntemleri', onPress: () => {}, color: '#4CAF50' },
    { icon: Settings, label: 'Ayarlar', onPress: () => {}, color: '#9C27B0' },
    { icon: HelpCircle, label: 'Yardım & Destek', onPress: () => {}, color: '#FF9800' },
  ];

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#4A90A4', '#357A8A']}
          style={styles.header}
        >
          <Text style={styles.title}>Profil</Text>
        </LinearGradient>
        
        <View style={styles.authContainer}>
          <View style={styles.authIconContainer}>
            <User size={60} color="#4A90A4" />
          </View>
          <Text style={styles.authTitle}>Hobilik'e Hoş Geldiniz</Text>
          <Text style={styles.authSubtitle}>
            Profilinize ve siparişlerinize erişmek için giriş yapın
          </Text>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#4A90A4', '#357A8A']}
          style={styles.header}
        >
          <Text style={styles.title}>Profil</Text>
        </LinearGradient>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{currentUser.firstName} {currentUser.lastName}</Text>
              <Text style={styles.email}>{currentUser.email}</Text>
              {currentUser.isSeller && (
                <View style={styles.sellerBadge}>
                  <Award size={12} color="#FFFFFF" />
                  <Text style={styles.sellerBadgeText}>Satıcı</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Sipariş</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Favori</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFB800" fill="#FFB800" />
                <Text style={styles.statNumber}>4.8</Text>
              </View>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionRow} onPress={option.onPress}>
              <View style={styles.optionLeft}>
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}15` }]}>
                  <option.icon size={20} color={option.color} />
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </View>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seller Section */}
        <View style={styles.sellerSection}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={styles.sellerGradient}
          >
            <Text style={styles.sectionTitle}>Satıcı Ol</Text>
            <Text style={styles.sellerDescription}>
              Platformumuzda el yapımı ürünlerini satan binlerce sanatkarımıza katıl
            </Text>
            <TouchableOpacity style={styles.sellerButton}>
              <Text style={styles.sellerButtonText}>Satmaya Başla</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#E74C3C" />
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 100, // Tab bar için extra boşluk
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  authIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  authButton: {
    backgroundColor: '#4A90A4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  sellerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90A4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  sellerBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 24,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  sellerSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sellerGradient: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sellerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 16,
  },
  sellerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sellerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
});
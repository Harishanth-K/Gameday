import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import MatchCard from '../components/MatchCard';
import EmptyState from '../components/EmptyState';

const FavoritesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const favorites = useSelector((state) => state.favorites.items);

  const handleMatchPress = (match) => {
    navigation.navigate('MatchDetail', { match });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: '#FF6B35',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
    },
    countBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    countText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    listContainer: {
      padding: 15,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          Your saved matches collection
        </Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {favorites.length} {favorites.length === 1 ? 'match' : 'matches'} saved
          </Text>
        </View>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idEvent}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            isFavorite={true}
            onPress={() => handleMatchPress(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="heart"
            title="No Favorites Yet"
            message="Start adding matches to your favorites from the home screen"
          />
        }
      />
    </View>
  );
};

export default FavoritesScreen;
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMatches } from '../store/matchesSlice';
import { useTheme } from '../hooks/useTheme';
import MatchCard from '../components/MatchCard';
import EmptyState from '../components/EmptyState';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { upcomingMatches, loading } = useSelector((state) => state.matches);
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = () => {
    dispatch(fetchUpcomingMatches());
  };

  const isFavorite = (matchId) => {
    return favorites.some((fav) => fav.idEvent === matchId);
  };

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
      backgroundColor: '#2E86AB',
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      color: colors.textSecondary,
      marginTop: 15,
      fontSize: 16,
      fontWeight: '500',
    },
  });

  if (loading && upcomingMatches.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>
          Loading exciting matches...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Matches</Text>
        <Text style={styles.headerSubtitle}>
          Never miss your favorite games
        </Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {upcomingMatches.length} matches available
          </Text>
        </View>
      </View>

      <FlatList
        data={upcomingMatches}
        keyExtractor={(item) => item.idEvent}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            isFavorite={isFavorite(item.idEvent)}
            onPress={() => handleMatchPress(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadMatches}
            colors={['#FF6B35']}
            tintColor="#FF6B35"
            title="Pull to refresh"
            titleColor={colors.textSecondary}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="calendar"
            title="No Matches Available"
            message="Pull down to refresh and check for new matches"
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
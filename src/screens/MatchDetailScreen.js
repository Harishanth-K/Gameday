import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, saveFavorites } from '../store/favoritesSlice';
import { useTheme } from '../hooks/useTheme';

const MatchDetailScreen = ({ route }) => {
  const { match } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.idEvent === match.idEvent));
  }, [favorites, match.idEvent]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(match.idEvent));
    } else {
      dispatch(addFavorite(match));
    }
    dispatch(saveFavorites());
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: '#FF6B35',
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    league: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 15,
      textAlign: 'center',
    },
    teamsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    teamInfo: {
      alignItems: 'center',
      flex: 1,
    },
    teamName: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: 15,
    },
    vsContainer: {
      alignItems: 'center',
      marginHorizontal: 20,
    },
    vs: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: '800',
      marginBottom: 8,
    },
    vsText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 12,
      fontWeight: '600',
    },
    badge: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    badgeText: {
      fontSize: 32,
      color: '#FFFFFF',
    },
    favoriteButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: 25,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 30,
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 15,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    infoIcon: {
      marginRight: 15,
      width: 24,
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: 15,
      color: colors.textSecondary,
      flex: 1,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '600',
    },
    description: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 24,
      fontWeight: '400',
    },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#4CAF50',
    },
    statusText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '700',
    },
    scoreContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    score: {
      fontSize: 32,
      fontWeight: '800',
      color: colors.text,
      marginVertical: 5,
    },
    scoreTeams: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.league}>{match.strLeague || 'Professional League'}</Text>

        <View style={styles.teamsContainer}>
          <View style={styles.teamInfo}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⚽</Text>
            </View>
            <Text style={styles.teamName}>{match.strHomeTeam || 'Home Team'}</Text>
          </View>

          <View style={styles.vsContainer}>
            <Text style={styles.vs}>VS</Text>
            <Text style={styles.vsText}>Match</Text>
          </View>

          <View style={styles.teamInfo}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⚽</Text>
            </View>
            <Text style={styles.teamName}>{match.strAwayTeam || 'Away Team'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={28}
            color={isFavorite ? '#FF6B35' : '#FFFFFF'}
            fill={isFavorite ? '#FF6B35' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Match Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Feather name="calendar" size={20} color="#FF6B35" />
            </View>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{formatDate(match.dateEvent)}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Feather name="clock" size={20} color="#FF6B35" />
            </View>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>{formatTime(match.strTime) || 'TBA'}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Feather name="map-pin" size={20} color="#FF6B35" />
            </View>
            <Text style={styles.infoLabel}>Venue</Text>
            <Text style={styles.infoValue}>{match.strVenue || 'TBA'}</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoIcon}>
              <Feather name="users" size={20} color="#FF6B35" />
            </View>
            <Text style={styles.infoLabel}>Season</Text>
            <Text style={styles.infoValue}>{match.strSeason || 'N/A'}</Text>
          </View>
        </View>

        {match.intHomeScore !== null && match.intAwayScore !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Final Score</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>
                {match.intHomeScore} - {match.intAwayScore}
              </Text>
              <Text style={styles.scoreTeams}>
                {match.strHomeTeam} vs {match.strAwayTeam}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Match Status</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{match.strStatus || 'Scheduled'}</Text>
          </View>
        </View>

        {match.strDescriptionEN && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Match Description</Text>
            <Text style={styles.description}>{match.strDescriptionEN}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MatchDetailScreen;
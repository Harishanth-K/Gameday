import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, saveFavorites } from '../store/favoritesSlice';
import { useTheme } from '../hooks/useTheme';
import { useSelector } from 'react-redux';

const MatchCard = ({ match, isFavorite, onPress }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFavorite(match.idEvent));
      const updatedFavorites = favorites.filter((fav) => fav.idEvent !== match.idEvent);
      dispatch(saveFavorites(updatedFavorites));
    } else {
      dispatch(addFavorite(match));
      const updatedFavorites = [...favorites, match];
      dispatch(saveFavorites(updatedFavorites));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    league: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    favoriteButton: {
      padding: 5,
    },
    matchInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    team: {
      flex: 1,
      alignItems: 'center',
    },
    teamBadge: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    teamBadgeText: {
      fontSize: 24,
    },
    teamName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
    vs: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textSecondary,
      marginHorizontal: 15,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 5,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    statusText: {
      fontSize: 11,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.league} numberOfLines={1}>
          {match.strLeague || 'League'}
        </Text>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Feather
            name="heart"
            size={20}
            color={isFavorite ? colors.primary : colors.textSecondary}
            fill={isFavorite ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.matchInfo}>
        <View style={styles.team}>
          <View style={styles.teamBadge}>
            <Text style={styles.teamBadgeText}>⚽</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={2}>
            {match.strHomeTeam || 'Home'}
          </Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.team}>
          <View style={styles.teamBadge}>
            <Text style={styles.teamBadgeText}>⚽</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={2}>
            {match.strAwayTeam || 'Away'}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <Feather name="calendar" size={14} color={colors.textSecondary} />
          <Text style={styles.dateText}>
            {formatDate(match.dateEvent)} {formatTime(match.strTime)}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{match.strStatus || 'Scheduled'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchCard;

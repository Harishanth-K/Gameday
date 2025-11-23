// API service for TheSportsDB
const API_KEY = '3'; // Free TheSportsDB API key
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

/**
 * Fetch upcoming matches for a specific league
 * @param {string} leagueId - The ID of the league (default: 4328 for English Premier League)
 * @returns {Promise} - Promise resolving to array of match events
 */
export const fetchUpcomingMatches = async (leagueId = '4328') => {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/eventsnextleague.php?id=${leagueId}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

/**
 * Fetch past matches for a specific league
 * @param {string} leagueId - The ID of the league
 * @returns {Promise} - Promise resolving to array of match events
 */
export const fetchPastMatches = async (leagueId = '4328') => {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/eventspastleague.php?id=${leagueId}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching past matches:', error);
    throw error;
  }
};

/**
 * Fetch details for a specific match
 * @param {string} matchId - The ID of the match event
 * @returns {Promise} - Promise resolving to match details object
 */
export const fetchMatchDetails = async (matchId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/lookupevent.php?id=${matchId}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.events ? data.events[0] : null;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};

/**
 * Search for teams by name
 * @param {string} teamName - The name of the team to search for
 * @returns {Promise} - Promise resolving to array of teams
 */
export const searchTeams = async (teamName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/searchteams.php?t=${encodeURIComponent(teamName)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.teams || [];
  } catch (error) {
    console.error('Error searching teams:', error);
    throw error;
  }
};

/**
 * Fetch team details
 * @param {string} teamId - The ID of the team
 * @returns {Promise} - Promise resolving to team details
 */
export const fetchTeamDetails = async (teamId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/lookupteam.php?id=${teamId}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.teams ? data.teams[0] : null;
  } catch (error) {
    console.error('Error fetching team details:', error);
    throw error;
  }
};

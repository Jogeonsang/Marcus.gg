import api from '../commons/apiUtil';

export const getSummonerInfo = (summonerName) => {
   return api.get(`/marcus-gg/summoner/summonerInfo/by-name/summonerName=${summonerName}`);
};

export const getSummonerGameList = (accountId) => {
   return api.get(`marcus-gg/summoner/gameList/by-account/${accountId}`);
};

export const getSummonerLeagueInfo = (encryptedSummonerId) => {
   return api.get(`marcus-gg/summoner/leagueInfo/by-summoner/${encryptedSummonerId}`);
}

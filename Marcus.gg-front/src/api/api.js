import api from '../commons/apiUtil';

export const getSummonerInfo = (summonerName) => {
   return api.get(`/marcus-gg/summoner/summonerInfo/by-name/summonerName=${summonerName}`);
};

export const getSummonerGameList = (accountId) => {
   return api.get(`/marcus-gg/summoner/gameList/by-account/${accountId}`);
};

export const getSummonerLeagueInfo = (encryptedSummonerId) => {
   return api.get(`/marcus-gg/summoner/leagueInfo/by-summoner/${encryptedSummonerId}`);
};

export const getRecentChampion = (accountId) => {
   return api.get(`/marcus-gg/summoner/championInfo/by-account/${accountId}`);
};


export const getChampionInfo = () => {
   return api.get(`http://ddragon.leagueoflegends.com/cdn/10.1.1/data/ko_KR/champion.json`);
};

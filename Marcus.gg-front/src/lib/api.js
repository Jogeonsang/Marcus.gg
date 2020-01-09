import api from '../Commons/ApiUtil';

export const getSummonerInfo = (summonerName) => {
   return api.get(`/marcus-gg/summoner/summonerInfo/by-name/summonerName=${summonerName}`);
};

export const getSummonerGameList = (accountId) => {
   return api.get(`marcus-gg/summoner/gameList/by-account/${accountId}`);
}

'use strict';
const axios = require('axios');
const {api_key} = require('./../Marcus.gg-server/src/config/config')

// static Data
module.exports.LeagueOfLegendItem = async event => {
  return axios
    .get('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/ko_KR/item.json')
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: response.data
          },
        )
      };
    });
};

module.exports.LeagueOfLegendChampion = async event => {
  return axios
    .get('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/ko_KR/champion.json')
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: response.data
          },
        )
      }
    })
}

// api
module.exports.SummonerInfo = async event => {
  let {summonerName} = event.pathParameters;
  summonerName = encodeURI(summonerName)
  return axios
    .get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: response.data
          },
        )
      }
    })
};

module.exports.SummonerLeagueInfo = async event => {
  const encryptedSummonerId = event.pathParameters.encryptedSummonerId;
  return axios
    .get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${api_key}`)
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: response.data
          },
        )
      }
    })
};

module.exports.SummonerRecentChampion = async event => {
  let { accountId, summonerName } = event.pathParameters;
  summonerName = encodeURI(summonerName);
  const getMatches = axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${api_key}&summonerName=${summonerName}`);
  return Promise.all([getMatches]).then(([fetchMatch]) => {
    const matchResult = fetchMatch.data.matches.reduce((b, c) => ((b[b.findIndex(d => d.champion.champion === c.champion)] || b[b.push({
      champion: c,
      count: 0
    }) - 1]).count++, b), []);
    // return axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${4092065836}?api_key=${api_key}`);
    fetchMatch.data.matches.map(match => [
      axios.get(`https://kr.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${api_key}`).then(res => {
        console.log('res:',res)
      })
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data: matchResult,
        },
      )
    }
  });
}
module.exports.SummonerGameList = async event => {
  const accountId = event.pathParameters.accountId;
  return axios
    .get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${api_key}`)
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: response.data
          },
        )
      }
    })
};

module.exports.SummonerDetailGameInfo = async event => {
  const gameId = event.pathParameters.gameId;
  return axios
    .get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
    .then(response => {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: response.data,
          },
        )
      }
    })
};

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

/*module.exports.SummonerRecentChampion = async event => {
  let { accountId, summonerName } = event.pathParameters;

  const recentParticipant = [];

  return axios
    .get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${api_key}`)
    .then(response => {
      const result = response.data.matches.reduce((b, c) => ((b[b.findIndex(d => d.champion.champion === c.champion)] || b[b.push({
        champion: c,
        count: 0
      }) - 1]).count++, b), []);
      for(let i in response.data.matches) {
        const { gameId } = response.data.matches[i];
        return axios
          .get(`https://kr.api.riotgames.com/lol/match/v4/matches/${response.data.matches[i].gameId}?api_key=${api_key}`)
          .then(each => {
            const {participants, participantIdentities} = each.data;
            const participantId = Object.values(participantIdentities).find(participant => participant.player.summonerName === summonerName).participantId
            return recentParticipant.push(participants.find(participant => participant.participantId === participantId));
            // participants.find(participant => participant.participantId === participantId)
          })
      }

      console.log('recentParticipant:',recentParticipant)
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            data: result
          },
        )
      }
    })
};*/

module.exports.SummonerRecentChampion = async event => {
  let {accountId, summonerName} = event.pathParameters;
  const enCodeSummonerName = encodeURI(summonerName);
  const getMatches = axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${api_key}&summonerName=${enCodeSummonerName}`);

  const championStats = async (matches) => {
    const recentParticipant = [];
    for (let i in matches) {
      const {gameId} = matches[i];
      await axios
        .get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
        .then(each => {
          const {participants, participantIdentities} = each.data;
          const participantId = Object.values(participantIdentities).find(participant => participant.player.summonerName === summonerName).participantId
          recentParticipant.push(participants.find(participant => participant.participantId === participantId));
        })
    }
    const result = recentParticipant.reduce((b,c) => ((b[b.findIndex(d => d.champion.championId === c.championId)] || b[b.push({
      champion: c,
      count: 0,
    }) - 1]).count++, b), []);
    return result;
  };

  return getMatches.then(async fetchMatch => {
    const {matches} = fetchMatch.data;
    return Promise.all(
      [championStats(matches)])
      .then(([championStats]) => {
        return {
          statusCode: 200,
          body: JSON.stringify(
            {
              data: championStats
            },
          )
        }
      })
  })
};

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

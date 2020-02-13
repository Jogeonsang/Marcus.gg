'use strict';
const axios = require('axios');
const moment = require('moment');
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
  let {accountId, summonerName} = event.pathParameters;
  const enCodeSummonerName = encodeURI(summonerName);
  const getMatches = axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${api_key}&summonerName=${enCodeSummonerName}`);
  const championStats = async (matches) => {
    const recentParticipant = [];
    await Promise.all(matches.map(async (matche) => {
      const {gameId} = matche
      await axios
        .get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
        .then(each => {
          const {participants, participantIdentities} = each.data;
          const participantId = Object.values(participantIdentities).find(participant => participant.player.summonerName === summonerName).participantId;

          recentParticipant.push(participants.find(participant => participant.participantId === participantId));
        })
    }));

    const resultObj = recentParticipant.reduce((obj, val) => {
      if (obj[val.championId]) {
        obj[val.championId].stats.kills = obj[val.championId].stats.kills + val.stats.kills;
        obj[val.championId].stats.deaths = obj[val.championId].stats.deaths + val.stats.deaths;
        obj[val.championId].stats.assists = obj[val.championId].stats.assists + val.stats.assists;
        obj[val.championId].stats.win = obj[val.championId].stats.win + val.stats.win;
        obj[val.championId].count = obj[val.championId].count + 1;
        obj[val.championId].victoryRate = Math.round(obj[val.championId].stats.win / obj[val.championId].count * 100)
      } else {
        obj[val.championId] = val;
        obj[val.championId].count = 1;
        obj[val.championId].stats.win = obj[val.championId].stats.win ? 1 : 0;
        obj[val.championId].victoryRate = Math.round(obj[val.championId].stats.win / obj[val.championId].count * 100)
      }
      return obj;

    }, []);
    return resultObj.filter(x => x).sort((a, b) => b.count - a.count);
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

module.exports.SummonerDetailGameInfo = async event => {
  let {accountId, summonerName, endIndex} = event.pathParameters;
  const enCodeSummonerName = encodeURI(summonerName);
  console.log(summonerName);
  const getMatches = axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${endIndex}&api_key=${api_key}`);
  const setMatchDetail = async (matches) => {
    const matchDetail = [];
    const recentRecordDetail = [];
    await Promise.all(matches.map(async (matche) => {
      const {gameId, queue, lane, timestamp} = matche;
      await axios
        .get(`https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${api_key}`)
        .then(each => {
          const {participants, participantIdentities, gameDuration, queueId} = each.data;
          const participantId = Object.values(participantIdentities).find(participant => participant.player.summonerName.toLowerCase() === summonerName.toLowerCase()).participantId;
          const teamId = Object.values(participants).find(participant => participant.participantId === participantId).teamId;
          const totalKills = participants.reduce((a,b) => {
            if(teamId === b.teamId) {
              a.totalKills = a.totalKills + b.stats.kills;
            };
            return a
          }, {totalKills: 0});
          matchDetail.push({
            participant: participants.find(participant => participant.participantId === participantId),
            participantId: participantId,
            gameId: gameId,
            gameDuration: gameDuration,
            queue: queue,
            lane: lane,
            timestamp: timestamp,
            teamId: teamId,
            totalKills: totalKills.totalKills
          });
        })
    }));
    return matchDetail.sort((a, b) => b.timestamp - a.timestamp);

    };
  return getMatches.then(async fetchMatch => {
    const {matches} = fetchMatch.data;
    return Promise.all(
      [setMatchDetail(matches)])
      .then(([matchDetails]) => {
        return {
          statusCode: 200,
          body: JSON.stringify(
            {
              data: matchDetails
            }
          )
        }
      })
  })
};


module.exports.SummonerGameList = async event => {
  const {accountId, endIndex} = event.pathParameters
  return axios
    .get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${endIndex}&api_key=${api_key}`)
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

export const getQueueType = (queueId) => {
  switch (queueId) {
    case 0:
      return '커스텀 게임';
    case 420:
      return '개인/랭크 게임';
    case 440:
      return '자유/랭크 게임';
    case 900:
      return '우르프';
    case 920:
      return '포로킹';
    case 450:
      return '칼바람나락';
    default:
      return '이벤트게임';
  }
};

export const getPlayTime = (gameDuration) => {
  const minute = Math.round(gameDuration / 60);
  const second = Math.round(gameDuration % 60);
  return `${minute}:${second}`
}

export const getTierName = (tier) => {
  switch (tier) {
    case 'IRON':
      return '아이언';
    case 'BRONZE':
      return '브론즈';
    case 'SILVER':
      return '실버';
    case 'GOLD':
      return '골드';
    case 'PLATINUM':
      return '플레티넘'
    case 'DIAMOND':
      return '다이아몬드'
    case 'MASTER':
      return '마스터';
    case 'GRANDMASTER':
      return '그랜드마스터';
    case 'CHALLENGER':
      return '챌린저';
    default:
      return 'UN RANKED'
  }
};

export const getTierColor = (tier) => {
  switch (tier) {
    case 'IRON':
      return '#94868B';
    case 'BRONZE':
      return '#B97451';
    case 'SILVER':
      return '#A2C0C7';
    case 'GOLD':
      return '#F1A64D';
    case 'PLATINUM':
      return '#63B7B3'
    case 'DIAMOND':
      return '#738DF9';
    case 'MASTER':
      return '#9D5DDD';
    case 'GRANDMASTER':
      return '#EF4F4F';
    case 'CHALLENGER':
      return '#F4C873';
  }
}

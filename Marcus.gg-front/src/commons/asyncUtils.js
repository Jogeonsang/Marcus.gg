export const customAsync = (api, m) => {
  return new Promise(r => setTimeout(() => r(api, m)));
}

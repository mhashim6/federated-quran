// this is intentional;
// the public data model doesn't necessarily have to be the same internally
const surahModel = ({ englishName, number, ...rest }) => ({
  name: englishName,
  index: number,
  ...rest,
});

export { surahModel };

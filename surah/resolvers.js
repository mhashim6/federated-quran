import quranSurahs from "./surahs.json" assert { type: "json" };

// this is intentional; the public data model doesn't have to be the same internally
const surahModel = ({ englishName, number, ...rest }) => ({
  name: englishName,
  index: number,
  ...rest,
});

export default {
  Query: {
    surahs: async (parent) => quranSurahs.map(surahModel),
    getSurah: async (parent, { index }) => surahModel(quranSurahs[index]),
  },
};

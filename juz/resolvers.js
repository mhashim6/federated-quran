import quranJuzs from "./juzs.json" assert { type: "json" };

export default {
  Query: {
    juzs: async (parent) => quranJuzs,
    getJuz: async (parent, { index }) => quranJuzs[index],
  },
};

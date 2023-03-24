import fs from "fs";

const quranJuzs = JSON.parse(fs.readFileSync("./juzs.json"));

export default {
  Query: {
    juzs: async (parent) => quranJuzs,
    getJuz: async (parent, { index }) =>
      quranJuzs.find((it) => it.number == index),
  },
  Juz: {
    surah(reference) {
      const { surahIndex } = reference;
      return { __typename: "Surah", index: surahIndex };
    },
  },
};

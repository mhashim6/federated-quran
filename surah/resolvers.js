import fs from "fs";
import { surahModel } from "./utils.js";

const quranSurahs = JSON.parse(fs.readFileSync("./surahs.json"));

export default {
  Query: {
    surahs: async (parent) => quranSurahs.map(surahModel),
    getSurah: async (parent, { index }) =>
      surahModel(quranSurahs.find((it) => it.number == index)),
  },
  Surah: {
    __resolveReference(reference) {
      const { index } = reference;
      return surahModel(quranSurahs.find((it) => it.number == index));
    },
  },
};

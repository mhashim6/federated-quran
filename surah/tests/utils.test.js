import { surahModel } from "../utils";

const surah = {
  englishName: "Al-Baqara",
  number: 2,
  numberOfAyahs: 286,
  revelationType: "Medinan",
};

test("surah should be mapped correctly", () => {
  expect(surahModel(surah)).toEqual({
    name: "Al-Baqara",
    index: 2,
    numberOfAyahs: 286,
    revelationType: "Medinan",
  });
});

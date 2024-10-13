import { useCallback } from "react";

const specialCharacterMap = new Map([
  ["w", new Set(["w", "ŵ"])],
  ["W", new Set(["W", "Ŵ"])],
  ["e", new Set(["e", "ë", "é", "è", "ê", "ě", "ẽ", "ē", "ė", "ę"])],
  ["E", new Set(["E", "Ë", "É", "È", "Ê", "Ě", "Ẽ", "Ē", "Ė", "Ę"])],
  ["r", new Set(["r", "ř"])],
  ["R", new Set(["R", "Ř"])],
  ["t", new Set(["t", "ț", "ť", "þ"])],
  ["T", new Set(["T", "Ț", "Ť", "Þ"])],
  ["y", new Set(["y", "ÿ", "ŷ", "ý"])],
  ["Y", new Set(["Y", "Ÿ", "Ŷ", "Ý"])],
  ["u", new Set(["u", "ų", "ů", "ű", "ū", "ũ", "ü", "ú", "ù", "û", "ǔ"])],
  ["U", new Set(["U", "Ų", "Ů", "Ű", "Ū", "Ũ", "Ü", "Ú", "Ù", "Û", "Ǔ"])],
  ["i", new Set(["i", "į", "ı", "ī", "ĩ", "ǐ", "ï", "í", "ì", "î"])],
  ["I", new Set(["I", "Į", "İ", "Ī", "Ĩ", "Ǐ", "Ï", "Í", "Ì", "Î"])],
  ["o", new Set(["o", "ő", "ō", "õ", "ø", "œ", "ǒ", "ö", "ô", "ó", "ò"])],
  ["O", new Set(["O", "Ő", "Ō", "Õ", "Ø", "Œ", "Ǒ", "Ö", "Ô", "Ó", "Ò"])],
  ["a", new Set(["a", "æ", "ã", "å", "ā", "ă", "ą", "à", "á", "â", "ä", "ǎ"])],
  ["A", new Set(["A", "Æ", "Ã", "Å", "Ā", "Ă", "Ą", "À", "Á", "Â", "Ä", "Ǎ"])],
  ["s", new Set(["s", "ß", "ş", "ș", "ś", "š"])],
  ["S", new Set(["S", "ẞ", "Ś", "Š", "Ş", "Ș"])],
  ["d", new Set(["d", "ď", "ð"])],
  ["D", new Set(["D", "Ď", "Ð"])],
  ["g", new Set(["g", "ğ", "ġ"])],
  ["G", new Set(["G", "Ğ", "Ġ"])],
  ["h", new Set(["h", "ħ"])],
  ["H", new Set(["H", "Ħ"])],
  ["k", new Set(["k", "ķ"])],
  ["K", new Set(["K", "Ķ"])],
  ["l", new Set(["l", "ľ", "ļ", "ł"])],
  ["L", new Set(["L", "Ľ", "Ļ", "Ł"])],
  ["z", new Set(["z", "ź", "ž", "ż"])],
  ["Z", new Set(["Z", "Ź", "Ž", "Ż"])],
  ["c", new Set(["c", "ç", "ć", "č", "ċ"])],
  ["C", new Set(["C", "Ç", "Ć", "Č", "Ċ"])],
  ["n", new Set(["n", "ň", "ņ", "ń", "ñ"])],
  ["N", new Set(["N", "Ň", "Ņ", "Ń", "Ñ"])],
  [`"`, new Set([`"`, `“`, `”`])],
  [`'`, new Set([`'`, `‘`, `’`])],
]);

export const useMatchCharacters = ({
  easySpecialCharacters = true,
}: {
  easySpecialCharacters: boolean;
}) => {
  const matchCharacters = useCallback(
    ({
      inputCharacter,
      characterToMatch,
    }: {
      inputCharacter: string;
      characterToMatch: string;
    }) => {
      if (easySpecialCharacters) {
        return (
          specialCharacterMap.get(inputCharacter)?.has(characterToMatch) ||
          inputCharacter === characterToMatch
        );
      }
      return inputCharacter === characterToMatch;
    },
    [easySpecialCharacters]
  );
  return { matchCharacters };
};

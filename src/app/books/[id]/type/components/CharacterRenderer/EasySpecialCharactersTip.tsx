import { styled } from "next-yak";
import { theme } from "@/app/theme";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import { robotoMono } from "@/app/theme/fonts";

export const EasySpecialCharactersTipOld = `
  a: (æ, ã, å, ā, ă, ą, à, á, â, ä, ǎ) | A: (Æ, Ã, Å, Ā, Ă, Ą, À, Á, Â, Ä, Ǎ)\n
  c: (ç, ć, č, ċ) | C: (Ç, Ć, Č, Ċ)\n
  d: (ď, ð) | D: (Ď, Ð)\n
  e: (ë, é, è, ê, ě, ẽ, ē, ė, ę) | E: (Ë, É, È, Ê, Ě, Ẽ, Ē, Ė, Ę)\n
  g: (ğ, ġ) | G: (Ğ, Ġ)\n
  h: (ħ) | H: (Ħ)\n
  i: (į, ı, ī, ĩ, ǐ, ï, í, ì, î) | I: (Į, İ, Ī, Ĩ, Ǐ, Ï, Í, Ì, Î)\n
  k: (ķ) | K: (Ķ)\n
  l: (ľ, ļ, ł) | L: (Ľ, Ļ, Ł)\n
  n: (ň, ņ, ń, ñ) | N: (Ň, Ņ, Ń, Ñ)\n
  o: (ő, ō, õ, ø, œ, ǒ, ö, ô, ó, ò, o) | O: (Ő, Ō, Õ, Ø, Œ, Ǒ, Ö, Ô, Ó, Ò)\n
  r: (ř) |  R: (Ř)\n
  s: (ß, ş, ș, ś, š) | S: (ẞ, Ś, Š, Ş, Ș)\n
  t: (ț, ť, þ) | T: (Ț, Ť, Þ)\n
  u: (ų, ů, ű, ū, ũ, ü, ú, ù, û, ǔ) | U: (Ų, Ů, Ű, Ū, Ũ, Ü, Ú, Ù, Û, Ǔ)\n
  w: (ŵ) | W: (Ŵ)\n
  y: (ÿ, ŷ, ý) | Y: (Ÿ, Ŷ, Ý)\n
  z: (ź, ž, ż) | Z: (Ź, Ž, Ż)
`;

const specialCharacterObject = {
  a: ["æ", "ã", "å", "ā", "ă", "ą", "à", "á", "â", "ä", "ǎ"],
  A: ["Æ", "Ã", "Å", "Ā", "Ă", "Ą", "À", "Á", "Â", "Ä", "Ǎ"],
  c: ["ç", "ć", "č", "ċ"],
  C: ["Ç", "Ć", "Č", "Ċ"],
  d: ["ď", "ð"],
  D: ["Ď", "Ð"],
  e: ["ë", "é", "è", "ê", "ě", "ẽ", "ē", "ė", "ę"],
  E: ["Ë", "É", "È", "Ê", "Ě", "Ẽ", "Ē", "Ė", "Ę"],
  g: ["ğ", "ġ"],
  G: ["Ğ", "Ġ"],
  h: ["ħ"],
  H: ["Ħ"],
  i: ["į", "ı", "ī", "ĩ", "ǐ", "ï", "í", "ì", "î"],
  I: ["Į", "İ", "Ī", "Ĩ", "Ǐ", "Ï", "Í", "Ì", "Î"],
  k: ["ķ"],
  K: ["Ķ"],
  l: ["ľ", "ļ", "ł"],
  L: ["Ľ", "Ļ", "Ł"],
  n: ["ň", "ņ", "ń", "ñ"],
  N: ["Ň", "Ņ", "Ń", "Ñ"],
  o: ["ő", "ō", "õ", "ø", "œ", "ǒ", "ö", "ô", "ó", "ò"],
  O: ["Ő", "Ō", "Õ", "Ø", "Œ", "Ǒ", "Ö", "Ô", "Ó", "Ò"],
  r: ["ř"],
  R: ["Ř"],
  s: ["ß", "ş", "ș", "ś", "š"],
  S: ["ẞ", "Ś", "Š", "Ş", "Ș"],
  t: ["ț", "ť", "þ"],
  T: ["Ț", "Ť", "Þ"],
  u: ["ų", "ů", "ű", "ū", "ũ", "ü", "ú", "ù", "û", "ǔ"],
  U: ["Ų", "Ů", "Ű", "Ū", "Ũ", "Ü", "Ú", "Ù", "Û", "Ǔ"],
  w: ["ŵ"],
  W: ["Ŵ"],
  y: ["ÿ", "ŷ", "ý"],
  Y: ["Ÿ", "Ŷ", "Ý"],
  z: ["ź", "ž", "ż"],
  Z: ["Ź", "Ž", "Ż"],
};

// Some characters appear large because they don't exist in Roboto Mono
const largeChars = ["ǎ", "Ǎ", "ǐ", "Ǐ", "ǒ", "Ǒ", "ǔ", "Ǔ"];

export const EasySpecialCharactersTip = () => {
  return (
    <StyledContainer>
      <StyledLabelContainer>
        {`When 'Easy Special Characters' is on, special characters are mapped to
        standard English characters:`}
      </StyledLabelContainer>
      <StyledFlexContainer>
        {map(Object.keys(specialCharacterObject), (key) => (
          <div key={`${key}_${uniqueId()}`}>
            <StyledBold>{key}:</StyledBold>
            {map(specialCharacterObject[key], (char) => (
              <StyledThin
                charIsLarge={largeChars.includes(char)}
                key={`${key}_${char}_${uniqueId()}`}
              >
                {char}
              </StyledThin>
            ))}
          </div>
        ))}
      </StyledFlexContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  font-size: 1rem;
  max-width: 50rem;
  padding: 1rem;
  background: ${() => theme.ultraDarkPurple};
  border-radius: 0.5rem;
  cursor: default;
`;

const StyledLabelContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: ${() => robotoMono.style.fontFamily}, monosapce;
`;

const StyledBold = styled.span`
  font-weight: 700;
  margin-right: 0.5rem;
  color: ${() => theme.white};
`;

interface ExtraProps {
  charIsLarge: boolean;
}

const StyledThin = styled.span<ExtraProps>`
  margin-right: 0.5rem;
  color: ${() => theme.gray};
  font-size: ${({ charIsLarge }) => (charIsLarge ? "0.75rem" : "1rem")};
`;

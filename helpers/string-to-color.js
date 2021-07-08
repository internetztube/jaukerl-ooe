import {v5 as uuidv3} from 'uuid'
// https://stackoverflow.com/a/3426956/2421121
const hashCode = (str) => { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

const intToRGB = (i) => {
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

const stringToColor = (string) => {
  const namespace = 'e038bf3a-b9ae-4557-942c-07685745507c'
  let result = string
  result = uuidv3(result, namespace)
  result = hashCode(result)
  result = intToRGB(result)
  return `#${result}`
}

export default stringToColor

export const useArrayToFill = () => {
  const arrayToFill = [];
  const colorIndex = [
    48, 2, 3, 2, 6, 2, 3, 2, 3, 2, 6, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2, 3,
    2, 6, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2,
  ];
  // 2 is slateblue
  // 3 is dogerblue
  // 6 is darkkhaki
  // 48 is salmon
  for (let index = 0; index <= colorIndex.length; index++) {
    if (colorIndex[index] === 48) arrayToFill.push("salmon");
    if (colorIndex[index] === 6) arrayToFill.push("darkkhaki");
    if (colorIndex[index] === 3) arrayToFill.push("dodgerblue");
    if (colorIndex[index] === 2) arrayToFill.push("slateblue");
  }
  return arrayToFill;
};

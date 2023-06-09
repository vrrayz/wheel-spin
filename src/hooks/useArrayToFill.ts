import { spinAnimation } from "../helpers/spinAnimation";

export const useArrayToFill = () => {
  let color = '';
  const colorIndex = [
    48, 2, 3, 2, 6, 2, 3, 2, 3, 2, 6, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2, 3,
    2, 6, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2,
  ];
  const arrObj = [];
  let actualRotateRange = 0;
  let currentRotateRange = 0;
  let previousRotateRange = 0;
  // 2 is slateblue
  // 3 is dogerblue
  // 6 is darkkhaki
  // 48 is salmon
  for (let index = 0; index < colorIndex.length; index++) {
    if (colorIndex[index] === 48) color = "salmon";
    if (colorIndex[index] === 6) color = "darkkhaki";
    if (colorIndex[index] === 3) color = "dodgerblue";
    if (colorIndex[index] === 2) color = "green";

    previousRotateRange = currentRotateRange;
    currentRotateRange -= 7.49999999;
    actualRotateRange = (currentRotateRange + previousRotateRange) / 2;

    arrObj.push({
      colorIndex: colorIndex[index],
      color: color,
      rotate: actualRotateRange,
    });
  }
  // modify this array to be an array of objects [{
  //   color: 'color',
  //   rotate: -(7.5) the negative will increment to the last point
  // }]
  const spinValues = {currentSpinTime:10,currentKeyFrame:spinAnimation(-360),animationCount:'infinite',animationTimingFunction:'linear'}
  const multipliers = [
    {multiple: 48, color: 'salmon', isActive: false},
    {multiple: 6, color: 'darkkhaki', isActive: false},
    {multiple: 3, color: 'dodgerblue', isActive: false},
    {multiple: 2, color: 'green', isActive: false},
  ]
  return { spinValues, arrObj, multipliers };
};

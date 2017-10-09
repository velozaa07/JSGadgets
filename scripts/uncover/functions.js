function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random()*(max - min + 1)) + min;
}


function hsRandLight(hue, sat){
  let light = (getRandomInt(30, 90)*1) + "%";
  return "hsl("+ hue +", " + sat + ", " + light + ")";
}

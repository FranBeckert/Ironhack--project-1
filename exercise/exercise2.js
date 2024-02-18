function lastDayIsFriday(initialYear, endYear) {
  let fridayCount = 0;
  for (let year= initialYear; year<= endYear; year++) {
    for (let month= 1; month <= 12; month++) {
      let lastDay = new Date(year, month,0).getDay();
      if(lastDay === 5) {
        fridayCount++
      }
    }
  }
  return fridayCount;
}

console.log(lastDayIsFriday(1901, 2000));

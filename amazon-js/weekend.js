//import dayjs from "./dayjs.min.js";
/*
how to delivery product all days except weekends: saturday and sunday?
1. get the day to delivery
2. if the day to delivery is weekend add one day and then test untill delivery date is not weekend
3. return delivery date optained in step two

*/
export function deliveryDateGenrator(day) {
  let date = dayjs().add(day, 'days').format('dddd');
  let makeUnweekend;
  if (date === 'Saturday') {
    makeUnweekend = 2;
  }
  else if (date === 'Sunday') {
    makeUnweekend = 1;
  }
  else {
    makeUnweekend = 0;
  }
  let totalDate = makeUnweekend + day;
  let deliveryDate = dayjs().add(totalDate, 'days').format('dddd, MMM D');

  return deliveryDate;

}


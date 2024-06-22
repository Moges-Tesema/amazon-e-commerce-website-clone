import { centsToDollar } from "../cent-to-dollar.js";
console.log("test suite: centsToDollar function testing.");
if(centsToDollar(2283434)==='22834.34'){
  console.log("passed");
  
}
else{
  console.log(centsToDollar(2283434));
  console.log("failed");
}
if(centsToDollar(0)==='0.00'){
  console.log("passed");
}
else{
  console.log("fail");
}
if(centsToDollar(21000.9)==='210.01'){
 
  console.log("passed");
}
else{
  console.log(centsToDollar(21000.9));
  console.log("failed");
}
console.log("test suit: product payment summary test.");


const xhr = new XMLHttpRequest();
xhr.open('GET','https://www.w3schools.com/REACT/');
xhr.addEventListener('load',()=>{
  console.log(xhr.response);
});
xhr.send();


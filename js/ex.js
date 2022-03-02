

function includeHTML(){
  const includeArea = document.querySelectorAll('[data-include]');
  console.log('ddd')

  return function test(){
    for(let dom of includeArea){
      const url = dom.dataset.include;
      fetch(url)
      .then(response => response.text())
      .then(data =>{
          dom.innerHTML = data;
          dom.removeAttribute('data-include');
          const header = document.querySelector("header");
          const top = header.querySelector(".top");
          console.log(header)
          console.log(top)
        });
      } 
  }
  
  // const header = document.querySelector("header");
  // console.log(header)      
}
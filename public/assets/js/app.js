
//! import products
import { data } from "./products.js";

//! for element selector
function $(e) {
  return document.querySelectorAll(e);
}

//! for add product to dom
function addProductToDom(type,products){

  // dom loaded and add all product to dom
  if((products.length === 0) && (type === 'category')) {
    products = data;
  }

  // product title not found reset product dom
  if((products.length === 0) && (type === 'input')) {
    $('#products')[0].innerHTML = '';
    return
  }

  // add product to dom
  let html = '';
  products.forEach(p => {
    html += `<div class="card w-[350px] card-bordered lg:w-full h-[400px] bg-base-100 shadow-xl">
    <figure><img src=${p.image} alt=${p.image}/></figure>
    <div class="card-body px-5 py-4">
      <h2 class="card-title">${p.title}</h2>
      <p>${p.description}</p>
      <div class="card-actions items-center justify-between">
        <span class="font-medium text-xl">${p.price} $</span>   
        <span class="font-medium text-xl">${p.category}</span>     
      </div>
    </div>
    </div>`;
    $('#products')[0].innerHTML = html;
  });
}

//* add all product to dom
addProductToDom('category',[]);

//* filter product with category
const select = Array.from($('.tabs > a'));
const click = (e) => {
  select.forEach(i => {
    i.classList.remove('tab-active');
  });
  e.currentTarget.classList.add('tab-active');
  const category = e.currentTarget.innerText;
  const filterCategoy = data.filter((e)=>{
    return e.category == category;
  });
  addProductToDom('category',filterCategoy);
}
select.forEach(i => {
  i.addEventListener('click', click)
});

//* filter product with input value
$('#input')[0].addEventListener('input', (e)=> {

  const inputVaule = e.currentTarget.value;
  
  // filter tab active products
  const filterCategoy = data.filter((e)=>{
    if($('.tab-active')[0].innerText === 'all') {
      return e;
    }
    return e.category == $('.tab-active')[0].innerText;
  });

  // filter product with input value 
  let filterTitle = filterCategoy.filter((e)=>{
    return e.title.indexOf(inputVaule) !== -1;
  });

  // add to dom 
  addProductToDom('input',filterTitle);
});
import { pokemons } from "./pokeData.js";

const body = document.querySelector("body");
const divContent = document.createElement("div");
const titlePokemon = document.createElement("div");
const mainCar = document.createElement("div");
const titleCar = document.createElement("p");
const shopContent = document.createElement("div");
const iconShop = document.createElement("div");
const unitsPurchased = document.createElement("div");
const toPurchased = document.createElement("a");
const iconBag = document.createElement("div");
const closeMainCar = document.createElement("div");
let carShop = JSON.parse(localStorage.getItem("Pokemons")) || [];
let showBag = true;
let showUnits = false;
let unitsBuys = 0;

body.appendChild(titlePokemon);
body.appendChild(divContent);
body.appendChild(iconBag);
body.appendChild(mainCar);
mainCar.append(closeMainCar);
mainCar.append(titleCar);
mainCar.append(shopContent);
mainCar.append(toPurchased);
shopContent.append(iconShop);
shopContent.append(unitsPurchased);

toPurchased.setAttribute("href", "./storage.html");
toPurchased.setAttribute("target", "_self");
closeMainCar.setAttribute("title", "close");

body.style =
  "display:flex; flex-direction:column;align-items:center;min-width:320px;font-family:Roboto, Geneva, Tahoma, sans-serif";
titlePokemon.style = `width:40%; height:8rem;background-image: url('./img/titulo.png');background-repeat:no-repeat;background-position:center;background-size:60%;margin-top:2%;margin-bottom:1%`;
divContent.style =
  "display:flex;flex-wrap: wrap;justify-content:center;height:auto;width:90%;gap:10px";
titleCar.innerText = "COMPRADOS";
titleCar.style =
  "font-size:1.4rem; text-align:center;font-weight:800;letter-spacing: 2px;";
iconBag.classList.add("bag");
mainCar.style = "display:none;text-decoration:none";
closeMainCar.style =
  "display:flex;position:absolute;top:0px;right:5px;color:white; font-weight:400;font-size:1rem;cursor:pointer";
closeMainCar.innerText = "x";
shopContent.style = `border: white solid 2px;width:100%;height:80px; color:white; text-align:center; border-radius:6px;display:flex; justify-content:center;align-items:center;`;
iconShop.style = `background: url(./img/iconPokebola.png);background-repeat:no-repeat;background-position:center;background-size:50%; width: 50%; height:100%`;
unitsPurchased.style =
  "width:50%;display:flex; justify-content:center; align-items:center;font-size:40px; font-weight:700; border-left:white solid 2px; height:inherit ";
unitsPurchased.innerText = "0";
toPurchased.style =
  "text-decoration:none; font-size:1.1rem;font-weight:800;color:white;padding:4px";
toPurchased.innerText = "Ver compra >";

closeMainCar.addEventListener("click", () => {
  showBag = true;
  displayCar();
  return;
});

iconBag.addEventListener("click", () => {
  showBag = false;
  showUnits = true;
  if (carShop.length > 0) {
    displayCar();
    return;
  }
  return
});

const displayCar = () => {

  let count = 0;
  carShop.forEach((i) => {
    count += i.cantidad;
    return (unitsBuys = count);
  });

  if (carShop.length < 1) {
    iconBag.classList.remove("bag","pulsate-bck");
    iconBag.classList.add("hidden");
    return;
  }
  if (showBag === false && showUnits) {
    mainCar.style =
      "padding-top:25px;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;position:fixed;top:10px;right:10px; background-color:#07010ccb; border-radius:6px";
    unitsPurchased.innerText = unitsBuys;
    iconBag.classList.remove("bag","pulsate-bck");
    iconBag.classList.add("hidden");
    return;
  } else {
    mainCar.style = "display:none;";
    iconBag.classList.remove("hidden");
    iconBag.classList.add("bag","pulsate-bck");
  }
  return
};

const createCard = () => {
  pokemons.forEach((pokemon) => {
    const divCard = document.createElement("div");
    const name = document.createElement("h5");
    const imagen = document.createElement("img");
    const btn = document.createElement("button");

    name.innerText = pokemon.name;
    pokemon.cantidad = 1;
    imagen.src = pokemon.img;
    btn.id = pokemon.id;
    divContent.appendChild(divCard);
    divCard.appendChild(name);
    divCard.appendChild(imagen);
    divCard.appendChild(btn);
    divCard.style = `width:180px;height:240px; display:flex; flex-direction:column; align-items:center;justify-content: space-between; border-radius:8px;background-image: Url('./img/pokebola.png'); background-position:center;background-size:cover`;
    name.style =
      "width:fit-content;height:1%;margin-top:21%;margin-left:7%;color:black;text-transform:capitalize;font-size:14px;font-weight: 800;letter-spacing:1px";

    btn.style =
      "width:fit-content;margin-top:3%;margin-left:8%;font-size:12px;font-weight:700;padding:2px;border-radius:4px;cursor:pointer";
    btn.innerText = "Comprar";
    iconBag.classList.remove("pulsate-bck");
    iconBag.classList.add("pulsate-bck");
  
    divCard.classList.add("shadow-pop");
    btn.addEventListener("click", () => {
      mainCar.classList.add("pulsate-bck");
      setTimeout(() => {
        mainCar.classList.remove("pulsate-bck");
      }, 500);
      let elementFound = carShop.find((item) => item.name === pokemon.name);
      if (elementFound) {
        elementFound.cantidad += 1;
      } else {
        carShop.unshift(pokemon);
      }
      localStorage.setItem("Pokemons", JSON.stringify(carShop));
      return displayCar();
    });
  }); //end forEach
}; //end createCard

createCard();
displayCar();

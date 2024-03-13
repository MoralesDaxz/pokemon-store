const body = document.querySelector("body");
const contentPokemons = document.createElement("div");
const iconBack = document.getElementById("iconBack");
const mainTitle = document.createElement("h1");
const emptycar = document.createElement("a");
let pokemonStack = JSON.parse(localStorage.getItem("Pokemons")) || [];

body.appendChild(mainTitle);
body.style =
  "display:flex; flex-direction:column;align-items:center;min-width:320px;background-color:#07010c;font-family:Roboto, Geneva, Tahoma, sans-serif";
iconBack.style = "display:block;position:absolute;top:20px;left:5%;";
emptycar.style = "display:none";
mainTitle.style =
  "border-bottom: #ffffffc2 solid 4px;min-width:fit-content;font-weight:800px;font-size:3rem;color:white;text-align:center;padding:20px 20px";
mainTitle.innerHTML =
  "<h2 class='mainTitle'>POKEMONS <span>-</span> Almacen <span id='quantity'> </span></h1>";
emptycar.setAttribute("href", "./index.html");

const alertEmptyCar = () => {
  if (pokemonStack.length < 1) {
    body.appendChild(emptycar);
    emptycar.innerHTML = `<p>Carro de compras vacio, <span style="text-decoration:underline">volver a tienda!</span></p>`;
    emptycar.style =
      "margin-top:10%;display:flex;font-size:1.5rem;font-weight:900;text-align:center;color:white;cursor:pointer;text-decoration:none";
    return;
  }
  emptycar.style = "display:none";
  return;
};

const pokemonsPurchased = () => {
  body.appendChild(contentPokemons);
  pokemonStack.forEach((pokemon) => {
    const card = document.createElement("div");
    const titlePokemon = document.createElement("h5");
    const imagen = document.createElement("img");
    const contentBottons = document.createElement("div");
    const btnSubtract = document.createElement("button");
    const showUnit = document.createElement("p");
    const btnAdd = document.createElement("button");
    titlePokemon.innerText = pokemon.name;
    imagen.src = pokemon.img;
    btnSubtract.id = pokemon.id;
    btnAdd.id = pokemon.id;
    contentPokemons.appendChild(card);
    card.appendChild(titlePokemon);
    card.appendChild(imagen);
    card.appendChild(contentBottons);
    contentBottons.appendChild(btnSubtract);
    contentBottons.appendChild(showUnit);
    contentBottons.appendChild(btnAdd);
    contentPokemons.style =
      "margin-top:5%;display:flex;flex-wrap: wrap;justify-content:center;height:auto;width:90%;gap:10px";
    card.style = `width:180px;height:240px;display:flex;flex-direction:column; align-items:center;justify-content: space-between;  border-radius:8px;background-image: url('./img/pokebola.png'); background-position:center;background-size:cover`;
    card.classList.add("shadow-pop");
    titlePokemon.style =
      "width:fit-content;height:1%;margin-top:21%;margin-left:7%;color:black;text-transform:capitalize;font-size:14px;letter-spacing:1px;font-weight: 800";
    contentBottons.style =
      "margin-left:7%;display:flex;justify-content:center;align-items:baseline;margin-bottom:-4px";
    btnSubtract.style =
      "width:40px;height:25px;font-size:15px;font-weight:700;padding:2px;border-radius:4px; cursor:pointer";
    showUnit.style =
      "color:white; width:100%;height:25px;margin:0px;text-align:center; font-weight:700";
    btnSubtract.innerText = "-";
    btnAdd.style =
      "width:40px;height:25px;font-size:15px;font-weight:700;padding:2px;border-radius:4px; cursor:pointer";
    btnAdd.innerText = "+";
    showUnit.innerText = pokemon.cantidad;
    btnAdd.setAttribute("onclick", "addQuantity()");
    btnSubtract.setAttribute("onclick", "substractQuantity()");
  });
};

const checkQuantityZero = () => {
  pokemonStack.forEach((pokemon) => {
    if (pokemon.cantidad === 0) {
      let filtro = pokemonStack.filter((item) => item.cantidad >= 1);
      localStorage.setItem("Pokemons", JSON.stringify(filtro));
      pokemonStack = JSON.parse(localStorage.getItem("Pokemons"));
      return location.reload();
    }
  });
};

const quantityTitle = () => {
  let totalPokemons = pokemonStack.reduce(
    (acc, curr) => acc + curr.cantidad,
    0
  );
  return totalPokemons > 0
    ? (document.querySelector("#quantity").innerText = `( ${totalPokemons} )`)
    : "";
};

const addQuantity = () => {
  const unitElementText = event.target.previousElementSibling;
  let elementFound = pokemonStack.find(
    (pokemon) => pokemon.id === event.target.id * 1
  );

  if (elementFound) {
    elementFound.cantidad += 1;
    localStorage.setItem("Pokemons", JSON.stringify(pokemonStack));
    pokemonStack = JSON.parse(localStorage.getItem("Pokemons"));
    unitElementText.innerText = elementFound.cantidad;
  }
  return quantityTitle();
};

const substractQuantity = () => {
  const unitElementText = event.target.nextElementSibling;
  let elementFound = pokemonStack.find(
    (pokemon) => pokemon.id === event.target.id * 1
  );
  elementFound.cantidad -= 1;
  localStorage.setItem("Pokemons", JSON.stringify(pokemonStack));
  pokemonStack = JSON.parse(localStorage.getItem("Pokemons"));
  unitElementText.innerText =
    elementFound.cantidad > 0 ? elementFound.cantidad : " ";
  quantityTitle();
  checkQuantityZero();
  return;
};
pokemonsPurchased();
quantityTitle();
alertEmptyCar();

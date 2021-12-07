

async function buildData() {
    let products = await getProducts();
    console.log("Products: ", products)
    for (var prop of products) {
          var imageElem = document.createElement("img");
          imageElem.setAttribute("src", `src/${prop.image}.png`);
          imageElem.setAttribute("width", "100");
          imageElem.setAttribute("height", "100");
          imageElem.setAttribute("alt", prop.title);
          imageElem.className = "image";
  
          var price = document.createElement("p");
          price.className = "price"
          price.innerText = prop.price + " $";
  
          var paramName = document.createElement("p");
          paramName.className = "name"
          paramName.innerText = prop.title;

          var desc = document.createElement("p");
          desc.className = "description"
          desc.innerText = prop.description;

          var checkout = document.createElement("a");
          checkout.className = "checkout"
          checkout.id = prop.id;
          checkout.innerText = "Buy";
          checkout.setAttribute("href", `file:///D:/data/MKD/MKD_Task/frontEnd/checkout.html?id=${prop.id}&img=src/${prop.image}.png&title=${prop.title}&desc=${prop.description}&price=${prop.price}`)
  
          var cell = document.createElement("div");
          cell.className = "card";
          cell.appendChild(imageElem);
          cell.appendChild(price);
          cell.appendChild(paramName);
          cell.appendChild(desc);
          cell.appendChild(checkout);
  
          document.getElementById("main").appendChild(cell);
    }
  }

  const getProducts = async () => {
    const response = await fetch('http://localhost:4000/products/get');
    return response.json(); //extract JSON from the http response
    // do something with myJson
  }

  buildData();


const checkout = async () => {
    const params = new URLSearchParams(window.location.search);
    let productId = params.get("id");
    let myBody = {
        productId: productId
    }
  const response = await fetch("http://localhost:4000/orders/add", {
    method: "POST",
    body: JSON.stringify(myBody), // string or object
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Accept': 'application/json'
    },
  });
  console.log(response)
  const myJson = await response.json(); //extract JSON from the http response
  if(myJson.status) location.href = "D:/data/MKD/MKD_Task/frontEnd/success.html"
  else location.href = "D:/data/MKD/MKD_Task/frontEnd/cancel.html"
};

const getProduct = async () => {
  const params = new URLSearchParams(window.location.search);
  console.log(params.get("image"));
  document.getElementById("productImg").src = params.get("img");
  document.getElementById("title").innerText = params.get("title");
  document.getElementById("price").innerText = document.getElementById("price").innerText + " " + params.get("price") + "$";
  document.getElementById("desc").innerText = params.get("desc");
};

getProduct();

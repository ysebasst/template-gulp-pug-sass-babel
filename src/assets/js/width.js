const newElement = document.createElement("span");
newElement.id = "dataWidth";
document.body.appendChild(newElement);

setInterval(() => {
  const dataDOMel = document.getElementById("dataWidth");
  dataDOMel.style.position = "absolute";
  dataDOMel.style.top = "1rem";
  dataDOMel.style.left = "1rem";
  dataDOMel.style.fontSize = "2rem";
  dataDOMel.style.fontWeight = "bold";
  dataDOMel.style.color = "darkRed";
  const width = window.visualViewport.width;
  dataDOMel.textContent = `${width}px`;
}, 1000);

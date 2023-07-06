let imgContainer = document.querySelector(".image-container");
let zoomContainer = document.querySelector(".zoom-container");
let zoomInput = document.querySelector(".zoom-slider");
let zoomLevelText = document.querySelector("span");
let zoom = 1.5;
let x = (zoomContainer.offsetWidth / 140) * zoom;
let y = (zoomContainer.offsetHeight / 100) * zoom;
imgContainer.addEventListener('mousemove', (e) => {
  zoomContainer.style.visibility = "visible";
  zoomContainer.style.backgroundImage = getComputedStyle(imgContainer).backgroundImage;
  zoomContainer.style.backgroundPositionX = -e.offsetX * x + "px"
  zoomContainer.style.backgroundPositionY = -e.offsetY * y + "px";
  zoomContainer.style.backgroundSize = imgContainer.offsetWidth * x + "px " + imgContainer.offsetHeight * y + "px";
});

imgContainer.addEventListener("mouseout", () => {
  zoomContainer.style.visibility = "hidden";
})

window.addEventListener("DOMContentLoaded", () => {
  zoomLevelText.textContent = zoomInput.value;
})

zoomInput.addEventListener("input", () => {
  zoomLevelText.textContent = zoomInput.value;
  zoom = 1.5 * zoomInput.value;
  x = (zoomContainer.offsetWidth / 140) * zoom;
  y = (zoomContainer.offsetHeight / 100) * zoom;
})

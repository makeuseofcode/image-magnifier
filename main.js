// get the css variables
let magnifier = document.querySelector(".magnifier");
let container = document.querySelector(".container");
let magnifierWidth = getComputedStyle(magnifier).width.substring(0, getComputedStyle(magnifier).width.indexOf("p"));
let magnifierHeight = getComputedStyle(magnifier).width.substring(0, getComputedStyle(magnifier).height.indexOf("p"));
let zoomLevelLabel = document.querySelector(".zoom-level");
let zoom = 2;
let maxZoomLevel = 5;
// the x and y positions of the cursor.
let pointerX;
let pointerY;
// the x and y positions of the magnifier image
let magnifyX;
let magnifyY;

function getZoomLevel() {
  return zoom;
}

function getPointerPosition() {
  return { x: pointerX, y: pointerY }
}

function updateMagImage() {
  let evt = new MouseEvent("mousemove", {
    clientX:getPointerPosition().x,
    clientY:getPointerPosition().y,
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // Send the event to the checkbox element
  container.dispatchEvent(evt);
}

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" && maxZoomLevel - Number(zoomLevelLabel.textContent) !== 0) {
    zoomLevelLabel.textContent = +zoomLevelLabel.textContent + 1;
    zoom = zoom + 0.3;
    updateMagImage();
  }

  if (e.key === "ArrowDown" && !(zoomLevelLabel.textContent <= 1)) {
    zoomLevelLabel.textContent = +zoomLevelLabel.textContent - 1;
    zoom = zoom - 0.3;
    updateMagImage();
  }
})
// run the function on mouse move.

container.addEventListener("mousemove", (e) => {
  magnifier.classList.remove("hidden")

  // get mouse position
  let rect = container.getBoundingClientRect();
  let x = e.pageX - rect.left;
  let y = e.pageY - rect.top;

  // take page scrolling into account
  x = x - window.scrollX;
  y = y - window.scrollY;

  magnifier.style.transform = `translate(${x}px, ${y}px)`;

  // magnifier background image calculations
  const imgWidth = 400;
  const imgHeight = 300;

  magnifier.style.backgroundSize =
    imgWidth * getZoomLevel() + "px " + imgHeight * getZoomLevel() + "px";

  magnifyX = x * getZoomLevel() + 15;
  magnifyY = y * getZoomLevel() + 15;

  magnifier.style.backgroundPosition = -magnifyX + "px " + -magnifyY + "px";
});


container.addEventListener("mouseout", () => {
  magnifier.classList.add("hidden")
})

window.addEventListener("mousemove", (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;
})
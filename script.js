// When I click on a panel, toggle that panel into .active-panel mode. Changes height (mobile) / width (desktop).
const widenPanel = (e) => {
  if (e.currentTarget.classList.contains("panel")) {
    e.currentTarget.classList.toggle("active-panel");
  }
};

// Flys the wings in or out on mouseenter or mouseleave on a panel
const wingFly = (e) => {
  const containerWings = e.target.querySelector(".container-wings");
  const wingsBefore = containerWings.querySelector(".wings-before");
  const wingsAfter = containerWings.querySelector(".wings-after");
  let position;
  position = window.innerWidth >= 600 ? "top" : "left";
  if (e.type === "mouseenter") {
    wingsBefore.style[position] = `0px`;
    wingsAfter.style[position] = `0px`;
  } else if (e.type === "mouseleave") {
    wingsBefore.style[position] = `-25%`;
    wingsAfter.style[position] = `25%`;
  }
};

// Resets the wings positions to be outside of their respective containing flexboxes
const resetPositions = (e, useMobile = true) => {
  document.querySelectorAll(".wings").forEach((wing) => {
    if (wing.classList.contains("wings-before")) {
      wing.style.left = useMobile ? `-25%` : 0;
      wing.style.top = useMobile ? 0 : `-25%`;
    } else {
      wing.style.left = useMobile ? `25%` : 0;
      wing.style.top = useMobile ? 0 : `25%`;
    }
  });
};

// Event listeners for the click, mouseenter, & mouseleave events on each panel
const panels = document.querySelectorAll(".panel");
panels.forEach((panel) => {
  panel.addEventListener("click", widenPanel);
  panel.addEventListener("mouseenter", wingFly);
  panel.addEventListener("mouseleave", wingFly);
});

// Sets the wings offscreen for the initial load
window.addEventListener("load", (e) =>
  window.innerWidth >= 600 ? resetPositions(e, false) : resetPositions(e, true)
);

// Adjusts the wings' positions when switching from mobile to desktop widths, or vice-versa
window.matchMedia("(min-width: 600px)").addEventListener("change", (e) => {
  if (e.matches) {
    // the viewport is at least 600px wide
    resetPositions(e, false);
  } else {
    // the viewport is less than 600px wide
    resetPositions(e, true);
  }
});

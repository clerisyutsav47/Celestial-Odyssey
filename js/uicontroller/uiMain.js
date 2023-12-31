import { addDataBox, addUI } from "./controller";
import spaceImg from "/assets/sky.jpg";
import WebState, { removeTracker } from "../state";
import { ModelData } from "../modelData";
import { createGasChart } from "./graph";
import VanillaTilt from "vanilla-tilt";
import gsap from "gsap";
import { createTypingEffect } from "../utils";

function Initilize() {
  let model = WebState.modelName;
  let data = ModelData[model];
  data?.ui.location.forEach((location) => {
    addUI("image-box", {
      text: location.name,
      img: location.img,
      sub_name: location.sub_name,
      name: location.name,
    });
  });
  if (data.ui.minerals) addDataBox("Minerals", data?.ui.minerals);
  if (data.ui.satellite) addDataBox("satellite", data?.ui.satellite);
  createGasChart();
  document.querySelector(".sound-box").classList.add("show-sound-box");
  document.querySelector(".info-box").classList.add("show-info-box");
  // document.querySelectorAll(".dataUi").forEach((eltData) => {
  //   VanillaTilt.init(eltData, {
  //     max: 5,
  //     speed: 400,
  //     glare: true,
  //     "max-glare": 0.4,
  //   });
  // });
  //   addUI("chart-box", { text: "Gas Composition", chart: gasChart });
  var click_sound = new Audio("../../assets/sounds/ui_sounds/click_sound.mp3");
  let ui_model = document.querySelectorAll(".ui-model");
  ui_model.forEach((uiM) => {
    uiM.addEventListener("click", (e) => {
      click_sound.play();
      showLocationData(e.currentTarget.dataset.name);
      var eltIndex = Array.prototype.indexOf.call(
        uiM.parentElement.children,
        uiM
      );
      console.log(ModelData[WebState.modelName]);
      let location = ModelData[WebState.modelName].ui.location[eltIndex];
      if (
        typeof location.lat === "number" &&
        typeof location.lon === "number"
      ) {
        plotPointOnEarth(r, location.lat, location.lon, scene, 0.02);
      } else {
        removeTracker();
      }
    });
  });
}

async function showLocationData(location) {
  let ui_model = document.querySelectorAll(".ui-model");
  ui_model.forEach((uiM) => {
    if (uiM.dataset.name !== location) {
      uiM.style.display = "none";
    }
  });
  let infoText = ModelData[WebState.modelName].ui.location.filter((l) => {
    if (l.name === location) return l;
  });
  let name = infoText[0].name;
  let myScript = infoText[0].script;
  let box = document.querySelector(".location-info-box");
  box.classList.add("show-location-info-box");
  await gsap.from(".location-info-text-box", { duration: 0.5, height: 0 });
  let element = document.querySelector(".location-info-text-box");
  let heading = `<b><i>${infoText[0].name}</b></i>`;
  element.innerHTML = heading;
  element.innerHTML += "<br>";
  createTypingEffect(element, myScript, false);
}

export function resetLocation() {
  let box = document.querySelector(".location-info-box");
  document.querySelector(".location-info-text-box").textContent = "";
  box.classList.remove("show-location-info-box");
  let ui_model = document.querySelectorAll(".ui-model");
  ui_model.forEach((uiM) => {
    if (uiM.children[1].textContent !== location) {
      uiM.style.display = "block";
    }
  });
}

export default Initilize;

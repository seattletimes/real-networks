// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var qsa = require("./lib/qsa.js");

var qsa = require("./lib/qsa");
var svg = document.querySelector("svg");
var namespace = svg.getAttribute("xmlns");
var paths = document.querySelectorAll("path");
var circles = document.querySelectorAll("circle");

var showNetwork = function(group, state) {
  console.log(state)
  group.classList.add(state);
  var id = group.childNodes[0].id;
  var connections = [];
  paths.forEach(function(p) {
    if (p.id.indexOf(id) > -1) {
      connections.push(id);
      p.id.split(id).forEach(function(i) {
        if (i !== "") {
          connections.push(i.trim());
        }
      })
      p.classList.add(state);
    }
  });
  circles.forEach(function(c) {
    if (connections.indexOf(c.id) > -1) {
      c.classList.add(state);
    }
  });
}

qsa("circle").forEach(function(c) {
  var group = document.createElementNS(namespace, "g");
  var nameLabel = document.createElementNS(namespace, "text");
  var name = c.getAttribute("id");

  c.parentElement.replaceChild(group, c);
  group.appendChild(c);
  group.appendChild(nameLabel);
  nameLabel.innerHTML = name;
  nameLabel.classList.add("name");
  var nameDimensions = nameLabel.getBBox();
  nameLabel.setAttribute("x", c.getAttribute("cx") - nameDimensions.width / 2 + 2);
  nameLabel.setAttribute("y", c.getAttribute("cy"));

  group.addEventListener("mouseover", function() {
    showNetwork(group, "hovered");
  })
  group.addEventListener("mouseout", function() {
    qsa(".hovered").forEach(function(i){
      i.classList.remove("hovered");
    });
  })
  group.addEventListener("click", function() {
    qsa(".clicked").forEach(function(i){
      i.classList.remove("clicked");
    });
    showNetwork(group, "clicked");
    var name = group.getElementsByTagName("circle")[0].id;
    if (companyData[name]) {
      var data = companyData[name];
      document.querySelector(".chatter").innerHTML = `
        <div class="company">${data.company}</div>
        <div class="large info-text"><div class="info">${data.info}</div></div>
        <div class="small info-text"><div class="label">Industry</div> <div class="text">${data.industry}</div></div>
        <div class="small info-text"><div class="label">CEO</div> <div class="text">${data.ceo}</div></div>
        <div class="small info-text"><div class="label">Founded</div> <div class="text">${data.founded}</div></div>
      `;
    } else if (personData[name]) {
      var data = personData[name];
      document.querySelector(".chatter").innerHTML = `
        <img class="mugshot" src="./assets/${data.image}.jpg">
        <div class="company">${data.name}</div>
        <div class="large info-text"><div class="info">${data.title}</div></div>
        <div class="small info-text"><div class="label">Then</div> <div class="text">${data.realnetworks}</div></div>
        <div class="small info-text"><div class="label">Now</div> <div class="text">${data.now}</div></div>
      `;
    }
  })
});

var box = document.querySelector("#nodes").getBBox();
var boxArray = [box.x, box.y, box.width, box.height].join(" ");
svg.setAttribute("viewBox", boxArray);
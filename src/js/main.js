// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
console.log(titleData)
var qsa = require("./lib/qsa");
var svg = document.querySelector("svg");
var namespace = svg.getAttribute("xmlns");

qsa("circle").forEach(function(c) {
  var group = document.createElementNS(namespace, "g");
  var nameLabel = document.createElementNS(namespace, "text");
  var name = c.getAttribute("class");

  c.parentElement.replaceChild(group, c);
  group.appendChild(c);
  group.appendChild(nameLabel);
  nameLabel.innerHTML = name;
  nameLabel.classList.add("name");
  var nameDimensions = nameLabel.getBBox();
  nameLabel.setAttribute("x", c.getAttribute("cx") - nameDimensions.width / 2 );
  nameLabel.setAttribute("y", c.getAttribute("cy"));
  
  if (titleData[name]) {
    var title = titleData[name].title;
    var titleLabel = document.createElementNS(namespace, "text");
    group.appendChild(titleLabel);
    titleLabel.innerHTML = title;
    titleLabel.classList.add("title");
    var titleDimensions = titleLabel.getBBox();
    titleLabel.setAttribute("x", c.getAttribute("cx") - titleDimensions.width / 2 );
    titleLabel.setAttribute("y", c.getAttribute("cy") * 1 + nameDimensions.height );
  }

  group.addEventListener("mouseover", function() {
    group.classList.add("visible");
  })
  group.addEventListener("mouseout", function() {
    group.classList.remove("visible");
  })
});

var box = document.querySelector("#nodes").getBBox();
var boxArray = [box.x, box.y, box.width, box.height].join(" ");
svg.setAttribute("viewBox", boxArray);
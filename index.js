var input = document.getElementById("input");
var columns = document.getElementById("columns-input");
var rows = document.getElementById("rows-input");
var refreshButton = document.getElementById("refresh-b");
var minimizeButton = document.getElementById("minimize-b");
var header = document.getElementById("header");
var description = document.getElementById("description");
var gridLabel = document.getElementById("grid-label");
var startButton = document.getElementById("start-b");

var grid = [];

console.log(refreshButton);

minimizeButton.isActive = false;

minimizeButton.onclick = () => {
  if (minimizeButton.isActive) {
    minimizeButton.isActive = false;
    header.classList.remove("hide");
    description.classList.remove("hide");
    gridLabel.classList.remove("hide");
    input.classList.remove("hide");
    refreshButton.classList.remove("hide");
  } else {
    minimizeButton.isActive = true;
    header.classList.add("hide");
    description.classList.add("hide");
    gridLabel.classList.add("hide");
    input.classList.add("hide");
    refreshButton.classList.add("hide");
  }
};

refreshButton.onclick = () => {
  console.log(rows.value, columns.value);
  createGrid(rows.value, columns.value);
};

startButton.onclick = () => {
  findStartGoal();
};

function createGrid(rows, columns) {
  var gridContainer;

  if (document.getElementById("grid-container")) {
    gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
  } else {
    gridContainer = document.createElement("div");
    gridContainer.id = "grid-container";
  }

  for (row = 0; row < rows; row++) {
    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");

    for (column = 0; column < columns; column++) {
      let nodeButton = document.createElement("button");
      nodeButton.id = row + "-" + column;
      nodeButton.classList.add("node");
      nodeButton.innerHTML = row + "," + column;

      nodeButton.onclick = () => {
        nodeButton.info.isObstacle = !nodeButton.info.isObstacle;
        if (nodeButton.info.isObstacle) {
          nodeButton.classList.add("node-obstacle");
        } else {
          nodeButton.classList.remove("node-obstacle");
        }
        console.log(
          nodeButton.info.id + " isObstacle : " + nodeButton.info.isObstacle
        );
      };

      nodeButton.info = {
        id: row + "-" + column,
        x: row,
        y: column,
        isStart: false,
        isGoal: false,
        isObstacle: false
      };
      //console.log(nodeButton.info);
      grid.push(nodeButton);
      rowContainer.appendChild(nodeButton);
    }
    gridContainer.appendChild(rowContainer);
  }
  document.body.appendChild(gridContainer);
}

function findStartGoal() {
  let startX = parseInt(document.getElementById("start-x").value);
  let startY = parseInt(document.getElementById("start-y").value);
  let goalX = parseInt(document.getElementById("goal-x").value);
  let goalY = parseInt(document.getElementById("goal-y").value);

  let startNode = grid.find(
    node => node.info.x === startX && node.info.y === startY
  );
  let goalNode = grid.find(
    node => node.info.x === goalX && node.info.y === goalY
  );
  startNode.info.isStart = true;
  startNode.classList.add("start-node");
  startNode.innerHTML = "S";

  goalNode.info.isGoal = true;
  goalNode.classList.add("goal-node");
  goalNode.innerHTML = "G";

  grid.forEach(node => console.log(node.info));
}

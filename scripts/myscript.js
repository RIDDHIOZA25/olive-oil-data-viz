// add your JavaScript/D3 to this file

// Define the data for the graph
const data = {
  nodes: [
    { id: "Spain", group: 1, flowsTo: 3, totalFlow: 450 },
    { id: "Greece", group: 1, flowsTo: 2, totalFlow: 220 },
    { id: "Italy", group: 1, flowsTo: 4, totalFlow: 390 },
    { id: "USA", group: 2, flowsTo: 5, totalFlow: 580 },
    { id: "Japan", group: 2, flowsTo: 2, totalFlow: 240 },
    { id: "China", group: 2, flowsTo: 1, totalFlow: 150 },
    { id: "France", group: 1, flowsTo: 3, totalFlow: 300 },
  ],
  links: [
    { source: "Spain", target: "USA", value: 200 },
    { source: "Greece", target: "Japan", value: 120 },
    { source: "Italy", target: "China", value: 90 },
    { source: "Spain", target: "France", value: 60 },
    { source: "France", target: "USA", value: 90 },
    { source: "Italy", target: "USA", value: 100 },
  ],
};

// Set up dimensions
const width = 800;
const height = 600;

// Create the SVG container
const svg = d3
  .select("#plot")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Set up simulation
const simulation = d3
  .forceSimulation(data.nodes)
  .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

// Add links to the graph
const link = svg
  .append("g")
  .selectAll("line")
  .data(data.links)
  .join("line")
  .attr("stroke-width", d => d.value / 50)
  .attr("stroke", "gray");

// Add nodes to the graph
const node = svg
  .append("g")
  .selectAll("circle")
  .data(data.nodes)
  .join("circle")
  .attr("r", 10)
  .attr("fill", d => d3.schemeCategory10[d.group])
  .call(
    d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded)
  );

// Add labels to nodes
node.append("title").text(d => d.id);

// Add interaction: Show details on click
node.on("click", function (event, d) {
  d3.select("#details").html(`
    <h3>${d.id}</h3>
    <p>Group: ${d.group}</p>
    <p>Flows to: ${d.flowsTo} countries</p>
    <p>Total Flow: ${d.totalFlow} (units)</p>
  `);
});

// Update positions on each simulation tick
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);
});

// Dragging behavior
function dragStarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

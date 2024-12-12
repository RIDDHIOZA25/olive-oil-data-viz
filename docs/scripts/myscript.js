// Define dimensions and margins
const scatterWidth = 500;
const scatterHeight = 300;
const scatterMargin = { top: 30, right: 30, bottom: 40, left: 50 };

// Sample data (expand this with your actual olive oil data)
const scatterData = [
  { category: 'SA', palmitic: 14, palmitoleic: 2.2 },
  { category: 'EL', palmitic: 10, palmitoleic: 0.8 },
  { category: 'NA', palmitic: 11, palmitoleic: 0.9 },
  { category: 'WL', palmitic: 9, palmitoleic: 0.6 },
  { category: 'U', palmitic: 12, palmitoleic: 1 }
];

// Map categories to their respective image paths
const categoryImages = {
  SA: "https://riddhioza25.github.io/olive-oil-data-viz/images/SA_region_card_1.png",
  EL: "https://riddhioza25.github.io/olive-oil-data-viz/images/EL_region_card_1.png",
  NA: "https://riddhioza25.github.io/olive-oil-data-viz/images/NA_region_card_1.png",
  WL: "https://riddhioza25.github.io/olive-oil-data-viz/images/WL_region_card_1.png",
  U: "https://riddhioza25.github.io/olive-oil-data-viz/images/U_region_card_1.png"
};


// Create SVG container
const scatterSvg = d3.select("#scatterplot")
  .append("svg")
  .attr("width", scatterWidth)
  .attr("height", scatterHeight);

// Create scales
const xScale = d3.scaleLinear()
  .domain([8, 18])
  .range([scatterMargin.left, scatterWidth - scatterMargin.right]);

const yScale = d3.scaleLinear()
  .domain([0.5, 2.5])
  .range([scatterHeight - scatterMargin.bottom, scatterMargin.top]);

// Add axes
scatterSvg.append("g")
  .attr("transform", `translate(0, ${scatterHeight - scatterMargin.bottom})`)
  .call(d3.axisBottom(xScale).ticks(5));

scatterSvg.append("g")
  .attr("transform", `translate(${scatterMargin.left}, 0)`)
  .call(d3.axisLeft(yScale).ticks(5));

// Create image container reference
const imageContainer = d3.select("#image-container");
const categoryImage = d3.select("#category-image");

// Add scatter points with hover effects
scatterSvg.selectAll("circle")
  .data(scatterData)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.palmitic))
  .attr("cy", d => yScale(d.palmitoleic))
  .attr("r", 5)
  .attr("fill", d => {
    const colors = { SA: "blue", EL: "green", NA: "red", WL: "orange", U: "purple" };
    return colors[d.category];
  })
  .on("mouseover", (event, d) => {
    d3.select(event.target)
      .attr("r", 8)
      .attr("stroke", "black")
      .attr("stroke-width", 2);
    
    imageContainer
      .style("display", "block")
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");

    // Set the image source dynamically for the hovered category
    categoryImage.attr("src", categoryImages[d.category]);
  })
  .on("mouseout", (event) => {
    d3.select(event.target)
      .attr("r", 5)
      .attr("stroke", "none");
    
    imageContainer.style("display", "none");
  })
  .on("mousemove", (event) => {
    imageContainer
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
  });

// Add axis labels
scatterSvg.append("text")
  .attr("x", scatterWidth / 2)
  .attr("y", scatterHeight - 5)
  .style("text-anchor", "middle")
  .text("Palmitic Acid");

scatterSvg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -scatterHeight / 2)
  .attr("y", 15)
  .style("text-anchor", "middle")
  .text("Palmitoleic Acid");

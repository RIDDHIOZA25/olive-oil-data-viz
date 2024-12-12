// Scatterplot Code
const scatterWidth = 500;
const scatterHeight = 300;
const scatterMargin = { top: 30, right: 30, bottom: 40, left: 50 };

const scatterData = [
    { category: 'SA', palmitic: 14, palmitoleic: 2.2 },
    { category: 'EL', palmitic: 10, palmitoleic: 0.8 },
    { category: 'NA', palmitic: 11, palmitoleic: 0.9 },
    { category: 'WL', palmitic: 9, palmitoleic: 0.6 },
    { category: 'U', palmitic: 12, palmitoleic: 1 }
];

const categoryImages = {
    SA: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/SA_region_card_1.png?raw=true",
    EL: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/EL_region_card_1.png?raw=true",
    NA: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/NA_region_card_1.png?raw=true",
    WL: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/WL_region_card_1.png?raw=true",
    U: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/U_region_card_1.png?raw=true"
};

const scatterSvg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", scatterWidth)
    .attr("height", scatterHeight);

const xScale = d3.scaleLinear()
    .domain([8, 18])
    .range([scatterMargin.left, scatterWidth - scatterMargin.right]);

const yScale = d3.scaleLinear()
    .domain([0.5, 2.5])
    .range([scatterHeight - scatterMargin.bottom, scatterMargin.top]);

scatterSvg.append("g")
    .attr("transform", `translate(0, ${scatterHeight - scatterMargin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(5));

scatterSvg.append("g")
    .attr("transform", `translate(${scatterMargin.left}, 0)`)
    .call(d3.axisLeft(yScale).ticks(5));

scatterSvg.selectAll("circle")
    .data(scatterData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.palmitic))
    .attr("cy", d => yScale(d.palmitoleic))
    .attr("r", 5)
    .attr("fill", d => ({ SA: "blue", EL: "green", NA: "red", WL: "orange", U: "purple" }[d.category]))
    .on("mouseover", (event, d) => {
        d3.select(event.target).attr("r", 8).attr("stroke", "black").attr("stroke-width", 2);
        d3.select("#image-container")
            .style("display", "block")
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
            .select("#category-image").attr("src", categoryImages[d.category]);
    })
    .on("mouseout", (event) => {
        d3.select(event.target).attr("r", 5).attr("stroke", "none");
        d3.select("#image-container").style("display", "none");
    });

// Bar Chart Code
const chartWidth = 700;
const chartHeight = 400;
const chartMargin = { top: 30, right: 30, bottom: 70, left: 50 };

const productionData = [
  { country: "SPAIN", production: 630, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/spain.png?raw=true" },
  { country: "EGYPT", production: 534, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/egypt.png?raw=true" },
  { country: "GREECE", production: 230, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/greece.png?raw=true" },
  { country: "MOROCCO", production: 131, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/morocco.png?raw=true" },
  { country: "PERU", production: 121, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/peru.png?raw=true" },
  { country: "ARGENTINA", production: 79, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/argentina.png?raw=true" },
  { country: "ITALY", production: 62, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/italy.png?raw=true" },
  { country: "USA", production: 35, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/united-states.png?raw=true" },
  { country: "PORTUGAL", production: 21, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/portugal.png?raw=true" },
  { country: "MEXICO", production: 21, flag: "https://github.com/RIDDHIOZA25/olive-oil-data-viz/blob/main/images/mexico.png?raw=true" },
];

const svg = d3.select("#barchart")
  .append("svg")
  .attr("width", chartWidth)
  .attr("height", chartHeight);

const xScaleBar = d3.scaleBand()
  .domain(productionData.map(d => d.country))
  .range([chartMargin.left, chartWidth - chartMargin.right])
  .padding(0.2);

const yScaleBar = d3.scaleLinear()
  .domain([0, d3.max(productionData, d => d.production)])
  .nice()
  .range([chartHeight - chartMargin.bottom, chartMargin.top]);

svg.append("g")
  .attr("transform", `translate(0, ${chartHeight - chartMargin.bottom})`)
  .call(d3.axisBottom(xScaleBar))
  .selectAll("text")
  .attr("transform", "rotate(-45)")
  .style("text-anchor", "end");

svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, 0)`)
  .call(d3.axisLeft(yScaleBar));

// Tooltip container for displaying the flag and production
const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("display", "none")
  .style("border", "1px solid #ccc")
  .style("padding", "10px")
  .style("background-color", "white")
  .style("pointer-events", "none");

// Add bars to the bar chart
svg.selectAll(".bar")
  .data(productionData)
  .enter()
  .append("rect")
  .attr("x", d => xScaleBar(d.country))
  .attr("y", d => yScaleBar(d.production))
  .attr("width", xScaleBar.bandwidth())
  .attr("height", d => chartHeight - chartMargin.bottom - yScaleBar(d.production))
  .attr("fill", "cadetblue")
  .on("mouseover", (event, d) => {
    tooltip.style("display", "block")
      .html(
        `<img src="${d.flag}" alt="${d.country}" style="max-width: 100px; max-height: 50px; display: block; margin-bottom: 5px;">
        <div>Production: ${d.production} (in tons)</div>`
      )
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
  })
  .on("mousemove", (event) => {
    tooltip.style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
  })
  .on("mouseout", () => {
    tooltip.style("display", "none");
  });

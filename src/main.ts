// TODO
// tooltip
// legend
// style and format

const app = document.querySelector('#app');
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

fetch(url)
  .then(res => res.json())
  .then(d => createScatterPlot(d))

const svgHeight = 800;
const svgWidth = 1200;
const margin = {
  top: 50,
  bottom: 50,
  left: 150,
  right: 300
}

const dotsRadius = 7;
const yearMargin = 1;
const minMargin = 0.1;

const createScatterPlot = (data: DataItem[]) => {
  console.log(data)
  const svg = d3.select(app)
    .append('svg')
    .attr('class', 'svg-container')
    .attr('height', svgHeight)
    .attr('width', svgWidth)

  // Min and Max
  const minYear: number = d3.min(data, d => d.Year) || 0;
  const maxYear: number = d3.max(data, d => d.Year) || 0;
  console.log(minYear + ' ' + maxYear)

  const minMin = d3.min(data, d => d.Seconds / 60);
  const maxMin = d3.max(data, d => d.Seconds / 60);

  if (typeof minMin !== 'number' || typeof maxMin !== 'number') return;
  const minX = minToDate(minMin);
  const maxX = minToDate(maxMin);

  // Now we can make the Scales
  const xScale = d3.scaleLinear()
    .domain([minYear - yearMargin, maxYear + yearMargin])
    .range([margin.left, svgWidth - margin.right])

  const yScale = d3.scaleTime()
    .domain([minX, maxX])
    .range([margin.bottom, svgHeight - margin.top])


  const formatTime = d3.timeFormat("%M:%S");
  const formatYear = d3.format("");

  // Axes
  const xAxis = d3.axisBottom(xScale).tickFormat(formatYear)
  const yAxis = d3.axisLeft(yScale).tickFormat(formatTime as (n: Date | number | { valueOf(): number }) => string);

  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${svgHeight - margin.bottom})`)
    .attr('id', 'x-axis')

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('id', 'y-axis')

  // Scatterplots
  const dots = svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('data-xvalue', d => d.Year)
    .attr('data-yvalue', d => minToDate(d.Seconds / 60).toString())
    .attr('cx', d => xScale(d.Year))
    .attr('cy', d => yScale(minToDate(d.Seconds / 60)))
    .attr('r', dotsRadius)

  // Legend
  svg.append('div')
    .attr('id', 'legend')
    .text('Pink: with no allegations')

  const tooltip = d3.select(app)
    .append('div')
    .attr('id', 'tooltip')

  dots.on('mouseover', d => {
    const event: any = (d3 as any).event;

    tooltip
      .style('left', `${event.clientX}px`)
      .style('top', `${event.clientY}px`)
    console.log(event.clientX)
  })
}


const minToDate = (min: number) => {
  const newDay = new Date();
  newDay.setHours(0, 0, 0, 0);

  return new Date(newDay.getTime() + min * 60 * 1000);
}

interface DataItem {
  Year: number;
  Time: string;
  Place: number;
  Seconds: number;
  Doping: string;
  Nationality: string;
  URL: string;
}

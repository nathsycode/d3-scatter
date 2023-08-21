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
  left: 50,
  right: 50
}

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

  const minMin = '';
  const maxMin = d3.max(data, d => d.Seconds / 60)
  console.log(minMin + ' ' + maxMin);

  // Scales
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

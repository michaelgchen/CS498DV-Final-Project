
const svg = d3.select('svg')
const width = +svg.attr('width')
const height = +svg.attr('height')

var tooltip = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);
				  
				
              // tooltip mouseover event handler
              var tipMouseover = function(d) {
                  //var color = colorScale(d.manufacturer);
                  var html  = " Name : " + d['Name'] 
                  + "<br/>" + "Calories  : " + d.Calories + " cal"  
                  + "<br/>" + "Fat  : " + d.Fat + " g" 
                  + "<br/>" + "Protein  : " + d.Protein + " g"  
                  + "<br/>" + "Carb  : " + d.Carb + " g"  
                + "<br />"; 
                  tooltip.html(html)
                      .style("left",  (d3.event.pageX + 15) + "px")
                      .style("top", (d3.event.pageY - 28) + "px")
                    .transition()
                      .duration(200) // ms
                      .style("opacity", 1) // started as 0!

              };
              // tooltip mouseout event handler
              var tipMouseout = function(d) {
                  tooltip.transition()
                      .duration(300) // ms
                      .style("opacity", 0); 
              };

const render = data => {
    const xValue = d => d.Calories
    const yValue = d => d.Name
    const margin = {top: 50, right:20, bottom:20, left: 370}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0,innerWidth])
    console.log(xScale.domain())

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)
    console.log(yScale.domain())

    const xAxis = d3.axisTop(xScale)
    const yAxis = d3.axisLeft(yScale)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    g.append('g').call(yAxis)
    g.append('g').call(xAxis).attr('transform', `translate(${0}, ${0})`);

    g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d=>yScale(yValue(d)))
    .attr('width', d=>xScale(xValue(d)) )
    .attr('height', yScale.bandwidth())
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);
}

d3.csv("starbucks.csv", function(data) {
    data.forEach(data => {
        data.Calories = +data.Calories
        data.Fat = +data.Fat
        data.Carb = +data.Carb
        data.Fiber = +data.Fiber
        data.Protein = +data.Protein
    })
    data.sort(function(min, max) {
        return d3.descending(min.Calories, max.Calories)
    })
    data = data.slice(0, 40)
    
  

    console.log(data)
    render(data)
})

var monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];


$('.loading-container').show();

setTimeout(() => {
  $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", (data) => {
  var mv = data.monthlyVariance;
    
  data.monthlyVariance.forEach((d) => {
    d.year = +d.year;
  })

var margin = {top: 50, right: 100, bottom: 50, left: 100}, 
    legendWidth = 300,
    legendHeight = 100,
    width = 1060 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom - legendHeight,
    gridsize = width / 262,
    colors = ["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"];

  var x = d3.scaleLinear()
      .range([0, width])
      .domain([d3.min(mv, (d) => { return d.year }), d3.max(mv, (d) => { return d.year })]);
  
  var xAxis = d3.axisBottom(x).ticks(20).tickFormat(d3.format(""));
  
  var y = d3.scaleLinear()
      .range([height, 0])
      .domain([1, 12]);
  
  var z = d3.scaleQuantile()
      .range(colors)
      .domain(d3.extent(mv, (d) => { return d.variance; }))

  
  var svg = d3.select(".root")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + legendHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
  
  var legend = svg.selectAll(".legend")
      .data([0].concat(z.quantiles()), (d) => { return d; })
    .enter().append("g")
      .attr("class", "legend")
    .attr("transform", "translate(" + width/1.75 + "," + 350 + ")")
  
  
  legend.append("rect")
      .attr("width", legendWidth/colors.length)
      .attr("height", legendWidth/colors.length)
      .style("fill", (d, i) => { return colors[i] })
      .attr("x", (d, i) => { return (legendWidth/9) * i; })
    
    
  legend.append("text")
      .attr("class", "legend")    
      .text((d) => { return Math.round(d) + " >" })
      .attr("x", function(d, i) { return legendWidth/8.5 * (i); })
      .attr("y", 50);
  
  legend.append("text")
      .attr("class", "legend")    
      .text("Variance")
      .attr("x", legendWidth/2.25)
      .attr("y", 75);
    
  svg.selectAll(".months")
      .data(monthNames)
    .enter().append("text")
      .text((d) => { return d })
      .attr("x", -10)
      .attr("y", (d, i) => { return (i + 0.5) * height/12 })
      .style("text-anchor", "end")
      .attr ("class", "month");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (-80) + ", "+(height/2)+")rotate(-90)")
      .text("Months")
    
  svg.append("g")
      .attr ("class", "month")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis)
    
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + width/2 + ", "+(height + 40)+")")
      .text("Years")
  
  svg.selectAll("well")
      .data(mv)
    .enter().append("rect")
      .attr("class", "well")
      .attr("x", (d) => {  return x(d.year) } )
      .attr("y", (d) => {  return (d.month - 1) * (height/12) } )
      .attr("width", gridsize)
      .attr("height", height/12)
      .style("fill", (d) => { return z(d.variance) })
      .on("mouseover", (d) => {
          let minutes = "0" + Math.floor(d.Seconds + 2210 / 60),
              seconds = "0" + (d.Seconds + 2210 - minutes * 60),
              time = minutes.substr(-2) + ":" + seconds.substr(-2);
          tip.html("<strong>" + monthNames[d.month-1] + " " + d.year + "</strong><p>Variance: " + d.variance + "</p>");
        return tip.style("visibility", "visible");
        })
      .on("mousemove", () => {
        return tip.style("top", (d3.event.pageY-100)+ "px").style("left",(d3.event.pageX-100)+ "px");
        })
      .on("mouseout", () => {
        return tip.style("visibility", "hidden");
        });
  

var tip = d3.select("body")
    .append("foreignObject")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    
  $('body').css({backgroundColor: '#FF802A'});         
  $('.container').show();
  $('.loading-container').hide();

  })
  
}, 1500)


drawChart('pates-a-tartiner',"data_pates.csv", " grammes de sucre pour 100g", " grammes de matières grasses pour 100g");
drawChart('biscuits-chocolates',"data_biscuits.csv", " grammes de sucre pour 100g", " grammes de matières grasses pour 100g");
drawChart('jus-orange',"data_jus.csv", " grammes de sucre pour 100mL", " milligrammes de Vitamine C pour 100mL");
drawChart('yaourts-natures',"data_yaourt.csv", " grammes de sucre pour 100g", " grammes de matières grasses pour 100g");

function drawChart(div, file, xlab, ylab){
    var scatterdata;
   //Don't need to initialize nested array, d3.nest will create it.

d3.csv(file, function (error, csv) {
  if (error) return console.log("there was an error loading the csv: " + error);
  console.log("there are " + csv.length + " elements in my csv set");

  var nestFunction = d3.nest().key(function(d){return d.groups;});
      //create the function that will nest data by country name

  scatterdata = nestFunction.entries(

                      csv.map(function(d){ 
                                     d.x = +d.x;  
                                     d.y = +d.y;  
                                     d.size = +d.size;
                                     d.brands_tags = d.brands_tags
                                     return d;  
                                 })

                    );  //pass the formatted data array into the nest function

  console.log("there are " + scatterdata.length + " elements in my data");
  //this should still match the previous log statement
  //but each element in scatterdatta will be a nested object containing
  //one data point


nv.addGraph(function() {
  var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .color([ "#0772A1","#FF8700", "#00B743", "#FF3100", "#9b59b6"])
                .pointSize(50).pointRange([100,100])
                .forceX([4,5])
                .forceY([0,1]);

  chart.xAxis
            .tickFormat(d3.format('.01f'))
            .axisLabel(xlab);
            
  chart.yAxis
            .tickFormat(d3.format('.01f'))
            .axisLabel(ylab);
            
  chart.tooltip.contentGenerator(function(key) {
      return '<h3>' + key.point.brands_tags + '</h3>' 
      +'<p>' + key.point.y + ylab +'</p>'
      +'<p>' + key.point.x + xlab +'</p>';
  });
  d3.select("#" + div + " svg")
      .datum(scatterdata)
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;});

  });


}

$( document ).ready(function() {
  $('#compare-tabs a').click(function(e) {
    e.preventDefault();
    // Show the tab
    paneID = $(e.target).attr('href');
    $(this).tab('show');
    // If the iframe hasn't already been loaded once
    console.log($(paneID+' iframe').attr('src'))
    if(! $(paneID+' iframe').attr('src')) {
      // Load it!
      $(paneID+' iframe').attr('src', $(paneID+' iframe').attr('data-src'));
    }
  });
});

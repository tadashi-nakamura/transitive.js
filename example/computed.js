
/**
 * Computed rules
 */

var COMPUTED = [
  dragVertices,
  showLabelsOnHover
];

/**
 * Show labels on hover
 */

function showLabelsOnHover(transitive, pattern) {
  pattern.svgGroup.selectAll('.transitive-stop-circle')
    .on('mouseenter', function (data) {
      pattern.svgGroup.select('#transitive-stop-label-' + data.stop.getId())
        .style('visibility', 'visible');
    })
    .on('mouseleave', function (data) {
      if (transitive.display.zoom.scale() < 0.75) {
        pattern.svgGroup.select('#transitive-stop-label-' + data.stop.getId())
          .style('visibility', 'hidden');
      }
    });
}

/**
 * Drag vertices
 */

function dragVertices(transitive, pattern) {
  var d3 = transitive.d3;
  var drag = d3.behavior.drag()
    .on('dragstart', function () {
      d3.event.sourceEvent.stopPropagation(); // silence other listeners
    })
    .on('drag', function (data, index) {
      if (data.stop.graphVertex) {
        data.stop.graphVertex.moveTo(
          transitive.display.xScale.invert(d3.event.sourceEvent.pageX
            - transitive.el.offsetLeft),
          transitive.display.yScale.invert(d3.event.sourceEvent.pageY
            - transitive.el.offsetTop)
        );

        transitive.refresh();
      }
    });

  pattern.svgGroup.selectAll('.transitive-stop-circle').call(drag);
}

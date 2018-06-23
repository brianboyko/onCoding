---
path: "/blog/D3-in-React"
date: "2017-02-03"
title: "D3 in React"
tags: ["d3", "react"]
featuredImage: "./img/defaultImage.jpg"
---

This is something that might trip up people coming to React from jQuery or Angular: sometimes you just need to mount something on the DOM. 

For me, this happens most often when I work with D3.  

D3, for those of you unfamiliar, is a wonderful tool for data visualization.  It essentially uses Javascript to draw SVG graphics; graphics that can then be made interactive or animate with changes in data.  It's probably the #1 tool in the Data Journalism arsenal.  

Which is great, except the way that D3 was designed - it was designed to be loaded in the &lt;script&gt;&lt;/script&gt; tags in an HTML page. And that's not how most people work with javascript - not even on the front end.  With bundlers like browserify and webpack, it makes sense to code the D3 javascript with the rest of your files. 

This is even further complicated by the fact that D3 looks for a tag you specify as a way to mount the graph - that is, a tag in the DOM of the page.  React, as you may know, uses a virtual DOM. 

So, how do you use D3 graphs in a React project? How do you allow D3 to have access to data about the state of the application or component? 

Here's one solution.  

```javascript 
// ./app/components/Graph.js
import React, {Component} from 'react';

class Graph extends Component {
  constructor(props){
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount () {
    this.props.definition(this.refs.graph);
  }
  render () {
    return (<div ref="graph"></div>);
  }
}

Graph.propTypes = {
  definition: React.PropTypes.func.isRequired
}

export default Graph;
```

So, that's our graph component. Essentially, just a DIV tag, nothing fancy. But once the component mounts, we want to tell D3 to draw the graph in this component.  

To do that, we pass in "this.refs.graph" - in other words, that DIV tag we just created in the DOM, to a function we passed in as a prop to "definition." Like so. 

```javascript
// ./app/components/Main.js
import React, {Component} from 'react';
import Graph from './Graph';
import barchart from '../charts/barchart';
import linechart from '../charts/linechart';
import scatterplot from '../charts/scatterplot';

const Main = () => (
  <div>
    <Graph definition={barchart}/>
    <Graph definition={linechart}/>
    <Graph definition={scatterplot}/>
  </div>
)

export default Main;
```

"barchart", "linechart", and "scatterplot" are all functions which contain the D3 code necessary to render the graph in full.  By passing them in as the "definition" prop, we know that the element will launch that function the moment it mounts.  

And we describe that function like so: 

(We'll just do the one barchart, but you get the idea...)

```javascript
// ../app/charts/barchart.js
/* For some reason, D3 doesn't work with "import" and must use "require()" */

const d3 = require('d3');

const colorPicker = (v) => ((v <= 20) ? "#666666" : "#FF0033");

const bargraph = (element) => {
  let w = 300;
  let h = 120;
  let padding = 2;
  let dataset = [5, 10, 14, 20, 25, 11, 25, 22, 18, 7];

  let bar = d3.select(element)
    .append("svg")
    .attr("width", w)
    .attr("height", h)

  bar.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr('x', (data, i) => (i * (w/dataset.length)))
    .attr('y', (data) => (h - (data * 4)))
    .attr('width', ((w / dataset.length) - padding))
    .attr('height', (data) => (data * 4))
    .attr('fill', (data) => colorPicker(data))

  bar.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((data) => data)
    .attr("text-anchor", "middle")
    .attr("x", (data, i) => ((i * (w / dataset.length)) + (((w / dataset.length) - padding) / 2)))
    .attr("y", (data) => (h - (data * 4)) + 14)
    .attr('fill', "white")
    .attr("font-family", "Helvetica, Arial, sans-serif")
    .attr("font-size", 12)

}

export default bargraph
```

The end result:

![Graphic Charts](http://i.imgur.com/NOgJnCE.png)



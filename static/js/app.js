// Collecting data via promise and fulfillment -- needs a live server
d3.json('samples.json').then(data => {

    let personID = data.names;
    let metadata = data.metadata;
    let samples = data.samples;

    // Make the personID selection list
    d3.select("#selDataset")
        .selectAll("select")
        .data(personID)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d)
        

    // When a new item is selected, change the demographics and plots
    d3.selectAll("body").on("change", updateMetadata)
    d3.selectAll("body").on("change", updateBar)


    function init() {
        // Default list of demographics using first personID
        for (const [key, value] of Object.entries(metadata[0])) {
            d3.select("ul").append("li").text(`${key}: ${value}`);
        };

        // Default bar chart using first personID
        let slicedData = samples[0].sample_values.slice(0, 10);
        let slicedIDs = samples[0].otu_ids.slice(0, 10);

        // Reverse the array to accommodate Plotly's defaults
        let reversedData = slicedData.reverse();
        let reversedIDs = slicedIDs.reverse();
        reversedIDs = reversedIDs.map(id=>"OTU " + id.toString());

        // Trace for the Bar Data
        var barTrace = {
            x: reversedData,
            y: reversedIDs,
            text: reversedIDs,
            name: "BB Bacteria",
            type: "bar",
            orientation: "h"
        };
        
        // Bar Data
        var barData = [barTrace];
        
        // Apply the group bar mode to the layout
        var barLayout = {
            title: "Top Ten Bacteri",
        };

        Plotly.newPlot("bar", barData, barLayout);

        // Default bubbele chart using first personID
        var bubbleTrace = {
            x: samples[0].otu_ids,
            y: samples[0].sample_values,
            text: samples[0].otu_labels,
            mode: 'markers',
            marker: {
            color: samples[0].otu_ids,
            size: samples[0].sample_values
            }
        };
        
        var bubbleData = [bubbleTrace];
        
        var bubbleLayout = {
            title: 'Count of Bacteria Strains',
            showlegend: false,
            height: 600,
            width: 600
        };
    
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    };

    function updateMetadata() {
        let selectedID = d3.select("#selDataset").property("value")
        // Clear the demographic list
        d3.select("ul").html("");
        // Search metadata for a selection match and change demographics list
        for (item in metadata ){
            if (metadata[item].id == selectedID){
                for (const [key, value] of Object.entries(metadata[item])) {
                    d3.select("ul").append("li").text(`${key}: ${value}`);
                };
            };
        };
    };
  
    function updateBar() {
        let selectedID = d3.select("#selDataset").property("value")

        // Search metadata for a selection match and change demographics list
        for (item in samples ){
            if (samples[item].id == selectedID){
                // Make the bar chart of the top ten bacteria from the person ID
                // Slice the first 10 objects for plotting
                let slicedData = samples[item].sample_values.slice(0, 10);
                let slicedIDs = samples[item].otu_ids.slice(0, 10);

                // Reverse the array to accommodate Plotly's defaults
                let reversedData = slicedData.reverse();
                let reversedIDs = slicedIDs.reverse();
                reversedIDs = reversedIDs.map(id=>"OTU " + id.toString());

                // Trace for the Bar Data
                var barTrace = {
                    x: reversedData,
                    y: reversedIDs,
                    text: reversedIDs,
                    name: "BB Bacteria",
                    type: "bar",
                    orientation: "h"
                };
                
                // Bar Data
                var barData = [barTrace];
                
                // Apply the group bar mode to the layout
                var barLayout = {
                    title: "Top Ten Bacteri",
                };

                Plotly.newPlot("bar", barData, barLayout);
            };
        };
    };

// // // function updateBubble(newdata) {
// //    // Make the bubble chart of the top ten bacteria  from the person ID
//     var bubbleTrace = {
//         x: samples[0].otu_ids,
//         y: samples[0].sample_values,
//         text: samples[0].otu_labels,
//         mode: 'markers',
//         marker: {
//         color: samples[0].otu_ids,
//         size: samples[0].sample_values
//         }
//     };
    
//     var bubbleData = [bubbleTrace];
    
//     var bubbleLayout = {
//         title: 'Count of Bacteria Strains',
//         showlegend: false,
//         height: 600,
//         width: 600
//     };

//     Plotly.newPlot("bubble", bubbleData, bubbleLayout);
// // };

// // On change to the DOM, call getData()
// // d3.selectAll("#selDataset").on("change", getData);

// // function getData() {
// //     var dropdownMenu = d3.select("#selDataset");
// //     // Assign the value of the dropdown menu option to a variable
// //     var personID = dropdownMenu.property("value");

// //     // Initialize an empty array for the person ID data
// //     var personDataset = [];



// // // Sort the array in descending order
// // var numArray = [10, 22, 4];
// // numArray.sort(function compareFunction(a, b) {
// //   // resulting order is descending
// //   return b - a;
// // });

// // // Return elements from indicies 0 to 9
// // var topTen = bacteria.slice(0, 10);
// // // Reverse the list for plotly to order corectly
// // topTen.reverse();
// // console.log(topTen);

// //   // Call functions to update the charts
// //     updateBar(personDataset);
// //     updateBubble(personDataset);

// // };


// // // Update the restyled bar plot's values
// // function updateBar(newdata) {
// //     Plotly.restyle("bar", "values", [newdata]);
// //   }
// // // Update the restyled bubble plot's values
// // function updateBubble(newdata) {
// //     Plotly.restyle("bubble", "values", [newdata]);
// //   }

// // };


// // function init() {
// //     data = [{
// //       x: [1, 2, 3, 4, 5],
// //       y: [1, 2, 4, 8, 16] }];
  
// //     Plotly.newPlot("plot", data);
// //   }
  
// //   // Call updatePlotly() when a change takes place to the DOM
// //   d3.selectAll("#selDataset").on("change", updatePlotly);
  
// //   // This function is called when a dropdown menu item is selected
// //   function updatePlotly() {
// //     // Use D3 to select the dropdown menu
// //     var dropdownMenu = d3.select("#selDataset");
// //     // Assign the value of the dropdown menu option to a variable
// //     var dataset = dropdownMenu.property("value");
  
// //     // Initialize x and y arrays
// //     var x = [];
// //     var y = [];
  
// //     if (dataset === 'dataset1') {
// //       x = [1, 2, 3, 4, 5];
// //       y = [1, 2, 4, 8, 16];
// //     }
  
// //     if (dataset === 'dataset2') {
// //       x = [10, 20, 30, 40, 50];
// //       y = [1, 10, 100, 1000, 10000];
// //     }
  
// //     // Note the extra brackets around 'x' and 'y'
// //     Plotly.restyle("plot", "x", [x]);
// //     Plotly.restyle("plot", "y", [y]);
// //   }
  
    init();

}); // end of promise
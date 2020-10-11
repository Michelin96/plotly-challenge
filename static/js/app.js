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
    d3.selectAll("body").on("change", getData)

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
            showlegend: false
        };
    
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    };

    function updateMetadata() {
        let selectedID = d3.select("#selDataset").property("value")
        // Clear the demographic list
        d3.select("ul").html("");
        // Search metadata for the matcht to the selection and change demographics list
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

    function updateBubble() {
        let selectedID = d3.select("#selDataset").property("value")
        // Search samples for the matcht to the selection and change demographics list
        for (item in samples ){
            if (samples[item].id == selectedID){
            // Make the bubble chart of all the bacteri from the person ID
                var bubbleTrace = {
                    x: samples[item].otu_ids,
                    y: samples[item].sample_values,
                    text: samples[item].otu_labels,
                    mode: 'markers',
                    marker: {
                    color: samples[item].otu_ids,
                    size: samples[item].sample_values
                    }
                };
    
                var bubbleData = [bubbleTrace];
                
                var bubbleLayout = {
                    title: 'Count of Bacteria Strains',
                    showlegend: false,
                    height: 600,
                    width: 600
                };
            };
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    };

    function getData() {

        updateMetadata();
        updateBar();
        updateBubble();
    };
  
    init();

}); // end of promise
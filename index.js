
let election_data = {}
function updateMainScreenData() {
    getElectionData()

}

async function getElectionData() {
    $.getJSON("./data.json", function (data) {
        election_data = data;

        createAllianceDropdown()
    });
}

function updateHigh(d, i, self) {
    console.log(self)
    d3.selectAll('.highlighted').classed('highlighted', false);
    d3.select(self).classed('highlighted', (d, i) => {
        // console.log(d.properties.NAME_1, d.properties.NAME_2);
        return true;
    });
}


function updateHighlightThroughout() {

}


function createAllianceDropdown() {

    const uniqueValues = [...new Set(election_data.map(item => item.field15
    ))].filter((item) => { return item != "" });


    var select = document.createElement("select");
    for (const val of uniqueValues) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }


    document.getElementById("alliance_container").appendChild(label).appendChild(select);
    // add an event listener to the select element
    select.addEventListener('change', event => {
        const selectedValue = event.target.value;

        // update the view based on the selected value
        const filteredData = uniqueValues.filter(item => { return item === selectedValue });

        updateView(filteredData[0]);
        // do something with the filtered data
    });

}

function updateView(itemName) {
    if (itemName == "alliance") {
        itemName
    }

    var color;
    switch (itemName) {
        case "NDA": color = "orange";
            break
        case "UPA": color = "#47acd1"
            break;
        case "Others": color = "#839195"
            break;
    }

    var district_names = [...new Set(election_data.filter((item) => { return (item.field15 === itemName && item.field14 == 1) }).map(item => { console.log(item.field15); return item.field6.toLowerCase() }))]
    console.log(election_data)

    d3.select('#map')
        .selectAll('path')
        .attr('fill', function (d) {
            if (district_names.includes(d.properties.NAME_2.toLowerCase())) {
                return color; // Set the fill color to green
            } else {
                return 'lightblue'; // Set the fill color to red
            }
        })


}

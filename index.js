
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
    select.name = "pets";
    select.id = "pets"

    for (const val of uniqueValues) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }

    var label = document.createElement("label");
    label.htmlFor = "pets";

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
    // var district_names = [...new Set(election_data.filter((item) => { return (item.field15 === itemName && item.field14 == 1) }).map(item => { console.log(item.field15); return item.field6.toLowerCase() }))]
    var election_winner_data = [...new Set(election_data.filter((item) => { return (item.field14 == 1) }).map(item => { console.log(item.field15); return { alliance: item.field15, district_name: item.field6.toLowerCase() } }))]

    // console.log(election_winner_data)
    d3.select('#map')
        .selectAll('path')
        .attr('fill', function (d) {
            let alliance = ""

            if (election_winner_data.some(obj => obj.district_name === d.properties.NAME_2.toLowerCase())) {
                election_winner_data.some(obj => {
                    if (obj.district_name === d.properties.NAME_2.toLowerCase()) {
                        alliance = obj.alliance;
                        return true;
                    }
                });
                return getColorCode(alliance);
            }
            else {
                return 'lightblue'
            }



        })
}

function getColorCode(itemName) {
    var color;
    switch (itemName) {
        case "NDA": color = "orange";
            //var district_names = [...new Set(election_data.filter((item) => { return (item.field15 === itemName && item.field14 == 1) }).map(item => { console.log(item.field15); return item.field6.toLowerCase() }))]
            break
        case "UPA": color = "#47acd1"
            //var district_names = [...new Set(election_data.filter((item) => { return (item.field15 === itemName && item.field14 == 1) }).map(item => { console.log(item.field15); return item.field6.toLowerCase() }))]
            break;
        case "Others": color = "#839195"
            //var district_names = [...new Set(election_data.filter((item) => { return (item.field15 === itemName && item.field14 == 1) }).map(item => { console.log(item.field15); return item.field6.toLowerCase() }))]
            break;
        default: color = "purple"
            //district_names = new Set(election_data.filter((item) => { return (item.field14 == 1) }).map(item => { return item.field6.toLowerCase() }))
            break

    }
    console.log(typeof color)
    return color

}

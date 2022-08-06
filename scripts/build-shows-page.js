const shows = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
        ticketLink: "#"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
        ticketLink: "#"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA",
        ticketLink: "#"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
        ticketLink: "#"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA",
        ticketLink: "#"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA",
        ticketLink: "#"
    }
]

// declare a function to create an element and then to give it a class and some inner text.
function buildElements (elType, elClass, elContent) {
    const newEl = document.createElement(elType);
    newEl.classList.add(elClass);
    newEl.innerText = elContent;
    return newEl
}

//Select the Shows section on the Shows page
const showsSection = document.querySelector(".shows");

//Create the title for the Shows section
const showsTitle = buildElements("h1", "shows__title", "Shows");
showsSection.appendChild(showsTitle);

// Create lables bar for tablet and desktop
const showsLabels = buildElements("div", "shows__labels", "");
showsSection.appendChild(showsLabels);

// Add labels into the labes bar
const showsLabelDate = buildElements("h4", "shows__date", "Date");
showsLabels.appendChild(showsLabelDate);
showsLabelDate.classList.add("label");
const showsLabelVenue = buildElements("h4", "shows__venue", "Venue");
showsLabels.appendChild(showsLabelVenue);
showsLabelVenue.classList.add("label");
const showsLabelLocation = buildElements("h4", "shows__location", "Location");
showsLabels.appendChild(showsLabelLocation);
showsLabelLocation.classList.add("label");

// create a div to contain all the shows
const showsContainer = buildElements("div", "shows__container", "");
showsSection.appendChild(showsContainer);

// create a function to create individual shows with all elements inside it
function buildShow(singleShow){

//the container
    const showContainer = buildElements("div", "show", "");
    showsContainer.appendChild(showContainer);

//the Date label
    const showLabelDate = buildElements("h4", "show__label", "Date");
    showContainer.appendChild(showLabelDate);
    
// the date info
    const showDate = buildElements("p", "show__date", singleShow.date);
    showContainer.appendChild(showDate);
// the Venue label
    const showLabelVenue = buildElements("h4", "show__label", "Venue");
    showContainer.appendChild(showLabelVenue);
    
// the Venue info
    const showVenue = buildElements("p", "show__venue", singleShow.venue);
    showContainer.appendChild(showVenue);

// the Location label
    const showLabelLocation = buildElements("h4", "show__label", "Location");
    showContainer.appendChild(showLabelLocation);

// the Location info
    const showLocation = buildElements("p", "show__location", singleShow.location);
    showContainer.appendChild(showLocation);
    
// the button
    const buyTickets = buildElements("a", "show__button", "Buy Tickets");
    showContainer.appendChild(buyTickets);

// add secondary classes on buttons and labels
    buyTickets.classList.add("button");
    const labels = document.querySelectorAll(".show__label");
    labels.forEach((label)=>{label.classList.add("label")});
}

// create a for loop to loop through the shows array and build out each show using the buildShow function
for (const show of shows) {
    buildShow(show);
}

//create event listener for to add "selected" on show elements
const show = document.querySelectorAll(".show");
show.forEach ((oneShow)=>{
    oneShow.addEventListener ("click", ()=>{
        show.forEach((selectedShow)=>{selectedShow.classList.remove("show--selected")})
        oneShow.classList.add("show--selected")
    })
});

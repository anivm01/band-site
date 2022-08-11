const bandSiteAPIKey = "381ccfd6-5fb2-4e56-95dd-10a0b20db8f2";

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

//declare a function to convert the dates from miliseconds into Day Month Date Year format
const convertDate = (date) => {
    let fullDate = new Date(date);
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[fullDate.getDay()];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = months[fullDate.getMonth()];

    let dayNumber = fullDate.getDate();
    
    let year = fullDate.getFullYear();
    if (dayNumber < 10) {
        dayNumber = `0${dayNumber}`;
    }

    fullDate = `${day} ${month} ${dayNumber} ${year}`;
    return fullDate
}


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
    const dateText = convertDate(singleShow.date)
    const showDate = buildElements("p", "show__date", dateText);
    showContainer.appendChild(showDate);
// the Venue label
    const showLabelVenue = buildElements("h4", "show__label", "Venue");
    showContainer.appendChild(showLabelVenue);
    
// the Venue info
    const showVenue = buildElements("p", "show__venue", singleShow.place);
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

axios
    .get("https://project-1-api.herokuapp.com/showdates?api_key="+bandSiteAPIKey)
    .then( (response)=>{
        const shows = response.data
        for (const show of shows) {
            buildShow(show);
        }
        const showToSelect = document.querySelectorAll(".show");
        console.log(showToSelect);
        showToSelect.forEach ((oneShow)=>{
                oneShow.addEventListener ("click", ()=>{
                showToSelect.forEach((selectedShow)=>{selectedShow.classList.remove("show--selected")})
                oneShow.classList.add("show--selected")
                })
            });
    })
    .catch(()=>{
        const showsErrorContainer = buildElements("div", "error", "");
        showsContainer.appendChild(showsErrorContainer);
        const showsErrorImg = buildElements("img", "error__image", "");
        showsErrorImg.setAttribute("src", "../assets/logos/error-gremlin.svg");
        showsErrorContainer.appendChild(showsErrorImg);
        const showsError = buildElements("p", "error__text", "Oh no! Gremlins got our data, please come back later!");
        showsErrorContainer.appendChild(showsError);
        
    })

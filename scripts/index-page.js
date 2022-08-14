//save the api key into a variable
const bandSiteAPIKey = "381ccfd6-5fb2-4e56-95dd-10a0b20db8f2";

// declare a function to create new elements and give them a class
function makeElement (elType, elClass) {
    const newEl = document.createElement(elType);
    newEl.classList.add(elClass);
    return newEl;
}

//use the makeElement function to create a container to display the comments
const commentsDisplay = makeElement("div", "comments__display");
const commentsContainer = document.querySelector(".comments");
commentsContainer.appendChild(commentsDisplay);

//declare a function to convert the timestamp from milliseconds into mm/dd/year
function getTimestamp (timestamp){
    let date = new Date(timestamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`
    }
    date = `${month}/${day}/${year}`;
    return date
}

//declare a function to display a single comment
function displayComment (comment) {
        commentBlock = makeElement("div", "comment");
        commentsDisplay.appendChild(commentBlock);
        const commentImage = makeElement("div", "comment__image");
        commentBlock.appendChild(commentImage);
        const commentInfo = makeElement("div", "comment__info");
        commentBlock.appendChild(commentInfo);
        const commentAvatar = makeElement("img", "comment__avatar");
        commentImage.appendChild(commentAvatar);
        const commentName = makeElement("p", "comment__name");
        commentName.innerText = comment.name;
        commentInfo.appendChild(commentName);
        const commentDate = makeElement("span", "comment__date");
        commentInfo.appendChild(commentDate);
        commentDate.innerText = getTimestamp(comment.timestamp);
        const commentContent = makeElement("p", "comment__content");
        commentContent.innerText = comment.comment;
        commentInfo.appendChild(commentContent);
    // }    
}

//declare a function to fetch the comments from the api and use displayComment to put them on the page
const fetchComments = () => {
    axios 
    .get("https://project-1-api.herokuapp.com/comments?api_key="+bandSiteAPIKey)
    .then(response=>{
        console.log(response);
        const commentsArray = response.data;
        commentsArray.sort((a,b) => {
            return b.timestamp - a.timestamp
        })
        commentsArray.forEach((comment)=>{
            displayComment (comment);
        })
    })
    .catch((error) => {
        console.log(error);
        const commentsDisplayErrorContainer = document.createElement("div");
        commentsDisplay.appendChild(commentsDisplayErrorContainer);
        const commentsDisplayError = document.createElement("p");
        commentsDisplayError.innerText = "Some comments my not be displaying correctly";
        commentsDisplayErrorContainer.appendChild(commentsDisplayError);

    })
}

//fetch and display the comments onto the page on page load
fetchComments();


// create an event listener on form submission to post the new comment, 
//empty out the display container and populate it with the new version of the comments array
const form = document.querySelector(".form");
form.addEventListener("submit", (event)=>{
    event.preventDefault()
    axios
        .post("https://project-1-api.herokuapp.com/comments?api_key="+bandSiteAPIKey, {
            name: event.target.name.value,
            comment: event.target.comment.value
        })
        .then((response)=>{
            commentsDisplay.replaceChildren();
            fetchComments(response);
            form.reset();            
        })
        .catch(error => {
            console.log(error);
            const commentsErrorContainer = document.createElement("div");
            commentsDisplay.prepend(commentsErrorContainer);
            const commentsError = document.createElement("p");
            commentsError.innerText = "Oh no! Something went wrong with your comment. Try again later!"
            commentsErrorContainer.appendChild(commentsError);
        })
})
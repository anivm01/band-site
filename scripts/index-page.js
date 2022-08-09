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

//declare a function to display all the comments
function displayComments (comments) {
    comments.sort((a,b) => {
        return b.timestamp - a.timestamp
    })
    for (const singleComment of comments) {
        const comment = makeElement("div", "comment");
        commentsDisplay.appendChild(comment);
        const commentImage = makeElement("div", "comment__image");
        comment.appendChild(commentImage);
        const commentInfo = makeElement("div", "comment__info");
        comment.appendChild(commentInfo);
        const commentAvatar = makeElement("img", "comment__avatar");
        commentImage.appendChild(commentAvatar);
        const commentName = makeElement("p", "comment__name");
        commentName.innerText = singleComment.name;
        commentInfo.appendChild(commentName);
        const commentDate = makeElement("span", "comment__date");
        commentInfo.appendChild(commentDate);
        commentDate.innerText = getTimestamp(singleComment.timestamp);
        const commentContent = makeElement("p", "comment__content");
        commentContent.innerText = singleComment.comment;
        commentInfo.appendChild(commentContent);
    }    
}

//declare a function to fetch the comments from the api and use displayComments to them on the page
const fetchComments = () => {
    axios 
    .get("https://project-1-api.herokuapp.com/comments?api_key="+bandSiteAPIKey)
    .then(response=>{
        console.log(response);
        const commentsArray = response.data;
        displayComments (commentsArray);
    })
    .catch(error => {
        console.log(error);
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
            commentsDisplay.innerHTML = "";
            fetchComments(response);
            form.reset();            
        })
        .catch(error => {
            console.log(error);
        })
})
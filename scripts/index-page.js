const comments = [
    {   imgSource: "",
        name: "Connor Walton",
        timestamp: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        imgSource: "",
        name: "Emilie Beach",
        timestamp: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        imgSource: "",
        name: "Miles Acosta",
        timestamp: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    },
]


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

// declare a function to create elements for the objects inside the array using makeElement and 
// append the objects inside the array to the page

function displayArray () {
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
        commentDate.innerText = singleComment.timestamp;
        const commentContent = makeElement("p", "comment__content");
        commentContent.innerText = singleComment.comment;
        commentInfo.appendChild(commentContent);
        if (singleComment.imgSource.length > 0) {
            commentAvatar.setAttribute("src", singleComment.imgSource);
        }
    }    
}

// invoke the displayArray function so the default comments will be displayed when the page loads
displayArray ();

function getTimestamp (){
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`
    }
    const date = `${month}/${day}/${year}`;
    return date
}



// create an event listener on form submission

const form = document.querySelector(".form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const nameInput = event.target.name.value;
    const commentInput = event.target.comment.value;
    const img = event.target.childNodes[1].childNodes[1].src;
    const date = getTimestamp();
    const newComment = {
        name: nameInput,
        comment: commentInput,
        imgSource: img,
        timestamp: date
    }
    comments.unshift(newComment);
    commentsDisplay.innerHTML = "";
    displayArray();
    form.reset();
})
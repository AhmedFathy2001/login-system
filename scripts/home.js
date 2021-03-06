"use strict";
const postText = document.getElementById('newPost');
const username = localStorage.getItem('sessionUser') || sessionStorage.getItem('sessionUser');
const shareBtn = document.getElementById('share');
const modalBtn = document.getElementById('modal');
const deleteBtn = document.getElementById('delete')
let pass;
let postContent = localStorage.getItem('posts') == null ? [] : JSON.parse(localStorage.getItem('posts'));
let postID = localStorage.getItem('posts') == null ? 0 : JSON.parse(localStorage.getItem('posts'))[0].postID;
let currentIndex;
let sessionUser = localStorage.getItem('sessionUser') || sessionStorage.getItem('sessionUser');
sessionUser == ('' || null) ? setTimeout(() => window.location.href = 'index.html', 1000) : sessionUser;


//Displays data on site load
if (postContent != []) {
    displayAllPosts();
}

//Post creation class
class Posts {
    constructor(postText, username, date, postID) {
        this.postText = postText;
        this.username = username;
        this.date = date;
        this.postID = postID;
    }
}

//Creates a new post
function createPost() {
    let date = new Date();
    let post = new Posts(postText.value, username, date, postID);
    postID++
    postContent.push(post);
    localStorage.setItem('posts', JSON.stringify(postContent))
}

//Gets current time and adds it to the post and shows time elapsed since post was published
function timeSince(date) {

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + "m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
}

//cuts the string at the length of 8 (prevents long usernames from overflowing)
function truncate(input) {
    if (input.length > 8) {
        return input.substring(0, 8) + '...';
    }
    return input;
};

//Displays all posts from new to old
function displayAllPosts() {
    let posts = ``;
    let currentUser = localStorage.getItem("sessionUser")
    for (let i = postContent.length - 1; i >= 0; i--) {

        posts +=
            `
        <div class="p-2 post-container position-relative">
            <div class="position-relative">
            <div class="icon-parent">${currentUser == postContent[i].username ?'<i class="fas fa-ellipsis-h position-absolute icon"></i>':''  } </div>
            <ul class="position-absolute liststyle">
                <li class="list-unstyled">
                    <a class="text-white-50 links">Delete post</a></li>
            </ul>
            </div>
            <div class="heart position-absolute bottom-0 end-0"><span class="position-absolute likes d-none"></span></div>
            <div class="image-width position-absolute p-1 pt-2 ms-2">
                <a href="profile.html"><img class="w-100 rounded-circle border-1" src="./images/user.png" alt="profile picture"></a>
            </div>
            <p class="paragraph-style text-white-50"><span class="text-white">${window.innerWidth<768 ? truncate(postContent[i].username):postContent[i].username}</span> <span class="spanunstyled">@${postContent[i].username}</span> ?? <span>${timeSince(postContent[i].date)} ago</span></p>
            <pre class="post-content pb-3">${postContent[i].postText}</pre>
            <p class="d-none">${i}</p>
        </div>
    `;
    }
    document.getElementById('feed').innerHTML = posts
}

//
//Adds the liking animation
function like() {
    const hearts = document.querySelectorAll('div.heart');
    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            if (heart.classList.contains('is_animating')) {
                heart.classList.remove('is_animating');
            } else {
                heart.classList.add('is_animating')
            }
        });
    });
}

//Enables the button if theres input inside of it
function success() {
    if (postText.value == "") {
        shareBtn.disabled = true;
    } else {
        shareBtn.disabled = false;
    }
}
postText.addEventListener('keyup', success);


//Creates a new post
shareBtn.addEventListener('click', () => {
    createPost();
    postText.value = "";
    success()
    displayAllPosts()
});

//Terminates all sessions on logout
logout.addEventListener('click', () => {
    sessionStorage.removeItem('sessionUser');
    localStorage.removeItem('sessionUser');
    pass = localStorage.setItem('pass', 'Log out successful.');
})

//Adds a click listener to all post dropdowns
function addDropDownListener() {
    let dropdown = document.querySelectorAll('div.icon-parent');
    dropdown.forEach(element => {
        let next = element.nextElementSibling;
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            let parent = element.closest('div.post-container');
            currentIndex = parent.lastElementChild.innerHTML;
            let dotsData = document.getElementsByClassName("liststyle")
            for (let i = 0; i < dotsData.length; i++) {
                if (dotsData[i].classList.contains("active")) {
                    dotsData[i].classList.remove("active")
                }
                //  if (dotsData[i].classList)
            }
            if (next.classList.contains('active')) {
                next.classList.remove('active');

            } else next.classList.add('active');
        }), true;

    });
}


//Closes the drop down of the post when clicked anywhere outside of it
window.addEventListener('click', (e) => {
    if (document.querySelector('ul.active')) {
        if (e.target != document.querySelector('ul.active')) document.querySelector('ul.active').classList.remove('active');
    }
});

//Adds a click listener to all new post dropdowns
let target = document.querySelector('#feed');
let mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(function() {
        addDropDownListener();
        deleteModalTrigger();
        like()
    })
});



//checks for changes in the main div
mutationObserver.observe(target, {
    childList: true
});

// Otherwise
mutationObserver.disconnect();
mutationObserver.observe(target, {
    childList: true
});


function triggerEvent(el, evName) {
    el.dispatchEvent(new CustomEvent(evName, {}));
}

function deleteModalTrigger() {
    let links = document.querySelectorAll('a.links');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            triggerEvent(modalBtn, 'click');
        });
    });
}

//deletes posts
deleteBtn.addEventListener('click', () => {
    postContent.splice(currentIndex, 1);
    localStorage.setItem('posts', JSON.stringify(postContent));
    displayAllPosts();
    triggerEvent(document.getElementById('dismissBtn'), 'click');

});
//functions because of the need of mutationObserver
like()
addDropDownListener();
deleteModalTrigger();
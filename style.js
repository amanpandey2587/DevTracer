//Variables used in this page 
const searchbar=document.querySelector(".searchbar-container");
const profilecontainer=document.querySelector(".profile-container");
const root=document.documentElement.style;
const get=(aman) => document.getElementById(`${aman}`);
const url = "https://api.github.com/users/";
const noresults =get("no-results");
const btnmode=get("btn-mode");
const modetext=get("mode-text");
const modeicon=get("mode-icon");
const btnsubmit=get("submit");
const input=get("input");
const avatar=get("avatar");
const userName=get("name");
const user=get("user");
const date=get("date");
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const bio=get("bio");
const repos=get("repos");
const followers=get("followers");
const following=get("following");
const user_location=get("location");
const page=get("page");
const twitter=get("twitter");
const company=get("company");
const newElement=document.querySelector(".profile-stats-wrapper")
let darkmode=false;



// function for darkMode and lightMode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

let darkMode = localStorage.getItem("dark-mode") === "true"; 

if (darkMode) {
    darkModeProperties();
} else {
    lightModeProperties();
}

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-text-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    searchbar.style.backgroundColor = '#1e2a47';
    profilecontainer.style.backgroundColor='#1e2a47';
    bio.style.color='#ffffff';
    input.style.color='#ffffff'
    input.classList.remove('styled-placeholder');
    newElement.style.backgroundColor='#141d2f';
    darkMode = true; 
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%");
    bio.style.color='#4b6a9b';
    input.classList.add('styled-placeholder');
    searchbar.style.backgroundColor = '#ffffff';
    profilecontainer.style.backgroundColor='#ffffff';
    newElement.style.backgroundColor='#f6f8ff';
    input.style.color='#4b6a9b';
    darkMode = false; 
    localStorage.setItem("dark-mode", false); 
}

btnmode.addEventListener("click", function () {
    if (darkMode) {
        lightModeProperties();
    } else { 
        darkModeProperties();
    }
});

//Function for getting user data 
function getUserData(gitUrl){
    fetch(gitUrl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        updateProfile(data);
    })
    .catch((error)=>{
        throw error;
    });
}
//Event listener for user data getting 
btnsubmit.addEventListener("click",function(){
    if(input.value!==""){
        getUserData(url+input.value);
    }
});
// Event listener for input 
input.addEventListener(
    "keydown",
    function (e){
        if(e.key=="Enter"){
            if(input.value!==""){
                getUserData(url+input.value);
            }
        }
    },
    false
);
input.addEventListener("input",function(){
    noresults.style.display="none";
});


function updateProfile(data) {
    if (data.message !== "Not Found") {
      noresults.style.display = "none";
      function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
          return false;
        } else {
          return true;
        }
      }
      avatar.src = `${data.avatar_url}`;
      userName.innerText = data.name === null ? data.login : data.name;
      user.innerText = `@${data.login}`;
      user.href = `${data.html_url}`;
      datesegments = data.created_at.split("T").shift().split("-");
      date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
      bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
      repos.innerText = `${data.public_repos}`;
      followers.innerText = `${data.followers}`;
      following.innerText = `${data.following}`;
      user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
      page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
      page.href = checkNull(data.blog, page) ? data.blog : "#";
      twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
      twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
      company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
      searchbar.classList.toggle("active");
      profilecontainer.classList.toggle("active");
    } else {
      noresults.style.display = "block";
    }
  }
  
console.log(getUserData(url+"amanpandey2587"));

getUserData(url+"amanpandey2587");
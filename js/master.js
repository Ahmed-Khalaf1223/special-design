// click on toggle settings gear
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin")
    // toggle class open on main settings Box
    document.querySelector(".settings-box").classList.toggle("open")
};
// check if ther’s local storage color option
let maincolor=localStorage.getItem("color-option")
if(maincolor !== null){
    document.documentElement.style.setProperty("--main-color",maincolor)
    // remove active class all from all colors list item
    document.querySelectorAll(".colors-list li").forEach(el=>{
        el.classList.remove("active");
        // add active classon element with data-color to local storage item
        if(el.dataset.color === maincolor){
            // add active class
            el.classList.add("active")
        }
    })
}
// switch color
let colorli=document.querySelectorAll(".colors-list li")
// loop on all list items
colorli.forEach(li=>{
    // click on every list items
    li.addEventListener("click",(el)=>{
        //set color on root
        document.documentElement.style.setProperty("--main-color",el.target.dataset.color)
        //set color on local storage
        localStorage.setItem("color-option" , el.target.dataset.color)
        // remove active class from all childrens
        handleActive(el)
    });
});

// Random background option
let backgroundoption = true;

// variable to control the background interval
let backgroundinterval;

// check if ther’s localdtorage random background item
let backgroundlocalitem = localStorage.getItem("background-option");
// check if random background local storage is not embety
if(backgroundlocalitem !== null){
    document.querySelectorAll(".option-Box span").forEach(e => {
        e.classList.remove("active")
    });
    if(backgroundlocalitem === 'true'){
        backgroundoption = true;
        document.querySelector(".option-Box .yes").classList.add("active")
    } else{
        backgroundoption = false;
        document.querySelector(".option-Box .no").classList.add("active")
    }
}
// switch Rondom background option
let backgroundEl = document.querySelectorAll(".option-Box span")
// loop on all spans
backgroundEl.forEach(span => {
    // click on every span
    span.addEventListener("click" ,(e) => {
       // remove active class from all childrens
       handleActive(e)

        if(e.target.dataset.background === "yes"){
            backgroundoption = true;
            randomaize();
            localStorage.setItem("background-option" , true);
        }else{
            backgroundoption = false;
            clearInterval(backgroundinterval);
            localStorage.setItem("background-option" , false);
        }
    }); 
});   
// select landing pag Elemeent
let pagelanding =document.querySelector(".landing-page");
// gey array of imgs
let arrayimgs=["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

// function to Randomize Imgs
function randomaize(){
    if(backgroundoption === true){
        backgroundinterval = setInterval(() => {
            // get random number
            let rondnumber= Math.floor(Math.random() * arrayimgs.length);
            // change background imge url
            pagelanding.style.backgroundImage = 'url("imgs/background/' + arrayimgs[rondnumber] + '")';
        }, 3000);
    }
}
randomaize()

// select skills selector

let ourskills=document.querySelector(".skills");

window.onscroll = function(){
    // skills offset top
    let skillsoffsettop = ourskills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourskills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scrolltop
    let windowscrolltop = this.pageYOffset;

    if(windowscrolltop > (skillsoffsettop + skillsOuterHeight - windowHeight)){

       let allskills = document.querySelectorAll(".skill-box .skill-progress span");

       allskills.forEach(e =>{
        e.style.width = e.dataset.progress;
       })
    }
}

// creat popup with the image

let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(e =>{

    e.addEventListener('click', (el)=>{

        // create overlay elament
        let overlay = document.createElement("div");
        // add class overlay
        overlay.className = "popup-overlay";
        // append overlay to the body
        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement("div");
        // add class the popup box
        popupBox.className = "popup-box";
        // create the image
        let popupimage = document.createElement("img");
        // set image source
        popupimage.src = e.src
        // add image to popup box
        popupBox.appendChild(popupimage)
        // append the popup box to body
        document.body.appendChild(popupBox);

        if(e.alt !== null){
            // create heading
            let imagheading =document.createElement("h3");
            // create classname to heading
            imagheading.className="textheading"
            // create text for heading
            let imagText = document.createTextNode(e.alt);
            // append the text to the heading
            imagheading.appendChild(imagText);
            // append the heading to the popup box
            popupBox.prepend(imagheading);
        }

        // create the close span
        let closebutton =document.createElement("span");
        // add classname to closebutton
        closebutton.className="close-button"
        // create the close button text
        let closebuttontext =document.createTextNode("X");
        // append text to close button
        closebutton.appendChild(closebuttontext);
        // add close button to the popup box
        popupBox.appendChild(closebutton)

        // close popup
        document.addEventListener("click" , (el)=>{
            if(el.target.className == 'close-button'){
                // remove the current popup
                el.target.parentNode.remove();
                // remove overlay
                document.querySelector(".popup-overlay").remove()
            }
        })
    })
})

// select All links

let allbullets = document.querySelectorAll(".nav-bullets .bullet");
let alllinks = document.querySelectorAll(".link a");

function scrolltosowhere (element){

    element.forEach(ele =>{
        ele.addEventListener("click", (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
    
        })
    })
}
scrolltosowhere(allbullets)
scrolltosowhere(alllinks)

// handle active state

function handleActive(el){
    // remove active class from all childens
    el.target.parentElement.querySelectorAll(".active").forEach( e =>{
        e.classList.remove("active")
    })
    // add active class on self
    el.target.classList.add("active")
}


let bulletspan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets")

let bulletLocal = localStorage.getItem("option-bullet");

if(bulletLocal !== null){
    bulletspan.forEach(span => {
        span.classList.remove("active")
    })
    if(bulletLocal === "block"){
         bulletscontainer.style.display = "block";

         document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletscontainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletspan.forEach(span => {
    span.addEventListener("click", (e) =>{
        if(span.dataset.display === "show"){
            bulletscontainer.style.display = "block"

            localStorage.setItem("option-bullet", "block")
        }else{
            bulletscontainer.style.display = "none"

            localStorage.setItem("option-bullet", "none")
        }
        handleActive(e)
    })

})

document.querySelector(".reset-options").onclick = function(){

    // localStorage.clear();

    localStorage.removeItem("color-option")
    localStorage.removeItem("background-option")
    localStorage.removeItem("option-bullet")

    window.location.reload()
}

// Toggle menu

let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".link");

toggleBtn.onclick =function(e){

    //stop propagation 
    e.stopPropagation()

    // Toggle class "menu-active" on Button
    this.classList.toggle("menu-active")

    // Toggle class "open" on links
    links.classList.toggle("open")
}

// click Anywhere outside menu and Toggle Button

document.addEventListener("click" , (e)=>{

    if(e.target !== toggleBtn && e.target !== links){

        // check if menu is open

        if(links.classList.contains("open")){
            // Toggle class "menu-active" on Button
             toggleBtn.classList.toggle("menu-active")

            // Toggle class "open" on links
             links.classList.toggle("open")
        }
    }

})

//stop propagation on menu
links.onclick = function(e){
    e.stopPropagation()
}
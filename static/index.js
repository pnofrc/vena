let menu = document.getElementById('menu')
let menuButton = document.getElementById('menuButton')
let changeTheme = document.getElementById('changeTheme')
let cssRoot = document.querySelector(':root');
let projects = document.querySelectorAll('.project')
let centeringButton = document.querySelector('#up')
// let spaceZoom = document.querySelector('#zooming')
var links = document.querySelectorAll('a');
links = Array.prototype.slice.call(links);
var anima = document.querySelectorAll('.anima');
anima = Array.prototype.slice.call(anima);


history.replaceState({},'',location.pathname); // at refresh/enter clean the url path

let logo = document.getElementById("animatedLogo")
// check theme
if (localStorage.length == 0) {
    localStorage.setItem("dark", "y")
}

dark()


// change theme

function changeThemeFunction(){
    if (localStorage.getItem("dark")) {
        localStorage.removeItem("dark")
        localStorage.setItem("lig", 'y')
    }else {
        localStorage.removeItem("lig")
        localStorage.setItem("dark", "y")
    }
    dark()
}

function dark(){
    if (localStorage.getItem("dark")) {
            logo.src="../static/assets/whiteLogo.gif"
            cssRoot.style.setProperty('--text','white')
            cssRoot.style.setProperty('--background','black')
            document.getElementById('menuButton').style.filter="invert()"
    } else {
            logo.src="../static/assets/blackLogo.gif"
            document.getElementById('menuButton').style.filter="none"
            cssRoot.style.setProperty('--text','black')
            cssRoot.style.setProperty('--background','white')
    }
}


    if (localStorage.getItem("info")){
        // setTimeout(() => {
            document.getElementById("loader-container").classList.add('animate__fadeIn')
            document.getElementById("loader-text").style.display="none"
            document.getElementById("loader-container").style.backgroundImage ="url(https://shortpixel.com/img/spinner2.gif) "
            document.getElementById("loader-container").style.backgroundRepeat ="no-repeat "
            document.getElementById("loader-container").style.backgroundPosition ="center "
        // }, 1000);
    } else {
            document.getElementById("loader-container").style.display="flex"
    }




window.addEventListener('load', 
  function() { 

    if (localStorage.getItem("info")){

        setTimeout(() => {
            callLogo()
        }, 10);
        events()

    }else {
        
        document.getElementById("enter").classList.add('animate__flipInX')
        setTimeout(() => {
            document.getElementById("enter").style.display="block"
        }, 1000);
        document.getElementById("enter").addEventListener('click',()=>{
            document.getElementById("loader-container").classList.add('animate__fadeOut')
            setTimeout(() => {
                document.getElementById("loader-container").style.display ="none"
            }, 1000);
            document.getElementById("loader-container").classList.add('animate__fadeOut')
            
            setTimeout(() => {
                callLogo()
            }, 30);

            localStorage.setItem("info",'ok')

            events()
    })}


    


    function events(){
        // when click the page appear buttons and full screen
        window.addEventListener('click',()=>{
            anima.forEach(animo => {
                animo.classList.add('animate__fadeIn')
            });
            if (window.matchMedia("only screen and (max-width: 760px)").matches){
                // callLogo()
                setTimeout(() => {
                    fullscreen()
                }, 200);
            }
        })

        // when move the mouse/touch the screen, appear contents
        window.addEventListener('wheel', () =>{ 
            anima.forEach(animo => {
                animo.classList.add('animate__fadeIn')
            });
        })

        window.addEventListener('touchstart', () =>{
            
            anima.forEach(animo => {
                animo.classList.add('animate__fadeIn')
            });
        })
    }

     // Full screen

    var elem = document.documentElement;

    function fullscreen() {
        if (elem.requestFullscreen) {
        elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        }
    }




   
    function getOffset(el) { // get bounbdaries svg
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX + 'px',
            top: rect.top + window.scrollY+ 'px'
        };
    }

    // map position contents
    let positions = []

    let spacePoints = document.querySelectorAll('circle')
    spacePoints.forEach(point => {
        positions.push(getOffset(point))
    });

    let i = 0
    projects.forEach(project =>{
        project.style.top = positions[i].top
        project.style.left = positions[i].left
        i++
    })


    

    // toggle menu
    menuButton.addEventListener('click', function(){
            // fullscreen()
            if(menu.style.display === 'block'){
                menu.style.display = 'none'
                menuButton.src = "/static/assets/hamburger.svg"
            } else {
                menu.style.display = 'block'
                menuButton.src = "/static/assets/deburger.svg"
            }
        })


    // center page, focus on logo
    function callLogo(){
        document.getElementById("simulate").click
        document.getElementById("animatedLogo").scrollIntoView({block: "center", inline: "center"})
    }

    // Zoom system and centering
    centeringButton.addEventListener('mousedown',()=>{
        // alert()
        callLogo()
        // spaceZoom.style.background = 'black'
        cssRoot.style.setProperty('--zoom',.3)
    })

    centeringButton.addEventListener('mouseup',()=>{
        cssRoot.style.setProperty('--zoom',1)
        // spaceZoom.style.background = 'white'
    })

        centeringButton.addEventListener('touchstart',()=>{
        callLogo()
        // spaceZoom.style.background = 'black'
        cssRoot.style.setProperty('--zoom',.3)
    })

    centeringButton.addEventListener('touchend',()=>{
        cssRoot.style.setProperty('--zoom',1)
        // spaceZoom.style.background = 'white'
    })

    // center page with button bottom left
    // centeringButton.addEventListener('click', () =>{
    //     callLogo()
    // })

    // change theme with button top left
    changeTheme.addEventListener('click', () =>{
        changeThemeFunction()
    })

  


    // center links
        links.forEach(link => {
            var href = link.getAttribute('href');
            if(link.getAttribute('href').startsWith('#')){
                link.addEventListener('click',function(e){
                    e.preventDefault();
                    var dest =  document.getElementById(href.substring(1));
                    dest.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
                })
            }
        });
    


  }, false);
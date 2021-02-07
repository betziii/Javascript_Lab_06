/*  
Here is the exercise on working on the remaining bom method 

Location , Navigator , screen , Window 

Follow the Instruction on the comments 

1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 

Adding Extra is Possible if you want to explore more ...

Good Luck !!! 
*/
const reloadIcon = document.querySelector('.fa');
reloadIcon.addEventListener('click',reloadPage);
function reloadPage(){
    location.reload();
}



// Define UI Variables  here 
const loc = document.querySelectorAll('.collection')[0];
const bro = document.querySelectorAll('.collection')[1];
const screeninfo = document.querySelectorAll('.collection')[2];
const his = document.querySelectorAll('.collection')[3];







// Display the BOM Information on the innerHTML of the elements
loc.firstElementChild.firstElementChild.innerHTML = location.href;
loc.children[1].firstElementChild.innerHTML = location.protocol;
loc.children[2].firstElementChild.innerHTML = location.host;
loc.children[3].firstElementChild.innerHTML = location.port;
loc.children[4].firstElementChild.innerHTML = location.hostname;

bro.firstElementChild.firstElementChild.innerHTML = navigator.appName;
bro.children[1].firstElementChild.innerHTML = navigator.appVersion;
bro.children[2].firstElementChild.innerHTML = navigator.platform;
bro.children[3].firstElementChild.innerHTML = navigator.language;
bro.children[4].firstElementChild.innerHTML = navigator.cookieEnabled;

screeninfo.firstElementChild.firstElementChild.innerHTML = screen.height;
screeninfo.children[1].firstElementChild.innerHTML = screen.width;
screeninfo.children[2].firstElementChild.innerHTML = screen.pixelDepth;

his.firstElementChild.firstElementChild.innerHTML = window.history.length;
his.children[1].firstElementChild.innerHTML = window.history.state;
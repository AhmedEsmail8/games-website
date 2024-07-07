import { Ui } from "./ui.module.js";

let nav = document.getElementsByTagName('nav')[0];
let navLinks = document.getElementsByClassName('nav-link');
let ui = new Ui()

ui.displayGames('mmorpg')

for (let i=0; i<navLinks.length; i++){
    navLinks[i].addEventListener('click', function(e){
        for (let j=0; j<navLinks.length; j++){
            navLinks[j].classList.remove('active');
        }
        navLinks[i].classList.add('active');
        ui.displayGames(navLinks[i].innerHTML);
    })
}

document.addEventListener('DOMContentLoaded', function(e){
    nav.style.marginTop = `${(nav.offsetHeight / 2) * -1}px`;
});
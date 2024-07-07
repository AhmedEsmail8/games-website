import { GameDetails } from "./details.module.js";
import { Games } from "./games.module.js"

export class Ui{
    constructor(){
        this.games = new Games();
        this.gameDetails = new GameDetails();
    }

    getGameCard(game){
        return `<div class="col-lg-4 col-xl-3 col-md-6">
                        <div class="game-card w-100 h-100 border border-black border-1 border-opacity-25 rounded-3 d-flex flex-column" data-id="${game.id}">
                            <div class="card-body p-3">
                                <div class="w-100">
                                    <img src="${game.thumbnail}" alt="" class="w-100 rounded-top card-img">
                                </div>
                                <div class="card-title text-white mt-2 d-flex align-items-center justify-content-between">
                                    <div class="text-capitalize">${game.title}</div>
                                    <div class="badge text-capitalize text-bg-primary py-2 card-price">free</div>
                                </div>
                                <p class="card-text text-white w-100 text-center opacity-50 small mt-2">${game.short_description}</p>
                            </div>
                            <div class="card-line w-100"></div>
                            <div class="card-footer w-100 d-flex align-items-center justify-content-between px-3 py-2">
                                <div class="badge text-capitalize dark-badge">${game.genre}</div>
                                <div class="badge text-capitalize dark-badge">${game.platform}</div>
                            </div>
                        </div>
                    </div>`
    }

    async displayGames(genre){
        this.showLoader();
        let container = document.getElementById('gamesContainer');
        container.innerHTML = ''
        let data = await this.games.fetchData(genre);
        data.forEach(element => {
            container.innerHTML += this.getGameCard(element);
        });
        let gameCards = document.getElementsByClassName('game-card');
        for (let i=0; i<gameCards.length; i++){
            gameCards[i].addEventListener('click', (e) => {
                this.showDetails(e.currentTarget.getAttribute('data-id'));
            })
        }
        this.hideLoader();
        if (window.innerWidth < 992)
            document.getElementsByClassName('navbar-toggler')[0].click();
    }

    showLoader(){
        let loader = document.getElementsByClassName('loader-container')[0];
        let gamesContainer = document.getElementById('gamesContainer');
        loader.classList.remove('d-none');
        gamesContainer.classList.add('d-none');
    }

    hideLoader(){
        let loader = document.getElementsByClassName('loader-container')[0];
        let gamesContainer = document.getElementById('gamesContainer');
        loader.classList.add('d-none');
        gamesContainer.classList.remove('d-none');
    }

    async showDetails(id){
        this.showLoader();

        let detailsContainer = document.getElementById('detailsContainer');
        let details = await this.gameDetails.getDetails(id);
        let homeSection = document.getElementById('home');
        let detailsSection = document.getElementById('details');
        
        detailsContainer.innerHTML = `<div class="col-12 my-4">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <h1 class="fs-3 text-white">Game Details</h1>
                        <button class="btn-close btn-close-white" id="btnClose"></button>
                    </div>
                </div>

                <div class="col-md-4">
                    <img src="${details.thumbnail}" alt="" class="w-100">
                </div>

                <div class="col-md-8">
                    <div class="d-flex flex-column row-gap-2">
                        <h3 class="text-white mt-md-0 mt-3">Title: ${details.title}</h3>
                        <h6 class="text-white">Category: <span class="text-uppercase badge text-bg-info">${details.genre}</span></h6>
                        <h6 class="text-white">Platform: <span class="text-capitalize badge text-bg-info">${details.platform}</span></h6>
                        <h6 class="text-white">Status: <span class="text-capitalize badge text-bg-info">${details.status}</span></h6>
                        <p>${details.description}</p>
                        <a href="${details.game_url}" target="_blank" ><button class="btn btn-outline-warning text-white">Show Game</button></a>
                    </div>
                </div>`;
        
        let detailsCloseBtn = document.getElementById('btnClose');
        homeSection.classList.add('d-none');
        detailsSection.classList.remove('d-none');
        detailsCloseBtn.addEventListener('click', (e) => {
            homeSection.classList.remove('d-none');
            detailsSection.classList.add('d-none');
            this.hideLoader();
        })
    }
}
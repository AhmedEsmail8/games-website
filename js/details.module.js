export class GameDetails{

    getApi(id){
        return `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    }

    async getDetails(id){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e37a6a9979msh984581ba764d6aep1f4da3jsnf27d65abb6fc',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
        const api = await fetch(this.getApi(id), options);
        const data = await api.json();


        return data;
    }
}
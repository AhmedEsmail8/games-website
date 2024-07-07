export class Games{

    getApi(category){
        return `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    }

    async fetchData(category='shooter'){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'e37a6a9979msh984581ba764d6aep1f4da3jsnf27d65abb6fc',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
        const api = await fetch(this.getApi(category), options);
        const data = await api.json();

        console.log(data);
        return data;
    }
}
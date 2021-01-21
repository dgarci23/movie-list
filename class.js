class API {

    async get() {

        const response = await fetch("movies.json");

        const resData = await response.json();

        return resData;

    }
}
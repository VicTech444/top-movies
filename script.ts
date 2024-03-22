
const $ = (selector: string) => document.querySelector(selector);

const $moviesContainer = $('.movies-container') as HTMLElement;

interface returnedCall {
    movies: Array<moviesInformation>;
    page: number;
}

interface moviesInformation {
    _id: number
    backdrop_path: string
    first_aired: string
    genres: Array<string>
    original_title: string
    overview: string
    poster_path: string
    title: string
    contentType: string
}

const saveInfoFromAPI = async (): Promise<returnedCall> => {
    const url = 'https://movies-api14.p.rapidapi.com/shows';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd71277fb3amsh48f2e738c039c11p106d64jsnf5af55d3ca18',
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
        }
    };

    let wholeRepository = await fetch(url, options);
    let objectDescompiled = await wholeRepository.json() as returnedCall;

    return objectDescompiled;
}

let db: IDBDatabase;
let dataBaseRequest = indexedDB.open("Center Information");

const addEventToDB = async (): Promise<void> => {
    dataBaseRequest.addEventListener('error', (ev) => console.log(ev));

    dataBaseRequest.addEventListener('success', (ev) => {
        db = (ev.target as IDBOpenDBRequest).result;

        let movieStore = db.transaction('movies information', "readwrite");
        let store = movieStore.objectStore('movies information');

        let movieInfoResponse = store.getAll() as unknown as IDBRequest<object>;

        movieInfoResponse.addEventListener('success', (ev) => {
            let movieInfoFromDB = movieInfoResponse.result as moviesInformation[];

            let documentFragment = document.createDocumentFragment();

            for (let i = 0; i < movieInfoFromDB.length; i++) {
                let div = document.createElement('div');
                let img = document.createElement('img');

                img.setAttribute('loading', 'lazy');
                img.setAttribute('src', movieInfoFromDB[i].poster_path);

                div.append(img);
                documentFragment.append(div);
            }

            $moviesContainer.append(documentFragment);
        })
    });

    dataBaseRequest.addEventListener('upgradeneeded', async (ev) => {
        db = (ev.target as IDBOpenDBRequest).result;

        db.createObjectStore('movies information', { autoIncrement: true });
        db.createObjectStore('reviews information', { autoIncrement: true });

        let infoFromAPI = await saveInfoFromAPI();

        let { movies, page } = infoFromAPI;

        let optimizedImageObject: moviesInformation[] = movies;

        for (let i = 0; i < 15; i++) {
            let div = document.createElement('div');
            let img = document.createElement('img');

            img.setAttribute('loading', 'lazy');
            img.setAttribute('src', optimizedImageObject[i].poster_path);

            div.append(img);

            $moviesContainer.append(div);
        }

        let movieStore = db.transaction('movies information', "readwrite");
        let store = movieStore.objectStore('movies information');

        for (let i = 0; i < 15; i++) {
            store.add(optimizedImageObject[i]);
        }
    })
}

addEventToDB()






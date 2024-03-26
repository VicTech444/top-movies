interface returnedCall {
    movies: Array<moviesInformation>;
    page: number;
}

interface moviesInformation {
    _id: number;
    backdrop_path: string;
    first_aired: string;
    genres: Array<string>;
    original_title: string;
    overview: string;
    poster_path: string;
    title: string;
    contentType: string;
}

interface reviewInformation {
    name: string;
    message: string;
    date: string;
    id: string;
}

const $ = (selector: string) => document.querySelector(selector);

const $mainMovieContainer = $('.movie-top-container') as HTMLDivElement;
const $movieListContainer = $('.movie-list-container') as HTMLDivElement;
const $gridTableBtn = $('.grid-table-btn') as HTMLDivElement
const $gridTable = $('.grid-table-movies-container') as HTMLDivElement
const $tableBody = $('#tableBody') as HTMLTableElement;

const $movieHomepage = $('.movie-homepage') as HTMLDivElement;
const $movieBackGround = $('.background-image') as HTMLDivElement;
const $movieTitle = $('#movie-title') as HTMLDivElement;
const $yearAired = $(`#year-aired`) as HTMLDivElement;
const $likeOrDislikeMovie = $(`#likeOnMovie`) as HTMLDivElement
const $description = $(`#movie-description`) as HTMLDivElement;

const $reviewListBtn = $(`#review-list`) as HTMLButtonElement;
const $reviewFormBtn = $(`#review-form`) as HTMLButtonElement;

const $reviewListContainer = $(`.review-list`) as HTMLDivElement;
const $reviewFormContainer = $(`.review-form`) as HTMLDivElement;

const $nameInput = $(`#name-input`) as HTMLInputElement;
const $reviewMessage = $(`#textarea-msg`) as HTMLTextAreaElement;
const $submitReviewBtn = $(`#submit-btn`) as HTMLButtonElement;

let documentFragment = document.createDocumentFragment();
let date = new Date();

const saveInfoAPI = async (): Promise<returnedCall> => {
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

const program = async (): Promise<void> => {
    let moviesOnIndex = 15;

    dataBaseRequest.addEventListener('error', (ev) => console.log(ev));

    dataBaseRequest.addEventListener('success', (ev) => {
        dataBase = (ev.target as IDBOpenDBRequest).result;

        if (dataBase.objectStoreNames.length > 0) {
            let movieTransaction = dataBase.transaction('movies information', "readwrite");
            let movieStore = movieTransaction.objectStore('movies information');

            let movieResponse = movieStore.getAll() as unknown as IDBRequest<object>;

            movieResponse.addEventListener('success', (ev) => {
                if ((ev.target as IDBRequest).result.length !== 0) {
                    let moviesFromDataBase = movieResponse.result as moviesInformation[];

                    for (let i = 0; i < moviesOnIndex; i++) { placeInfoAtIndex(moviesFromDataBase[i], i, 1) }

                    $movieListContainer.append(documentFragment);

                    placeLikeDBInfo()

                    likeEvents()
                }
            })
        }
    });

    dataBaseRequest.addEventListener('upgradeneeded', async (ev) => {
        dataBase = (ev.target as IDBOpenDBRequest).result;

        dataBase.createObjectStore('movies information', { autoIncrement: true });
        dataBase.createObjectStore('likes information', { autoIncrement: true });
        dataBase.createObjectStore('reviews information', { keyPath: "id" });

        let infoAPI = await saveInfoAPI();

        let { movies, page } = infoAPI;

        for (let i = 0; i < moviesOnIndex; i++) { placeInfoAtIndex(movies[i], i, 2) }

        likeEvents()

        let movieTransaction = dataBase.transaction('movies information', "readwrite");
        let movieStore = movieTransaction.objectStore('movies information');

        for (let i = 0; i < moviesOnIndex; i++) {
            movieStore.add(movies[i]);
        }
    })
}

const placeInfoAtIndex = (movieInfo: moviesInformation, id: number, number: number) => {
    let likeID = id + id + 1;
    let dislikeID = id + id + 2;

    const $parentDiv = document.createElement('div');
    const $divWithInfo = document.createElement('div');
    const $divWithLike = document.createElement('div');
    const $divWithDislike = document.createElement('div');
    const $divWithImg = document.createElement('div');

    $divWithImg.classList.add('bg-img', 'dp-flex', `bg-${id + 1}`, 'ai-end');
    $divWithImg.style.backgroundImage = `url(${movieInfo.poster_path})`;

    $divWithImg.addEventListener('click', (ev) => showSelectedMovie(ev))

    $divWithLike.innerHTML = `<svg class="likes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" fill="#fff" class="i-${likeID} "/></svg>`;
    $divWithDislike.innerHTML = `<svg class="dislikes"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" fill="#fff" class="i-${dislikeID} "/></svg>`;

    $divWithInfo.classList.add('dp-flex', 'fd-column', 'likeAndYearDIV', 'width-100');
    $divWithInfo.innerHTML = `
    <div class="title">${movieInfo.title}</div>
        <div class="like-dislike dp-flex">
            <div class="dp-flex">${$divWithLike.innerHTML}</div> 
            <div class="dp-flex">${$divWithDislike.innerHTML}</div> 
        </div>`;

    $parentDiv.addEventListener('mouseenter', (ev) => $divWithInfo.style.opacity = '1');
    $parentDiv.addEventListener('mouseleave', (ev) => $divWithInfo.style.opacity = '0');

    $divWithImg.append($divWithInfo);
    $parentDiv.append($divWithImg);

    let randomLikeAmount = Math.floor((Math.random() * 80) + 1).toFixed(0);
    let randomdislikeAmount = Math.floor((Math.random() * 10) + 1).toFixed(0);

    $tableBody.innerHTML += `
                <tr>
                    <td><img src="${movieInfo.backdrop_path}" alt="This is the poster image"></td>
                    <td>${movieInfo.title}</td>
                    <td>${movieInfo.first_aired}</td>
                    <td>${randomLikeAmount} <svg class="likes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" fill="#fff" class="i-${likeID}"/></svg></td>
                    <td>${randomdislikeAmount} <svg class="dislikes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" fill="#fff" class="i-${dislikeID}"/></svg></td>
                </tr>`

    if (number === 2) {
        $movieListContainer.append($parentDiv);

    } else if (number === 1) {
        documentFragment.append($parentDiv);
    }
}

const likeEvents = () => {
    const $likeSVGS = document.querySelectorAll('.likes') as NodeListOf<SVGElement>;
    const $dislikeSVGS = document.querySelectorAll('.dislikes') as NodeListOf<SVGElement>;

    $likeSVGS.forEach((element) => element.addEventListener('click', () => {
        giveLikeDislike(element, "likes")
    }));

    $dislikeSVGS.forEach((element) => element.addEventListener('click', () => {
        giveLikeDislike(element, "dislikes")
    }));
}

const giveLikeDislike = ($svgElement: SVGElement, option: "likes" | "dislikes"): void => {
    let transaction = dataBase.transaction('likes information', 'readwrite');
    let likeInfoDB = transaction.objectStore('likes information');

    if (option === "likes") {

        let $pathLike = $svgElement.firstElementChild;
        const $pathLikes = document.querySelectorAll(`.${$pathLike?.classList[0]}`);

        $pathLikes.forEach($path => {
            $path?.classList.add('like-on');
        })

        likeInfoDB.add("likes", $pathLike?.classList[0]);

        const $dislikeDiv = $svgElement.parentElement?.nextElementSibling;
        const $pathDislike = $dislikeDiv?.firstElementChild?.firstElementChild as SVGPathElement;
        const $pathDislikes = document.querySelectorAll(`.${$pathDislike?.classList[0]}`);

        $pathDislikes.forEach($path => {
            $path.classList.remove('dislike-on');
        })

        likeInfoDB.delete($pathDislike.classList[0])

    } else if (option === "dislikes") {
        const $pathDislike = $svgElement.firstElementChild;
        const $pathDislikes = document.querySelectorAll(`.${$pathDislike?.classList[0]}`);

        $pathDislikes.forEach($path => {
            $path.classList.add('dislike-on');
        })

        likeInfoDB.add("dislikes", $pathDislike?.classList[0])

        const $likeDiv = $svgElement.parentElement?.previousElementSibling
        const $pathLike = $likeDiv?.firstElementChild?.firstElementChild as SVGPathElement;
        const $pathLikes = document.querySelectorAll(`.${$pathLike?.classList[0]}`);

        $pathLikes.forEach($path => {
            $path?.classList.remove('like-on');
        })

        likeInfoDB.delete($pathLike.classList[0])
    }
}

$gridTableBtn.addEventListener('click', (ev) => {
    if ($gridTable.classList.contains('active')) {
        $gridTable.classList.replace('active', 'hidden');
        $movieListContainer.classList.remove('hidden')

    } else {
        $gridTable.classList.replace('hidden', 'active');
        $movieListContainer.classList.add('hidden');
    }
})

const placeLikeDBInfo = () => {
    let likesTransaction = dataBase.transaction('likes information', 'readonly');
    let likeStore = likesTransaction.objectStore('likes information');

    let likeDataBase = likeStore.getAllKeys();

    likeDataBase.onsuccess = (ev) => {
        let target: Array<string> = (ev.target as IDBRequest).result;

        let idExp = /.-(.+)/;

        target.forEach(element => {
            let id = idExp.exec(element);

            if (id) {
                let numberID = parseInt(id[1]);
                let div = document.querySelectorAll(`.${element}`) as unknown as SVGPathElement[];

                if (numberID % 2 === 1) {
                    div.forEach(element => element.classList.add('like-on'));

                } else if (numberID % 2 === 0) {
                    div.forEach(element => element.classList.add('dislike-on'));
                }
            }
        })
    }
}

const showSelectedMovie = (ev: MouseEvent) => {
    const placeMovieInfo = async () => {
        let target = (ev.target as HTMLElement);
        let classExp = /..-(.+)/;
        let className = target.classList[2];
        let classID = classExp.exec(className);

        if (classID) {
            let transaction = dataBase.transaction('movies information', 'readonly');
            let movieStore = transaction.objectStore('movies information');

            let movieDB = movieStore.get(parseInt(classID[1]));

            movieDB.onsuccess = (ev) => {
                let movie: moviesInformation = (ev.target as IDBRequest).result;

                $movieHomepage.classList.remove('hidden');
                $mainMovieContainer.classList.add('hidden');

                $movieBackGround.style.backgroundImage = `url(${movie.backdrop_path})`;
                $movieBackGround.id = `${movie._id}`;
                $movieTitle.innerHTML = `<span>${movie.title}</span>`;
                $yearAired.innerHTML = `<span>${movie.first_aired}</span>`;

                let likeDiv: HTMLDivElement = target?.firstElementChild?.lastElementChild?.firstElementChild as HTMLDivElement;
                let dislikeDiv: HTMLDivElement = likeDiv.nextElementSibling as HTMLDivElement;

                $likeOrDislikeMovie.innerHTML += `
                     <div class="dp-flex">${likeDiv.innerHTML}</div>
                     <div class="dp-flex">${dislikeDiv.innerHTML}</div>`
                $description.innerHTML = `<p>${movie.overview}</p>`;

                history.pushState({}, "", `${movie._id}`);

                $(`.movie-homepage .likes`)?.addEventListener('click', (ev) => {
                    let target = (ev.target as SVGElement | SVGPathElement);
                    if (target.nodeName === "path") {
                        let newTarget = target.parentElement as unknown as SVGElement;
                        giveLikeDislike(newTarget, "likes");

                    } else {
                        giveLikeDislike(target, "likes");
                    }
                });

                $(`.movie-homepage .dislikes`)?.addEventListener('click', (ev) => {
                    let target = (ev.target as SVGElement | SVGPathElement);
                    if (target.nodeName === "path") {
                        let newTarget = target.parentElement as unknown as SVGElement;
                        giveLikeDislike(newTarget, "dislikes");

                    } else {
                        giveLikeDislike(target, "dislikes");
                    }
                });
            }
        }
    }

    const placeReviewDBInfo = async () => {
        setTimeout(() => {
            let reviewsTransaction = dataBase.transaction('reviews information', 'readonly');
            let reviewStore = reviewsTransaction.objectStore('reviews information');
            let reviews = reviewStore.getAll()

            let ID = $(`.movie-homepage .background-image`)?.id as string
            
            reviews.onsuccess = (ev) => {
                let target: reviewInformation[] = (ev.target as IDBRequest).result;

                if (target.length !== 0) {
                    target.forEach(element => {
                        if (element.id === ID) {
                            $reviewListContainer.innerHTML += `
                            <div class="review dp-flex fd-column">
                                <div class="name-review">${element.name} <small>(${element.date})</small></div>
                                <div class="message">${element.message}</div>
                            </div>`;
                        }
                    })
                }
            }
        }, 100);
    }

    const menu = async () => {
        await placeMovieInfo();
        placeReviewDBInfo();
    }

    menu();
}

$reviewListBtn?.addEventListener('click', (ev) => {
    $reviewListContainer.classList.remove('hidden');
    $reviewFormContainer.classList.add('hidden');

})

$reviewFormBtn?.addEventListener('click', (ev) => {
    $reviewFormContainer.classList.remove('hidden');
    $reviewListContainer.classList.add('hidden');

});

$submitReviewBtn.addEventListener('click', (ev) => {
    reviewFormValidation().then(response => {
        if (response) {
            let transaction = dataBase.transaction('reviews information', 'readwrite');
            let reviewStore = transaction.objectStore('reviews information');
            let ID = $(`.movie-homepage .background-image`)?.id;

            $reviewListContainer.innerHTML += `
            <div class="review dp-flex fd-column width-100">
                <div class="name-review">${$nameInput.value} <small>${date.toLocaleDateString()}</small></div>
                <div class="message">${$reviewMessage.value}</div>
            </div>`;

            reviewStore.add({
                name: $nameInput.value,
                message: $reviewMessage.value,
                date: date.toLocaleDateString(),
                id: ID
            });

            $nameInput.value = "";
            $reviewMessage.value = "";
        }
    })
})

const reviewFormValidation = (): Promise<true> => {
    return new Promise<true>((resolve, reject) => {
        if ($nameInput.validity.valueMissing || $nameInput.value == "") {
            reject(`There's a value missing on name`);

        } else if ($nameInput.validity.tooShort || $nameInput.value.length < $nameInput.minLength) {
            reject(`The name is to short, you need a minimum of ${$nameInput.minLength} characters`);

        } else if ($nameInput.validity.tooLong || $nameInput.value.length > $nameInput.maxLength) {
            reject(`The name is to long, you need a maximum of ${$nameInput.maxLength} characters`);

        } else if ($nameInput.validity.typeMismatch) {
            reject(`The name can't be only numbers!`);

        } else if ($reviewMessage.validity.valueMissing || $reviewMessage.value == "") {
            reject(`There's a value missing on the message`);

        } else if ($reviewMessage.validity.tooShort || $reviewMessage.value.length < $reviewMessage.minLength) {
            reject(`The message is to short, you need a minimum of ${$reviewMessage.minLength} characters`);

        } else if ($reviewMessage.validity.tooLong || $reviewMessage.value.length > $reviewMessage.maxLength) {
            reject(`The message is to long, you need a maximum of ${$reviewMessage.maxLength} characters`);

        } else {
            resolve(true)
        }
    })
}

let dataBase: IDBDatabase;
let dataBaseRequest = indexedDB.open("Center Information");

program()

window.addEventListener('popstate', (ev) => window.location.reload());

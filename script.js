var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var $ = function (selector) { return document.querySelector(selector); };
var $movieContainer = $('.movies-container');
var documentFragment = document.createDocumentFragment();
var saveInfoAPI = function () { return __awaiter(_this, void 0, void 0, function () {
    var url, options, wholeRepository, objectDescompiled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://movies-api14.p.rapidapi.com/shows';
                options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'd71277fb3amsh48f2e738c039c11p106d64jsnf5af55d3ca18',
                        'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
                    }
                };
                return [4 /*yield*/, fetch(url, options)];
            case 1:
                wholeRepository = _a.sent();
                return [4 /*yield*/, wholeRepository.json()];
            case 2:
                objectDescompiled = _a.sent();
                return [2 /*return*/, objectDescompiled];
        }
    });
}); };
var db;
var dataBaseRequest = indexedDB.open("Center Information");
var addEventToDataB = function () { return __awaiter(_this, void 0, void 0, function () {
    var amountOfMovies;
    var _this = this;
    return __generator(this, function (_a) {
        amountOfMovies = 15;
        dataBaseRequest.addEventListener('error', function (ev) { return console.log(ev); });
        dataBaseRequest.addEventListener('success', function (ev) {
            db = ev.target.result;
            if (db.objectStoreNames.length > 0) {
                var movieStore = db.transaction('movies information', "readwrite");
                var store = movieStore.objectStore('movies information');
                var movieInfoResponse_1 = store.getAll();
                movieInfoResponse_1.addEventListener('success', function (ev) {
                    if (ev.target.result.length !== 0) {
                        var movieInfoFromDB = movieInfoResponse_1.result;
                        for (var i = 0; i < amountOfMovies; i++) {
                            placeInfoAtIndex(movieInfoFromDB[i], i, 1);
                        }
                        $movieContainer.append(documentFragment);
                        // Fn that places DBInfoAtIndex
                        var $likeDivs = document.querySelectorAll('.likes');
                        var $dislikeDivs = document.querySelectorAll('.dislikes');
                        $likeDivs.forEach(function (element) { return element.addEventListener('click', function () {
                            giveLikeDislike(element, "likes");
                        }); });
                        $dislikeDivs.forEach(function (element) { return element.addEventListener('click', function () {
                            giveLikeDislike(element, "dislikes");
                        }); });
                    }
                });
            }
        });
        dataBaseRequest.addEventListener('upgradeneeded', function (ev) { return __awaiter(_this, void 0, void 0, function () {
            var infoFromAPI, movies, page, i, $likeDivs, $dislikeDivs, movieStore, store, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = ev.target.result;
                        db.createObjectStore('movies information', { autoIncrement: true });
                        db.createObjectStore('likes information', { autoIncrement: true });
                        db.createObjectStore('reviews information', { autoIncrement: true });
                        return [4 /*yield*/, saveInfoAPI()];
                    case 1:
                        infoFromAPI = _a.sent();
                        movies = infoFromAPI.movies, page = infoFromAPI.page;
                        for (i = 0; i < amountOfMovies; i++) {
                            placeInfoAtIndex(movies[i], i, 2);
                        }
                        $likeDivs = document.querySelectorAll('.likes');
                        $dislikeDivs = document.querySelectorAll('.dislikes');
                        $likeDivs.forEach(function (element) { return element.addEventListener('click', function () {
                            giveLikeDislike(element, "likes");
                        }); });
                        $dislikeDivs.forEach(function (element) { return element.addEventListener('click', function () {
                            giveLikeDislike(element, "dislikes");
                        }); });
                        movieStore = db.transaction('movies information', "readwrite");
                        store = movieStore.objectStore('movies information');
                        for (i = 0; i < amountOfMovies; i++) {
                            store.add(movies[i]);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var placeInfoAtIndex = function (movieInfo, id, number) {
    var likeID = id + id + 1;
    var dislikeID = id + id + 2;
    var $divContainer = document.createElement('div');
    var $divWithInfo = document.createElement('div');
    var $divWithLike = document.createElement('div');
    var $divWithDislike = document.createElement('div');
    var $divWithImg = document.createElement('div');
    $divWithImg.classList.add('bg-img', 'dp-flex');
    $divWithImg.style.backgroundImage = "url(".concat(movieInfo.poster_path, ")");
    $divWithLike.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z\" fill=\"#fff\" id=\"".concat(likeID, "\"/></svg>");
    $divWithDislike.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z\" fill=\"#fff\" id=\"".concat(dislikeID, "\"/></svg>");
    $divWithInfo.classList.add('dp-flex', 'fd-column', 'divWithInfo');
    $divWithInfo.innerHTML = "\n        <div class=\"like-dislike dp-flex\">\n            <div class=\"likes dp-flex\">".concat($divWithLike.innerHTML, "</div> \n            <div class=\"dislikes dp-flex\">").concat($divWithDislike.innerHTML, "</div> \n        </div>\n        <div class=\"year\">").concat(movieInfo.first_aired, "</div>");
    $divWithLike.addEventListener('click', function (ev) {
        var $localVar = (ev.target);
        $localVar.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill=\"#63E6BE\" d=\"M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z\"/></svg>";
        $divWithDislike.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z\" fill=\"#fff\"/></svg>";
    });
    $divWithDislike.addEventListener('click', function (ev) {
        var $localDislike = (ev.target);
        $localDislike.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill=\"#63E6BE\" d=\"M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z\"/></svg>";
        $divWithLike.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z\" fill=\"#fff\"/></svg>";
    });
    $divContainer.addEventListener('mouseenter', function (ev) { return $divWithInfo.style.opacity = '1'; });
    $divContainer.addEventListener('mouseleave', function (ev) { return $divWithInfo.style.opacity = '0'; });
    $divWithImg.append($divWithInfo);
    $divContainer.append($divWithImg);
    if (number === 2) {
        $movieContainer.append($divContainer);
    }
    else if (number === 1) {
        documentFragment.append($divContainer);
    }
};
var giveLikeDislike = function ($divInCase, option) {
    var _a, _b, _c, _d;
    var transaction = db.transaction('likes information', 'readwrite');
    var likeInfoDB = transaction.objectStore('likes information');
    if (option === "likes") {
        var $pathLike = (_a = $divInCase.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        $pathLike.classList.add('like-on');
        likeInfoDB.add("likes", $pathLike.id);
        var $dislikeSibling = $divInCase.nextElementSibling;
        var $pathDislike = (_b = $dislikeSibling.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild;
        $pathDislike.classList.remove('dislike-on');
        likeInfoDB.delete($pathDislike.id);
    }
    else if (option === "dislikes") {
        var $pathDislike = (_c = $divInCase.firstElementChild) === null || _c === void 0 ? void 0 : _c.firstElementChild;
        $pathDislike.classList.add('dislike-on');
        likeInfoDB.add("dislikes", $pathDislike.id);
        var $likeSibling = $divInCase.previousElementSibling;
        var $pathLike = (_d = $likeSibling.firstElementChild) === null || _d === void 0 ? void 0 : _d.firstElementChild;
        $pathLike.classList.remove('like-on');
        likeInfoDB.delete($pathLike.id);
    }
};
addEventToDataB();

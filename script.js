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
var $mainMovieContainer = $('.movie-top-container');
var $movieListContainer = $('.movie-list-container');
var $gridTableBtn = $('.grid-table-btn');
var $gridTable = $('.grid-table-movies-container');
var $tableBody = $('#tableBody');
var $movieHomepage = $('.movie-homepage');
var $movieBackGround = $('.background-image');
var $movieTitle = $('#movie-title');
var $yearAired = $("#year-aired");
var $likeOrDislikeMovie = $("#likeOnMovie");
var $description = $("#movie-description");
var $reviewListBtn = $("#review-list");
var $reviewFormBtn = $("#review-form");
var $reviewListContainer = $(".review-list");
var $reviewFormContainer = $(".review-form");
var $nameInput = $("#name-input");
var $reviewMessage = $("#textarea-msg");
var $submitReviewBtn = $("#submit-btn");
var documentFragment = document.createDocumentFragment();
var date = new Date();
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
var program = function () { return __awaiter(_this, void 0, void 0, function () {
    var moviesOnIndex;
    var _this = this;
    return __generator(this, function (_a) {
        moviesOnIndex = 15;
        dataBaseRequest.addEventListener('error', function (ev) { return console.log(ev); });
        dataBaseRequest.addEventListener('success', function (ev) {
            dataBase = ev.target.result;
            if (dataBase.objectStoreNames.length > 0) {
                var movieTransaction = dataBase.transaction('movies information', "readwrite");
                var movieStore = movieTransaction.objectStore('movies information');
                var movieResponse_1 = movieStore.getAll();
                movieResponse_1.addEventListener('success', function (ev) {
                    if (ev.target.result.length !== 0) {
                        var moviesFromDataBase = movieResponse_1.result;
                        for (var i = 0; i < moviesOnIndex; i++) {
                            placeInfoAtIndex(moviesFromDataBase[i], i, 1);
                        }
                        $movieListContainer.append(documentFragment);
                        placeLikeDBInfo();
                        likeEvents();
                    }
                });
            }
        });
        dataBaseRequest.addEventListener('upgradeneeded', function (ev) { return __awaiter(_this, void 0, void 0, function () {
            var infoAPI, movies, page, i, movieTransaction, movieStore, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataBase = ev.target.result;
                        dataBase.createObjectStore('movies information', { autoIncrement: true });
                        dataBase.createObjectStore('likes information', { autoIncrement: true });
                        dataBase.createObjectStore('reviews information', { keyPath: "id" });
                        return [4 /*yield*/, saveInfoAPI()];
                    case 1:
                        infoAPI = _a.sent();
                        movies = infoAPI.movies, page = infoAPI.page;
                        for (i = 0; i < moviesOnIndex; i++) {
                            placeInfoAtIndex(movies[i], i, 2);
                        }
                        likeEvents();
                        movieTransaction = dataBase.transaction('movies information', "readwrite");
                        movieStore = movieTransaction.objectStore('movies information');
                        for (i = 0; i < moviesOnIndex; i++) {
                            movieStore.add(movies[i]);
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
    var $parentDiv = document.createElement('div');
    var $divWithInfo = document.createElement('div');
    var $divWithLike = document.createElement('div');
    var $divWithDislike = document.createElement('div');
    var $divWithImg = document.createElement('div');
    $divWithImg.classList.add('bg-img', 'dp-flex', "bg-".concat(id + 1), 'ai-end');
    $divWithImg.style.backgroundImage = "url(".concat(movieInfo.poster_path, ")");
    $divWithImg.addEventListener('click', function (ev) { return showSelectedMovie(ev); });
    $divWithLike.innerHTML = "<svg class=\"likes\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z\" fill=\"#fff\" class=\"i-".concat(likeID, " \"/></svg>");
    $divWithDislike.innerHTML = "<svg class=\"dislikes\"xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z\" fill=\"#fff\" class=\"i-".concat(dislikeID, " \"/></svg>");
    $divWithInfo.classList.add('dp-flex', 'fd-column', 'likeAndYearDIV', 'width-100');
    $divWithInfo.innerHTML = "\n    <div class=\"title\">".concat(movieInfo.title, "</div>\n        <div class=\"like-dislike dp-flex\">\n            <div class=\"dp-flex\">").concat($divWithLike.innerHTML, "</div> \n            <div class=\"dp-flex\">").concat($divWithDislike.innerHTML, "</div> \n        </div>");
    $parentDiv.addEventListener('mouseenter', function (ev) { return $divWithInfo.style.opacity = '1'; });
    $parentDiv.addEventListener('mouseleave', function (ev) { return $divWithInfo.style.opacity = '0'; });
    $divWithImg.append($divWithInfo);
    $parentDiv.append($divWithImg);
    var randomLikeAmount = Math.floor((Math.random() * 80) + 1).toFixed(0);
    var randomdislikeAmount = Math.floor((Math.random() * 10) + 1).toFixed(0);
    $tableBody.innerHTML += "\n                <tr>\n                    <td><img src=\"".concat(movieInfo.backdrop_path, "\" alt=\"This is the poster image\"></td>\n                    <td>").concat(movieInfo.title, "</td>\n                    <td>").concat(movieInfo.first_aired, "</td>\n                    <td>").concat(randomLikeAmount, " <svg class=\"likes\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z\" fill=\"#fff\" class=\"i-").concat(likeID, "\"/></svg></td>\n                    <td>").concat(randomdislikeAmount, " <svg class=\"dislikes\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" width=\"16px\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z\" fill=\"#fff\" class=\"i-").concat(dislikeID, "\"/></svg></td>\n                </tr>");
    if (number === 2) {
        $movieListContainer.append($parentDiv);
    }
    else if (number === 1) {
        documentFragment.append($parentDiv);
    }
};
var likeEvents = function () {
    var $likeSVGS = document.querySelectorAll('.likes');
    var $dislikeSVGS = document.querySelectorAll('.dislikes');
    $likeSVGS.forEach(function (element) { return element.addEventListener('click', function () {
        giveLikeDislike(element, "likes");
    }); });
    $dislikeSVGS.forEach(function (element) { return element.addEventListener('click', function () {
        giveLikeDislike(element, "dislikes");
    }); });
};
var giveLikeDislike = function ($svgElement, option) {
    var _a, _b, _c, _d;
    var transaction = dataBase.transaction('likes information', 'readwrite');
    var likeInfoDB = transaction.objectStore('likes information');
    if (option === "likes") {
        var $pathLike = $svgElement.firstElementChild;
        var $pathLikes = document.querySelectorAll(".".concat($pathLike === null || $pathLike === void 0 ? void 0 : $pathLike.classList[0]));
        $pathLikes.forEach(function ($path) {
            $path === null || $path === void 0 ? void 0 : $path.classList.add('like-on');
        });
        likeInfoDB.add("likes", $pathLike === null || $pathLike === void 0 ? void 0 : $pathLike.classList[0]);
        var $dislikeDiv = (_a = $svgElement.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
        var $pathDislike = (_b = $dislikeDiv === null || $dislikeDiv === void 0 ? void 0 : $dislikeDiv.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild;
        var $pathDislikes = document.querySelectorAll(".".concat($pathDislike === null || $pathDislike === void 0 ? void 0 : $pathDislike.classList[0]));
        $pathDislikes.forEach(function ($path) {
            $path.classList.remove('dislike-on');
        });
        likeInfoDB.delete($pathDislike.classList[0]);
    }
    else if (option === "dislikes") {
        var $pathDislike = $svgElement.firstElementChild;
        var $pathDislikes = document.querySelectorAll(".".concat($pathDislike === null || $pathDislike === void 0 ? void 0 : $pathDislike.classList[0]));
        $pathDislikes.forEach(function ($path) {
            $path.classList.add('dislike-on');
        });
        likeInfoDB.add("dislikes", $pathDislike === null || $pathDislike === void 0 ? void 0 : $pathDislike.classList[0]);
        var $likeDiv = (_c = $svgElement.parentElement) === null || _c === void 0 ? void 0 : _c.previousElementSibling;
        var $pathLike = (_d = $likeDiv === null || $likeDiv === void 0 ? void 0 : $likeDiv.firstElementChild) === null || _d === void 0 ? void 0 : _d.firstElementChild;
        var $pathLikes = document.querySelectorAll(".".concat($pathLike === null || $pathLike === void 0 ? void 0 : $pathLike.classList[0]));
        $pathLikes.forEach(function ($path) {
            $path === null || $path === void 0 ? void 0 : $path.classList.remove('like-on');
        });
        likeInfoDB.delete($pathLike.classList[0]);
    }
};
$gridTableBtn.addEventListener('click', function (ev) {
    if ($gridTable.classList.contains('active')) {
        $gridTable.classList.replace('active', 'hidden');
        $movieListContainer.classList.remove('hidden');
    }
    else {
        $gridTable.classList.replace('hidden', 'active');
        $movieListContainer.classList.add('hidden');
    }
});
var placeLikeDBInfo = function () {
    var likesTransaction = dataBase.transaction('likes information', 'readonly');
    var likeStore = likesTransaction.objectStore('likes information');
    var likeDataBase = likeStore.getAllKeys();
    likeDataBase.onsuccess = function (ev) {
        var target = ev.target.result;
        var idExp = /.-(.+)/;
        target.forEach(function (element) {
            var id = idExp.exec(element);
            if (id) {
                var numberID = parseInt(id[1]);
                var div = document.querySelectorAll(".".concat(element));
                if (numberID % 2 === 1) {
                    div.forEach(function (element) { return element.classList.add('like-on'); });
                }
                else if (numberID % 2 === 0) {
                    div.forEach(function (element) { return element.classList.add('dislike-on'); });
                }
            }
        });
    };
};
var showSelectedMovie = function (ev) {
    var placeMovieInfo = function () { return __awaiter(_this, void 0, void 0, function () {
        var target, classExp, className, classID, transaction, movieStore, movieDB;
        return __generator(this, function (_a) {
            target = ev.target;
            classExp = /..-(.+)/;
            className = target.classList[2];
            classID = classExp.exec(className);
            if (classID) {
                transaction = dataBase.transaction('movies information', 'readonly');
                movieStore = transaction.objectStore('movies information');
                movieDB = movieStore.get(parseInt(classID[1]));
                movieDB.onsuccess = function (ev) {
                    var _a, _b, _c, _d;
                    var movie = ev.target.result;
                    $movieHomepage.classList.remove('hidden');
                    $mainMovieContainer.classList.add('hidden');
                    $movieBackGround.style.backgroundImage = "url(".concat(movie.backdrop_path, ")");
                    $movieBackGround.id = "".concat(movie._id);
                    $movieTitle.innerHTML = "<span>".concat(movie.title, "</span>");
                    $yearAired.innerHTML = "<span>".concat(movie.first_aired, "</span>");
                    var likeDiv = (_b = (_a = target === null || target === void 0 ? void 0 : target.firstElementChild) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild;
                    var dislikeDiv = likeDiv.nextElementSibling;
                    $likeOrDislikeMovie.innerHTML += "\n                     <div class=\"dp-flex\">".concat(likeDiv.innerHTML, "</div>\n                     <div class=\"dp-flex\">").concat(dislikeDiv.innerHTML, "</div>");
                    $description.innerHTML = "<p>".concat(movie.overview, "</p>");
                    history.pushState({ page: "testing", data: "grettings" }, "pagina de inicio", '?page=' + movie._id);
                    (_c = $(".movie-homepage .likes")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (ev) {
                        var target = ev.target;
                        if (target.nodeName === "path") {
                            var newTarget = target.parentElement;
                            giveLikeDislike(newTarget, "likes");
                        }
                        else {
                            giveLikeDislike(target, "likes");
                        }
                    });
                    (_d = $(".movie-homepage .dislikes")) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function (ev) {
                        var target = ev.target;
                        if (target.nodeName === "path") {
                            var newTarget = target.parentElement;
                            giveLikeDislike(newTarget, "dislikes");
                        }
                        else {
                            giveLikeDislike(target, "dislikes");
                        }
                    });
                };
            }
            return [2 /*return*/];
        });
    }); };
    var placeReviewDBInfo = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setTimeout(function () {
                var _a;
                var reviewsTransaction = dataBase.transaction('reviews information', 'readonly');
                var reviewStore = reviewsTransaction.objectStore('reviews information');
                var reviews = reviewStore.getAll();
                var ID = (_a = $(".movie-homepage .background-image")) === null || _a === void 0 ? void 0 : _a.id;
                reviews.onsuccess = function (ev) {
                    var target = ev.target.result;
                    if (target.length !== 0) {
                        target.forEach(function (element) {
                            if (element.id === ID) {
                                $reviewListContainer.innerHTML += "\n                            <div class=\"review dp-flex fd-column\">\n                                <div class=\"name-review\">".concat(element.name, " <small>(").concat(element.date, ")</small></div>\n                                <div class=\"message\">").concat(element.message, "</div>\n                            </div>");
                            }
                        });
                    }
                };
            }, 100);
            return [2 /*return*/];
        });
    }); };
    var menu = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, placeMovieInfo()];
                case 1:
                    _a.sent();
                    placeReviewDBInfo();
                    return [2 /*return*/];
            }
        });
    }); };
    menu();
};
$reviewListBtn === null || $reviewListBtn === void 0 ? void 0 : $reviewListBtn.addEventListener('click', function (ev) {
    $reviewListContainer.classList.remove('hidden');
    $reviewFormContainer.classList.add('hidden');
});
$reviewFormBtn === null || $reviewFormBtn === void 0 ? void 0 : $reviewFormBtn.addEventListener('click', function (ev) {
    $reviewFormContainer.classList.remove('hidden');
    $reviewListContainer.classList.add('hidden');
});
$submitReviewBtn.addEventListener('click', function (ev) {
    reviewFormValidation().then(function (response) {
        var _a;
        if (response) {
            var transaction = dataBase.transaction('reviews information', 'readwrite');
            var reviewStore = transaction.objectStore('reviews information');
            var ID = (_a = $(".movie-homepage .background-image")) === null || _a === void 0 ? void 0 : _a.id;
            $reviewListContainer.innerHTML += "\n            <div class=\"review dp-flex fd-column width-100\">\n                <div class=\"name-review\">".concat($nameInput.value, " <small>").concat(date.toLocaleDateString(), "</small></div>\n                <div class=\"message\">").concat($reviewMessage.value, "</div>\n            </div>");
            reviewStore.add({
                name: $nameInput.value,
                message: $reviewMessage.value,
                date: date.toLocaleDateString(),
                id: ID
            });
            $nameInput.value = "";
            $reviewMessage.value = "";
        }
    });
});
var reviewFormValidation = function () {
    return new Promise(function (resolve, reject) {
        if ($nameInput.validity.valueMissing || $nameInput.value == "") {
            reject("There's a value missing on name");
        }
        else if ($nameInput.validity.tooShort || $nameInput.value.length < $nameInput.minLength) {
            reject("The name is to short, you need a minimum of ".concat($nameInput.minLength, " characters"));
        }
        else if ($nameInput.validity.tooLong || $nameInput.value.length > $nameInput.maxLength) {
            reject("The name is to long, you need a maximum of ".concat($nameInput.maxLength, " characters"));
        }
        else if ($nameInput.validity.typeMismatch) {
            reject("The name can't be only numbers!");
        }
        else if ($reviewMessage.validity.valueMissing || $reviewMessage.value == "") {
            reject("There's a value missing on the message");
        }
        else if ($reviewMessage.validity.tooShort || $reviewMessage.value.length < $reviewMessage.minLength) {
            reject("The message is to short, you need a minimum of ".concat($reviewMessage.minLength, " characters"));
        }
        else if ($reviewMessage.validity.tooLong || $reviewMessage.value.length > $reviewMessage.maxLength) {
            reject("The message is to long, you need a maximum of ".concat($reviewMessage.maxLength, " characters"));
        }
        else {
            resolve(true);
        }
    });
};
var dataBase;
var dataBaseRequest = indexedDB.open("Center Information");
program();

window.addEventListener('popstate', function (ev) { return window.location.reload(); });
// Función para cambiar de página
function changePage(pageName, pageTitle, pageData) {
    // Agregar la página actual al historial con pushState
    history.pushState({ page: pageName, data: pageData }, pageTitle, '?page=' + pageName);
    console.log('test')
    // Aquí puedes hacer otras acciones relacionadas con el cambio de página, como actualizar la interfaz de usuario
  }
  

  // Ejemplo de cambio de página
  document.body.addEventListener('click', (ev => {
    changePage('inicio', 'Página de inicio');
  })) 
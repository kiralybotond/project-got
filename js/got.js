function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    // console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    var alive = livingCharacters(userDatas);
    var searchForm = document.querySelector('#search');
    var toggleSearchButton = document.querySelector('#toggleSearch');

    sortdByName(alive); // az alive módosul, mert a tömbre csak hivatkozunk és azon módosít a függvény
    createTable(alive);

    var nameSelected = document.querySelector("#listWithPic");
    var selectedId = '0';
    var newSelectedId = '0';
    nameSelected.addEventListener("click", function (e) {
        if (e.target.parentElement.getAttribute('data-id') != null) {
            newSelectedId = e.target.parentElement.getAttribute('data-id');
        }
        clearSelectedCSS(selectedId, newSelectedId);
        selectedId = newSelectedId
        characterSelected(alive, selectedId);
        formatSelected(e.target.parentElement, selectedId);
    });

    // var nameSelected = document.querySelectorAll(".characterSelect");
    // for (var i = 0; i < nameSelected.length; i++) {
    //     nameSelected[i].addEventListener("click", function (e) {
    //         characterSelected(alive, e.target.getAttribute('data-id'));
    //     });
    // }

    searchForm.addEventListener("submit", function (e) {
        var nameSearchField = document.querySelector('#searchField').value;
        e.preventDefault();
        characterSelected(alive, searchName(alive, nameSearchField));
    });

    toggleSearchButton.addEventListener("click", function () {
        toggleSearch();
    });
}

function livingCharacters(characters) {
    var living = [];
    for (var i in characters) {
        if (!characters[i].dead) {
            living.push(characters[i]);
        }
    }
    return living;
}

function sortdByName(characters) {
    var i = characters.length - 1;
    var swap;
    do {
        swap = false;
        for (var j = 0; j < i; j++) {
            if (characters[j].name.localeCompare(characters[j + 1].name) > 0) {
                [characters[j], characters[j + 1]] = [characters[j + 1], characters[j]];
                swap = true;
            }
        }
        i--
    }
    while (swap)
    return characters;
}

function searchName(characters, name) {
    var eredmeny;
    for (var i = 0; i < characters.length; i++) {
        if (characters[i].name.toLowerCase().localeCompare(name.toLowerCase()) == 0) {
            return characters[i].id;
        }
    }
    return '0';
}

function createTable(characters) {
    var table = '';
    for (i = 0; i < characters.length; i++) {
        table += `<div class="character" data-id="${characters[i].id}"><img src="${characters[i].portrait}" alt="${characters[i].name}"><div class="characterSelect">${characters[i].name}</div></div>`;
    }
    document.querySelector('#listWithPic').innerHTML = table;
    //     var listWithPic = document.querySelector('#listWithPic');
    //     var listDiv = document.createElement('div');
    //     var listDivImg = document.createElement('img');
    //     var listDivName = document.createElement('div');
    //     listDiv.classList.add('character');
    //     listDivName.classList.add('characterSelect');
    //     listDivName.setAttribute('data-id', characters[i].id);
    //     listDivName.innerText = characters[i].name;
    //     listDivImg.setAttribute('src', characters[i].portrait);
    //     listDivImg.alt = `Picture of ${characters[i].name}`;
    //     listDiv.appendChild(listDivImg);
    //     listDiv.appendChild(listDivName);
    //     listWithPic.appendChild(listDiv);
    // }
}

function characterSelected(characters, id) {
    if (id != null) {
        var detailTable = '';
        // var descriptionWithPic = document.querySelector('#descriptionTable');
        // descriptionWithPic.innerHTML = "";
        var i = 0;
        notFound = true;
        if (id == '0') {
            detailTable += '<p>Nincs ilyen szereplő.</p>';
            // var nincsDiv = document.createElement('div');
            // nincsDiv.innerHTML = 'Nincs ilyen szereplő.';
            // descriptionWithPic.appendChild(nincsDiv);
            notFound = false;
        }
        while (notFound) {
            if (characters[i].id == id) {
                var house = '';
                // var descImg = document.createElement('img');
                // var descName = document.createElement('p');
                // var descBio = document.createElement('p');
                // descImg.setAttribute('src', characters[i].picture);
                // descImg.alt = `Picture of ${characters[i].name}`;
                // descImg.classList.add('pictures');
                if (characters[i].house) {
                    // var descHouseDiv = document.createElement('div');
                    // var descHouse = document.createElement('img');
                    // descHouse.setAttribute('src', `assets/houses/${characters[i].house}.png`);
                    // descHouse.alt = `House ${characters[i].house}`;
                    // descHouseDiv.classList.add('housePic');
                    // descHouseDiv.appendChild(descHouse);
                    house = '<img src="assets/houses/' + characters[i].house + '.png" alt="House ' + characters[i].house + '" class="housePic">'
                }
                // descName.innerText = characters[i].name;
                // descBio.innerText = characters[i].bio;
                // descriptionWithPic.appendChild(descImg);
                // if (characters[i].house) {
                //     descriptionWithPic.appendChild(descHouseDiv);
                // }
                // descriptionWithPic.appendChild(descName);
                // descriptionWithPic.appendChild(descBio);
                detailTable += `<img class="pictures" src="${characters[i].picture}" alt="${characters[i].name}"><div>${house}</div><p>${characters[i].name}</><p>${characters[i].bio}</p>`;
                notFound = false;
            }
            i++
        }
        document.querySelector('#descriptionTable').innerHTML = detailTable;
    }
}

function toggleSearch() {
    var toggle = document.querySelector("#searchSpan");
    if (toggle.style.display == "none") {
        toggle.style.display = "inline";
    } else {
        toggle.style.display = "none";
    }
}

function clearSelectedCSS(dataId, newId) {
    if (newId != null) {
        if (dataId != '0') {
            var selected = document.querySelector('[data-id="' + dataId + '"]');
            for (var i = 0; i < selected.children.length; i++) {
                selected.children[i].classList.remove('selected');
            }
        }
    }
}

function formatSelected(selected, dataId) {
    if (dataId != 0) {
        for (var i = 0; i < selected.children.length; i++) {
            selected.children[i].classList.add('selected');
        }
    }
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
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
    sortdByName(alive); // az alive módosul, mert a tömbre csak hivatkozunk és azon módosít a függvény
    createTable(alive);
    // document.querySelector('#charID1').addEventListener("click", function () {
    //     characterSelected(alive, 27);
    // });
    var nameSelected = document.querySelectorAll(".characterSelect");
    for (var i = 0; i < nameSelected.length; i++) {
        nameSelected[i].addEventListener("click", function () {
            characterSelected(alive, this.getAttribute('data-id'));
        });
    }
    var searchForm = document.querySelector('#search');
    searchForm.addEventListener("submit", function (e) {
        var nameSearchField = document.querySelector('#searchField').value;
        e.preventDefault();
        characterSelected(alive, searchName(alive, nameSearchField));
    });
    var toggleSearchButton = document.querySelector('#toggleSearch');
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
        table += '<div class="character"><img src="' + characters[i].portrait + '" alt="' + characters[i].name + '"><br><span class="characterSelect" data-id="' + characters[i].id + '">' + characters[i].name + '</span></div>';
    }
    document.querySelector('#listWithPic').innerHTML = table;
}

function characterSelected(characters, id) {
    var detailTable = '';
    var i = 0;
    notFound = true;
    if (id == '0') {
        detailTable += '<p>Nincs ilyen szereplő</p>';
        notFound = false;
    }
    while (notFound) {
        if (characters[i].id == id) {
            var house = '';
            if (characters[i].house) {
                house = '<img src="assets/houses/' + characters[i].house + '.png" alt="House ' + characters[i].house + '" class="housePic">'
            }
            detailTable += '<img class="pictures" src="' + characters[i].picture + '" alt="' + characters[i].name + '"><br>' + house + '<p>' +
                characters[i].name + '</p><p>' + characters[i].bio + '</p>';
            notFound = false;
        }
        i++
    }
    document.querySelector('#descriptionTable').innerHTML = detailTable;
}


function toggleSearch() {
    var toggle = document.querySelector("#searchSpan");
    if (toggle.style.display == "none") {
        toggle.style.display = "inline";
    } else {
        toggle.style.display = "none";
    }
}
// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
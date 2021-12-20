document.addEventListener('DOMContentLoaded', () => {

    const puzzleEl = document.getElementsByClassName('td');
    const tabletEL = document.getElementById('tablet');

    //Прорисовка таблицы 
    (function drawTablet() {
        let box = '<div class="td empty" id="16"></div>';
        for (let i = 15; i >= 1; i--) {
            box = `<div class="td " id="${i}">${i}</div>` + box;
        };
        tabletEL.innerHTML = box;
        cursorDraw();
    })();

    //обработчик кликов на пятнашки
    for (let i = 0; i < puzzleEl.length; i++) {
        puzzleEl[i].addEventListener('click', swapTarget);
    };

    //поиск пустого пазла 
    function searchEmptyPuzzle() {
        //        console.log('searchEmptyPuzzle');
        const emptyElement = document.getElementsByClassName("empty");
        return emptyElement[0];
    };


    //прорисовка стрелок у пазлов которые можно двигать.    
    function cursorDraw() {
        //        console.log('cursor');
        const emptyEl = searchEmptyPuzzle();

        for (let j = 0; j < puzzleEl.length; j++) {
            puzzleEl[j].classList.remove('cursor-top');
            puzzleEl[j].classList.remove('cursor-bottom');
            puzzleEl[j].classList.remove('cursor-left');
            puzzleEl[j].classList.remove('cursor-right');

            if (+emptyEl.id + 4 == +puzzleEl[j].id) {
                puzzleEl[j].classList.add('cursor-top')
            };
            if (+emptyEl.id - 1 == +puzzleEl[j].id) {
                puzzleEl[j].classList.add('cursor-left')
            };
            if (+emptyEl.id + 1 == +puzzleEl[j].id) {
                puzzleEl[j].classList.add('cursor-right')
            };
            if (+emptyEl.id - 4 == +puzzleEl[j].id) {
                puzzleEl[j].classList.add('cursor-bottom')
            };
        };
    };

    //смена пятнашек
    function swapTarget(eventObject) {
        return swap(eventObject.currentTarget);
    };

    function swap(eventObject) {


        const clickElement = eventObject;
        const emptyEl = searchEmptyPuzzle();
        // проверка на допустимость смены пазлов 
        if (+clickElement.id + 1 == +emptyEl.id ||
            +clickElement.id - 1 == +emptyEl.id ||
            +clickElement.id + 4 == +emptyEl.id ||
            +clickElement.id - 4 == +emptyEl.id) {
            emptyEl.innerHTML = clickElement.innerHTML;
            clickElement.innerHTML = '';
            clickElement.classList.add('empty');
            emptyEl.classList.remove('empty');
            emptyEl.classList.add('td');
            cursorDraw();
 //           console.log('swap');
        };
    };

    //перемешать пазлы
    const mixPuzzleButton = document.querySelector('#mixPuzzle');
    mixPuzzleButton.addEventListener('click', mixPuzzle);
    function mixPuzzle() {
        const arr = [-4, -1, 1, 4];
        for (let i = 0; i < 1000; i++) {
            const emptyEl = searchEmptyPuzzle();
            do {
                var addressClickId = +emptyEl.id + arr[Math.floor(Math.random() * arr.length)];
            } while (addressClickId < 1 || addressClickId > 16)
            let pushButton = document.getElementById(addressClickId);
//            console.log(pushButton);
            swap(pushButton);
        }
    }
});



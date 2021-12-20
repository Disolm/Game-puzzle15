document.addEventListener('DOMContentLoaded', () => {
    var app = new Vue({
        el: '#app',
        data: {
            valuePuzzle: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            idEmpty: 16, //начальная координата пустого пазла
        },

        methods: {
            //поиск конкретного пазла на который произвели клик
            swapTarget: function (eventObject) {
                return this.swapPuzzle(eventObject.currentTarget);
            },
            //смена пазлов 
            swapPuzzle: function (event) {
                let emptyEl = this.searchEmptyPuzzle();
                if (+event.id + 1 == +emptyEl.id ||
                    +event.id - 1 == +emptyEl.id ||
                    +event.id + 4 == +emptyEl.id ||
                    +event.id - 4 == +emptyEl.id) {
                    //    console.log(+event.id);
                    emptyEl.innerHTML = event.innerHTML;
                    event.innerHTML = '';
                    emptyEl.classList.remove('empty');
                    emptyEl.classList.add('td');
                    event.classList.add('empty');
                    this.idEmpty = +event.id;
                    this.cursorDraw();
                };

            },
            //поиск пустого пазла
            searchEmptyPuzzle: function () {
                const emptyEl = document.getElementById(this.idEmpty)
                emptyEl.innerHTML = '';
                emptyEl.classList.add('empty');
                return emptyEl;
            },
            //метод для изменения курсора пазлов которые можно двигать 
            cursorDraw: function () {
                const emptyEl = this.searchEmptyPuzzle();
                const puzzleEl = document.getElementsByClassName('td');
                for (let j = 0; j < puzzleEl.length; j++) {
                    puzzleEl[j].classList.remove('cursor-top');
                    puzzleEl[j].classList.remove('cursor-bottom');
                    puzzleEl[j].classList.remove('cursor-left');
                    puzzleEl[j].classList.remove('cursor-right');
                    {
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
            },
            // метод для перемешивания пазлов
            mixPuzzle: function () {
                const arr = [-4, -1, 1, 4]; //координаты куда можно двигать пазлы
                for (let i = 0; i < 1000; i++) {
                    const emptyEl = this.searchEmptyPuzzle();
                    do {
                        var addressClickId = +emptyEl.id + arr[Math.floor(Math.random() * arr.length)];
                    } while (addressClickId < 1 || addressClickId > 16)
                    let pushButton = document.getElementById(addressClickId);
                    //            console.log(pushButton);
                    this.swapPuzzle(pushButton);
                }
            },

        },
        //вызов метода сразу после загрузки DOM 
        mounted() {
            this.searchEmptyPuzzle();
            this.cursorDraw();
        },
    })

});
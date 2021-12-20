document.addEventListener('DOMContentLoaded', () => {
    var app = new Vue({
        el: '#app',
        data: {
            valuePuzzle: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''],

            addressEmpty: 15,
            addressClickPuzzle: undefined,
            classEmpty: 'empty',

            classCursorTop: 'cursor-top',
            numCursorTop: 12,

            classCursorLeft: 'cursor-left',
            numCursorLeft: 15,

            classCursorRight: 'cursor-right',
            numCursorRight: undefined,

            classCursorBottom: 'cursor-bottom',
            numCursorBottom: undefined,

        },
        methods: {
            searchEmptyPuzzle: function () { //Поиск адреса пустого пазла
                this.addressEmpty = this.valuePuzzle.indexOf('');
            },
            swapPuzzle: function (eventObject) {
                //Условие для разделения кликов мышки на пазл и вызова функции mixPuzzle
                if (isNaN(eventObject)) {
                    this.addressEmpty = this.valuePuzzle.indexOf(+eventObject.target.innerHTML);
                }
                //Условие для проверки на допустимость смены пазлов 
                if (this.addressClickPuzzle == this.addressEmpty - 1 && (this.addressClickPuzzle + 1) % 4 != 0 ||
                    this.addressClickPuzzle == this.addressEmpty + 1 && this.addressClickPuzzle % 4 != 0 ||
                    this.addressClickPuzzle == this.addressEmpty - 4 ||
                    this.addressClickPuzzle == this.addressEmpty + 4) {

                    const buffer = this.valuePuzzle[this.addressEmpty];
                    this.valuePuzzle[this.addressEmpty] = this.valuePuzzle[this.addressClickPuzzle];
                    this.valuePuzzle[this.addressClickPuzzle] = buffer;
                    this.addressEmpty = this.addressClickPuzzle;
                    this.cursorDraw()
                    return this.valuePuzzle = this.valuePuzzle.concat()
                };
            },
            //Функция перемешивания пазлов
            mixPuzzle: function () {
                console.log('mixPuzzle')
                const arr = [-4, -1, 1, 4]; //координаты куда можно двигать пазлы
                for (let i = 0; i < 1000; i++) {

                    do {//проверка куда можно двигать пазлы
                        this.addressClickPuzzle = this.addressEmpty + arr[Math.floor(Math.random() * arr.length)];
                    } while (this.addressClickPuzzle < 0 || this.addressClickPuzzle > 15 ||
                    this.addressClickPuzzle == this.addressEmpty - 1 && (this.addressClickPuzzle + 1) % 4 == 0 ||
                        this.addressClickPuzzle == this.addressEmpty + 1 && this.addressClickPuzzle % 4 == 0) 

                    this.swapPuzzle(this.addressClickPuzzle);
                }
            },
            //прорисовка курсоров 
            cursorDraw: function () {
                this.numCursorTop = this.valuePuzzle[this.addressEmpty - 4];

                this.numCursorBottom = this.valuePuzzle[this.addressEmpty + 4];

                if ((this.addressEmpty) % 4 == 0) {
                    this.numCursorLeft = undefined;
                } else {
                    this.numCursorLeft = this.valuePuzzle[this.addressEmpty - 1];
                };

                if ((this.addressEmpty + 1) % 4 == 0) {
                    this.numCursorRight = undefined;
                } else {
                    this.numCursorRight = this.valuePuzzle[this.addressEmpty + 1];
                };
            }

        },

        mounted() {//вызов функций после загрузки HTML
            this.searchEmptyPuzzle();
            //this.cursorDraw();
        },
    })
});

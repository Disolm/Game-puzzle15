document.addEventListener('DOMContentLoaded', () => {
    const app = new Vue({
        el: '#app',
        data: {
            valuePuzzle: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''], 
            dimensions: [3, 4, 5],

            addressEmpty: 15,
            addressClickPuzzle: undefined,
            classEmpty: 'empty',

            puzzleHeight: 4,
            puzzleWidth: 4,

            isHeight: 290,
            isWidth: 280,

            classCursorTop: 'cursor-top',
            numCursorTop: 12,

            classCursorLeft: 'cursor-left',
            numCursorLeft: 15,

            classCursorRight: 'cursor-right',
            numCursorRight: undefined,

            classCursorBottom: 'cursor-bottom',
            numCursorBottom: undefined,

            isActiveModal: false,

        },
        methods: {
            //Поиск адреса пустого пазла
            searchEmptyPuzzle() {
                this.addressEmpty = this.valuePuzzle.indexOf('');
            },

            //Смена пазлов
            swapPuzzle(eventObject) {
                //Условие для разделения кликов мышки на пазл и вызова функции mixPuzzle
                if (isNaN(eventObject)) {
                    this.addressClickPuzzle = this.valuePuzzle.indexOf(+eventObject.target.innerHTML);
                }
                //Условие для проверки на допустимость смены пазлов 
                if (this.addressClickPuzzle === this.addressEmpty - 1 && (this.addressClickPuzzle + 1) % this.puzzleWidth !== 0 ||
                    this.addressClickPuzzle === this.addressEmpty + 1 && this.addressClickPuzzle % this.puzzleWidth !== 0 ||
                    this.addressClickPuzzle === this.addressEmpty - this.puzzleWidth ||
                    this.addressClickPuzzle === this.addressEmpty + this.puzzleWidth) {

                    const buffer = this.valuePuzzle[this.addressEmpty];
                    this.valuePuzzle[this.addressEmpty] = this.valuePuzzle[this.addressClickPuzzle];
                    this.valuePuzzle[this.addressClickPuzzle] = buffer;
                    this.addressEmpty = this.addressClickPuzzle;
                    this.cursorDraw()
                }
            },
            //Функция перемешивания пазлов
            mixPuzzle() {
                // console.log('mixPuzzle')
                const arr = [-this.puzzleWidth, -1, 1, this.puzzleWidth]; //координаты куда можно двигать пазлы
                for (let i = 0; i < 1000; i++) {

                    do {//проверка куда можно двигать пазлы
                        this.addressClickPuzzle = this.addressEmpty + arr[Math.floor(Math.random() * arr.length)];
                    } while (this.addressClickPuzzle < 0 || this.addressClickPuzzle > (this.puzzleWidth * this.puzzleHeight - 1) ||
                    this.addressClickPuzzle === this.addressEmpty - 1 && (this.addressClickPuzzle + 1) % this.puzzleWidth === 0 ||
                        this.addressClickPuzzle === this.addressEmpty + 1 && this.addressClickPuzzle % this.puzzleWidth === 0)

                    this.swapPuzzle(this.addressClickPuzzle);
                }
            },
            //прорисовка курсоров 
            cursorDraw() {
                this.numCursorTop = this.valuePuzzle[this.addressEmpty - this.puzzleWidth];

                this.numCursorBottom = this.valuePuzzle[this.addressEmpty + this.puzzleWidth];

                if ((this.addressEmpty) % this.puzzleWidth === 0) {
                    this.numCursorLeft = undefined;
                } else {
                    this.numCursorLeft = this.valuePuzzle[this.addressEmpty - 1];
                }

                if ((this.addressEmpty + 1) % this.puzzleWidth === 0) {
                    this.numCursorRight = undefined;
                } else {
                    this.numCursorRight = this.valuePuzzle[this.addressEmpty + 1];
                }
            },
            // Включение или выключение модального окна
            modalOpenClose() {
                this.isActiveModal = !this.isActiveModal;
                this.puzzleHeight = (this.isHeight - 10) / 70; // 70 - это размер одного пазла
                this.puzzleWidth = this.isWidth / 70; // 70 - это размер одного пазла
            },
            //отрисовка пазлов с новыми габаритами
            modalOk() {
                // console.log(this.puzzleHeight, this.puzzleWidth)
                const square = this.puzzleHeight * this.puzzleWidth;
                this.valuePuzzle.splice(0,25);
                for (let i = 1; i < square; i++) {
                    this.valuePuzzle[i-1] = i;
                }
                this.valuePuzzle[square -1] = ''; 
                this.addressEmpty = square - 1;

                this.isHeight = 70 * this.puzzleHeight + 10; // 70 - это размер одного пазла
                this.isWidth = 70 * this.puzzleWidth; // 70 - это размер одного пазла

                numCursorTop = square - this.puzzleWidth;
                numCursorLeft = square - 1;
                numCursorRight = undefined;
                numCursorBottom = undefined;

                this.modalOpenClose();
                this.cursorDraw();
            }

        },

        mounted() {//вызов функций после загрузки HTML
            this.searchEmptyPuzzle();
        },
        computed: {
            classActiveModalOverlay() {
                return {
                    activeModalOverlay: this.isActiveModal  === true,
                    inActiveModalOverlay: this.isActiveModal === false
                }
            },
            classActiveModalWindow() {
                return {
                    activeModalWindow: this.isActiveModal === true,
                    inActiveModalWindow: this.isActiveModal === false
                }
            },
        },

    })
});
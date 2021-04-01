(function () {
    const boardElm = document.querySelector('#board');
    const box = {};
    let isWon = false;
    let turn = '×';

    // store cell references
    boardElm.querySelectorAll('.cell').forEach(cell => {
        box[cell.id] = cell;
    });

    // winning combinations
    const winCombinations = {
        "a1": [ ["a1", "a2", "a3"], ["a1", "b1", "c1"], ["a1", "b2", "c3"] ],
        "a2": [ ["a1", "a2", "a3"], ["a2", "b2", "c2"] ],
        "a3": [ ["a1", "a2", "a3"], ["a3", "b3", "c3"], ["a3", "b2", "c1"] ],
        "b1": [ ["b1", "b2", "b3"], ["a1", "b1", "c1"] ],
        "b2": [ ["a1", "b2", "c3"], ["a3", "b2", "c1"], ["a2", "b2", "c2"], ["b1", "b2", "b3"] ],
        "b3": [ ["a3", "b3", "c3"], ["b1", "b2", "c3"] ],
        "c1": [ ["a1", "b1", "c1"], ["c1", "c2", "c3"], ["c1", "b2", "a3"] ],
        "c2": [ ["a2", "b2", "c2"], ["c1", "c2", "c3"] ],
        "c3": [ ["c1", "c2", "c3"], ["a3", "b3", "c3"], ["a1", "b2", "c3"] ]
    }

    /**
     * @function
     * @desc handles player turn
     * @param {Event} event event object
     */
    function playTurn(event) {
        const currentCellElm = event.target;
        const currentCellId = currentCellElm.id;

        // if already won or game over, reset and return
        if(isWon || isGameOver()) {
            isWon = false;
            return reset();
        }

        // do next turn
        currentCellElm.innerHTML = turn;

        // check if won with current turn
        isWon = checkWin(turn, winCombinations[currentCellId]);

        // switch turn
        turn = turn === '×' ? 'O' : '×';
    }

    /**
     * @function
     * @desc check if given combination has won with current move
     * @param {string} playerSymbol current turn text
     * @param {Array} rows combination of winning case
     */
    function checkWin(playerSymbol, rows) {
        // check if any of the combination with current cell has winning condition
        return rows.some(row => {

            // check if each item has same text
            const isWin = row.every(cell => box[cell].innerHTML === playerSymbol);
            
            // if already won, highlight row
            if(isWin) {
                highlightWin(row);
            }

            return isWin;
        });
    }

    /**
     * @function
     * @desc highlights winning row
     * @param {Array} winningBoxes winning row combination
     */
    function highlightWin(winningBoxes) {
        winningBoxes.forEach(cell => box[cell].classList.add('match'));
    }

    /**
     * @function
     * @desc resets the board
     */
    function reset() {
        for (let boxId in box) {
            box[boxId].innerHTML = '';
            box[boxId].classList.remove('match');
        }
    }

    /**
     * @function 
     * @desc checks if game is over
     * @return {boolean}
     */
    function isGameOver() {
        return Object.values(box).every(cell => cell.innerHTML.trim().length !== 0);
    }

    // Init
    boardElm.addEventListener('click', playTurn);

})();
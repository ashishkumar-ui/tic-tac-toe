$(function () {
    var turn = 'O';
    var hasResult = false;

    function playTurn() {
        var $cell = $(this);

        // Has Result already
        if (hasResult || !$(".cell:empty").length) {
            $(".cell").empty().removeClass('match');
            turn = 'O';
            hasResult = false;
            return;
        }

        // If cell is already filled, do not owerwrite existing value
        if (!$cell.is(':empty')) {
            return;
        }

        // Add value to cell
        $cell.html(turn);
        turn = turn === 'O' ? '&times;' : 'O';

        // Check win only when at least 5 (9-4) fields are filled
        //if ($cell.filter(":empty").length <= 4) {
        checkWin($cell);
        //}
    }

    function checkWin($cell) {
        var type = $cell.data('type');

        if (type === 'corner') {
            checkCorners($cell);
        } else if (type === 'middle') {
            checkMiddle($cell);
        } else {
            checkAll($cell);
        }
    }

    // Group Check Functions
    function checkCorners($cell) {
        if (!horizontalCheck($cell)) {
            if (!verticalCheck($cell)) {
                diagonalCheck($cell);
            }
        }
    }

    function checkMiddle($cell) {
        if (!horizontalCheck($cell)) {
            verticalCheck($cell);
        }
    }

    function checkAll($cell) {
        if (!horizontalCheck($cell)) {
            if (!verticalCheck($cell)) {
                crossCheck($cell);
            }
        }
    }

    // Unit-wise check funtions
    function horizontalCheck($cell) {
        var cellID = $cell.attr('id');
        var cellData = cellID.split("");
        var cellValue = $cell.text();
        var result = true;

        // Check values
        for (var i = 1; i <= 3; i++) {
            if (!result) {
                break;
            }
            result = $("#" + cellData[0] + i).text() === cellValue;
        }

        // If Win
        if (result) {
            for (var i = 1; i <= 3; i++) {
                $("#" + cellData[0] + i).addClass("match")
            }
            hasResult = true;
        }

        //
        return result;
    }

    function verticalCheck($cell) {
        var cellID = $cell.attr('id');
        var cellData = cellID.split("");
        var cellValue = $cell.text();
        var cols = ['a', 'b', 'c'];
        var result = true;

        for (var i = 0; i < cols.length; i++) {
            if (!result) {
                break;
            }

            result = $("#" + cols[i] + cellData[1]).text() === cellValue;
        }

        // If Win
        if (result) {
            for (var i = 0; i < cols.length; i++) {
                $("#" + cols[i] + cellData[1]).addClass("match")
            }
            hasResult = true;
        }

        //
        return result;


    }

    function diagonalCheck($cell) {
        var cellValue = $cell.text();
        var centerValue = $("#b2").text();
        var cellID = $cell.attr("id");
        var cellData = cellID.split("");
        var lastCellID = (cellData[0] === 'a' ? 'c' : 'a') + (cellData[1] === '1' ? '3' : '1');
        var lastCellValue = $("#" + lastCellID).text();

        //
        var result = cellValue === centerValue && cellValue === lastCellValue;

        if (result) {
            $cell.addClass('match');
            $("#b2").addClass('match');
            $("#" + lastCellID).addClass('match');
            hasResult = true;
        }

        return result;
    }

    function crossCheck($cell) {
        var cellValue = $cell.text();
        var OddValue = cellValue === 'O' ? '×' : 'O';
        var $d1 = $("#a1, #b2, #c3");
        var $d2 = $("#c1, #b2, #a3");

        if ($d1.text().length === 3 && $d1.text().indexOf(OddValue) === -1) {
            $d1.addClass('match');
            hasResult = true;
        } else if ($d2.text().length === 3 && $d2.text().indexOf(OddValue) === -1) {
            $d2.addClass('match');
            hasResult = true;
        }
    }

    // Event Binding
    $(".cell").click(playTurn);
});
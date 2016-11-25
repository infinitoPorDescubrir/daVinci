Blockly.BlockSvg.START_HAT = true;


Blockly.Blocks['move_right'] = {
    init: function() {
        this.jsonInit({
            "message0": ' ► Moverse a la derecha',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};

Blockly.Blocks['move_left'] = {
    init: function() {
        this.jsonInit({
            "message0": ' ◄ Moverse a la izquierda',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};


Blockly.Blocks['move_up'] = {
    init: function() {
        this.jsonInit({
            "message0": ' ▲ Moverse hacia arriba',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};

Blockly.Blocks['move_down'] = {
    init: function() {
        this.jsonInit({
            "message0": ' ▼ Moverse hacia abajo',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};

Blockly.Blocks['decode_message'] = {
    init: function() {
        this.jsonInit({
            "message0": ' ⍰ Descifrar la imagen',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};

Blockly.JavaScript['move_right'] = function(block) {
    // String or array length.
    return 'mover_derecha();\n';
};


Blockly.JavaScript['move_left'] = function(block) {
    // String or array length.
    return 'mover_izquierda();\n';
};

Blockly.JavaScript['move_up'] = function(block) {
    // String or array length.
    return 'mover_arriba();\n';
};


Blockly.JavaScript['move_down'] = function(block) {
    // String or array length.
    return 'mover_abajo();\n';
};

Blockly.JavaScript['decode_message'] = function(block) {
    // String or array length.
    return 'descifrar_mensaje();\n';
};

var on_start_block;
Blockly.Blocks['on_start'] = {
    init: function() {
        this.setColour(220);
        this.appendDummyInput()
            .appendField('Al Ejecutar');
        this.appendStatementInput('DO')
            .setCheck(null);
        this.setDeletable(false);
        this.setEditable(false);
        this.setMovable(false);
        on_start_block = this;
    }
};

Blockly.JavaScript['on_start'] = function(block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    var code = '';
    code += ' /* al comenzar */ \n\n' +
        branch + '\n';
    return code;
};



/*
function myUpdateFunction(event) {
    Blockly.JavaScript.init(workspace);
    var code = Blockly.JavaScript.blockToCode(on_start_block);
    document.getElementById('textarea').value = code;
}
workspace.addChangeListener(myUpdateFunction);
*/


function checkCode() {
    var n = $('#player').queue("fx");
    if (n.length === 0) {
        if ($("#game .piece:visible").length === 0) {

          if(level===3){
            $('body').removeClass().addClass('won');
          }else{
            $('body').removeClass().addClass('succeed');
          }

        } else {
            $('body').removeClass().addClass('failed');
        }
    } else {
        setTimeout(checkCode, 100);
    }
}




function mover_derecha() {
    move_player(1, 0);
}

function mover_izquierda() {
    move_player(-1, 0);
}

function mover_arriba() {
    move_player(0, -1);
}

function mover_abajo() {
    move_player(0, 1);
}

function descifrar_mensaje() {
    $('#player').animate({
        opacity: '0.5'
    }, {
        complete: function() {
            $('#piece_' + position.x + '_' + position.y).fadeOut('fast');
        }
    }).animate({
        opacity: '1'
    });
}

function move_player(ox, oy) {
    hard_pos.x += ox;
    hard_pos.y += oy;

    $('#player').animate({
        left: hard_pos.x * 80,
        top: hard_pos.y * 80
    }, {
        start: function() {
            position.x += ox;
            position.y += oy;
        },
        complete: function() {
            update_hud();
        }
    });

}


var position = {};
var hard_pos = {};
var level = 0;
var levels = [{
    pieces: [
        [3, 2]
    ],
    init_position: {
        x: 2,
        y: 2
    }
}, {
    pieces: [
        [2, 2],
        [3, 3],
    ],
    init_position: {
        x: 1,
        y: 1
    }
}, {
    pieces: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
    ],
    init_position: {
        x: 0,
        y: 0
    }
}, {
    pieces: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3],
        [3, 3],
        [3, 4],
        [4, 4],
        [4, 5],
        [5, 5],
    ],
    init_position: {
        x: 0,
        y: 0
    }
}];

function add_piece(x, y) {
    var d = $("<div>", {
        'id': 'piece_' + x + '_' + y,
        "class": "piece"
    });
    d.css({
        'background-position': -x * 80 + 'px ' + -y * 80 + 'px ',
        'top': (y * 80 + 3) + 'px ',
        'left': (x * 80 + 3) + 'px '
    });
    $("#game").append(d);
}

function reset() {
    $("#game .piece").remove();

    $("#game").removeClass().addClass('level' + level);

    levels[level].pieces.forEach(function(p) {
        add_piece(p[0], p[1]);
    });

    position.x = levels[level].init_position.x;
    position.y = levels[level].init_position.y;
    hard_pos.x = levels[level].init_position.x;
    hard_pos.y = levels[level].init_position.y;


    move_player(0, 0);
    $('#player').delay(1000).animate({
        opacity: '1'
    })


}

function update_hud() {
    $("#hud").text('x: ' + (position.x + 0) + ' y: ' + (position.y + 0));
}




var workspace = Blockly.inject('blocklyDiv', {
    trashcan: true,
    media: 'media/',
    toolbox: document.getElementById('toolbox0')
});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

function startButton() {
    $('body').removeClass().addClass('build');
    reset()
}

function restartButton() {
    window.location.reload();
}


function runButton() {
    $('body').removeClass().addClass('running');
    // Generate JavaScript code and run it.
    Blockly.JavaScript.init(workspace);
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    //var code = Blockly.JavaScript.workspaceToCode(workspace);
    var code = Blockly.JavaScript.blockToCode(on_start_block);

    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
        checkCode();
    } catch (e) {
        alert(e);
    }
}

function resetButton() {
    $('body').removeClass().addClass('build');
    reset()
}

function nextButton() {

    level++;
    workspace.updateToolbox(document.getElementById('toolbox' + level));
    workspace.clear();
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);
    $('body').removeClass().addClass('build');

    reset();


}

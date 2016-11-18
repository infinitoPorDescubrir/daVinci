Blockly.BlockSvg.START_HAT = true;
Blockly.Blocks['string_length'] = {
    init: function() {
        this.jsonInit({
            "message0": 'length of %1',
            "args0": [{
                "type": "input_value",
                "name": "VALUE",
                "check": "String"
            }],
            "output": "Number",
            "colour": 160,
            "tooltip": "Returns number of letters in the provided text.",
            "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        });
    }
};

Blockly.JavaScript['string_length'] = function(block) {
    // String or array length.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};


Blockly.Blocks['move_right'] = {
    init: function() {
        this.jsonInit({
            "message0": ' 🡺 Moverse a la derecha',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};

Blockly.Blocks['move_left'] = {
    init: function() {
        this.jsonInit({
            "message0": ' 🡸 Moverse a la izquierda',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};


Blockly.JavaScript['move_right'] = function(block) {
    // String or array length.
    return 'console.log("move right");\n';
};

Blockly.Blocks['decode_message'] = {
    init: function() {
        this.jsonInit({
            "message0": ' ⍰ Descifrar mensaje',
            "previousStatement": null,
            "nextStatement": null,
            "colour": 160,
        });
    }
};

Blockly.JavaScript['decode_message'] = function(block) {
    // String or array length.
    return 'console.log("decode_message");\n';
};

var workspace = Blockly.inject('blocklyDiv', {
    trashcan: true,
    media: '../../media/',
    toolbox: document.getElementById('toolbox')
});

function myUpdateFunction(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('textarea').value = code;
}
workspace.addChangeListener(myUpdateFunction);

function showCode() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    alert(code);
}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

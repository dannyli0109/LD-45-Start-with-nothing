"use strict";

var font;
var spriteFont;
var currentScene;
var sceneManager;
var player; // icons

var iconBattle, iconEvent, iconOpportunity;

function preload() {
  font = loadFont('./assets/BitPotionExt.ttf');
  iconBattle = loadImage('./assets/icon-battle.png');
  iconEvent = loadImage('./assets/icon-event.png');
  iconOpportunity = loadImage('./assets/icon-opportunity.png');
}

function setup() {
  noSmooth();
  rectMode(CENTER);
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.elt.id = 'game';
  player = new Player();
  sceneManager = new SceneManager();
  currentScene = sceneManager.scenes[sceneManager.index];
}

function draw() {
  background(255);
  currentScene.show();
}

function mousePressed(e) {
  currentScene.pressed();
}
"use strict";

var BUTTON_WIDTH = 200;
var BUTTON_HEIGHT = 50;
var WIDTH = 900;
var HEIGHT = 506.25;
var STATUS_BAR_HEIGHT = 50;
var STATUS_WIDTH = 150;
var STATE_PICK_EVENT = 1;
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpriteFont =
/*#__PURE__*/
function () {
  function SpriteFont() {
    _classCallCheck(this, SpriteFont);

    this.map = "ABCDEFGHIJKLMNOPQRSTUVWXYZ    abcdefghijklmnopqrstuvwxyz    1234567890!?.%;:$#'\"/\\()&*+,-<>=@[]^_`{}\xB0\u20AC\xA3~\u2122".split('').reduce(function (obj, ele, index) {
      if (!obj[ele]) {
        obj[ele] = index;
      }

      return obj;
    }, {});
    this.spriteWidth = 7;
    this.spriteHeight = 7;
    this.w = 10;
    this.h = 11;
    this.spacingX = 0;
    this.spacingY = 2;
    this.charWidth = 7;
    this.charHeight = 7;
    this.padding = 10;
  }

  _createClass(SpriteFont, [{
    key: "showFont",
    value: function showFont(text, x, y, boxWidth, boxHeight) {
      var _this = this;

      tint(0, 0, 0);
      imageMode(CENTER);
      var textArr = text.split('');
      textArr.forEach(function (_char, i) {
        var index = _this.map[_char];
        var charX = index % _this.w;
        var charY = Math.floor(index / _this.w);
        noSmooth();
        var maxFit = Math.floor((boxWidth - _this.padding * 2) / _this.charWidth); // console.log(maxFit)

        var row = Math.floor(i / (maxFit - 1));
        var rows = Math.floor(textArr.length / maxFit); // console.log(row)

        image(fontSprite, x + _this.padding / 2 + i % (maxFit - 1) * (_this.charWidth + _this.spacingX) - (maxFit - 1) * (_this.charWidth + _this.spacingX) / 2 - _this.padding / 2, y + row * (_this.charHeight + _this.spacingY) - rows * (_this.charHeight + _this.spacingY) / 2, _this.charWidth, _this.charHeight, charX * _this.spriteWidth, charY * _this.spriteHeight, _this.spriteWidth, _this.spriteHeight);
      });
    }
  }]);

  return SpriteFont;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DialogueEvent =
/*#__PURE__*/
function () {
  function DialogueEvent(elements) {
    _classCallCheck(this, DialogueEvent);

    this.elements = elements;
    this.height = height - STATUS_BAR_HEIGHT;
    this.dialogues = [];
    this.index = 0;
    this.createDialogues();
  }

  _createClass(DialogueEvent, [{
    key: "createDialogues",
    value: function createDialogues() {
      var _this = this;

      this.elements.forEach(function (element) {
        _this.dialogues.push(new DialogueBox(width / 2, _this.height / 2 + STATUS_BAR_HEIGHT, width, _this.height, element, 20, true, 48));
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.dialogues.length - 1 >= this.index) {
        this.dialogues[this.index].show();
      } else {
        currentScene.index++;
      }
    }
  }, {
    key: "pressed",
    value: function pressed() {
      this.index++;
    }
  }]);

  return DialogueEvent;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SelectionEvent =
/*#__PURE__*/
function () {
  function SelectionEvent(dialoguesTextArray, selectionsTextArray) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$row = _ref.row,
        row = _ref$row === void 0 ? 2 : _ref$row,
        _ref$col = _ref.col,
        col = _ref$col === void 0 ? 3 : _ref$col,
        _ref$paddingX = _ref.paddingX,
        paddingX = _ref$paddingX === void 0 ? 20 : _ref$paddingX,
        _ref$paddingY = _ref.paddingY,
        paddingY = _ref$paddingY === void 0 ? 10 : _ref$paddingY,
        _ref$dialoguePortion = _ref.dialoguePortion,
        dialoguePortion = _ref$dialoguePortion === void 0 ? 0.5 : _ref$dialoguePortion,
        _ref$buttonWidth = _ref.buttonWidth,
        buttonWidth = _ref$buttonWidth === void 0 ? BUTTON_WIDTH : _ref$buttonWidth,
        _ref$buttonHeight = _ref.buttonHeight,
        buttonHeight = _ref$buttonHeight === void 0 ? BUTTON_HEIGHT : _ref$buttonHeight,
        _ref$isIcon = _ref.isIcon,
        isIcon = _ref$isIcon === void 0 ? false : _ref$isIcon;

    _classCallCheck(this, SelectionEvent);

    this.dialoguesTextArray = dialoguesTextArray;
    this.selectionsTextArray = selectionsTextArray;
    this.height = height - STATUS_BAR_HEIGHT;
    this.dialogues = [];
    this.selections = [];
    this.index = 0;
    this.dialoguePortion = dialoguePortion;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    this.width = width - this.paddingX * 2;
    this.row = row;
    this.col = col;
    this.isIcon = isIcon;
    this.createDialogues();
    this.createSelections();
  }

  _createClass(SelectionEvent, [{
    key: "createDialogues",
    value: function createDialogues() {
      var _this = this;

      var dialogueHeight = this.height * this.dialoguePortion;
      this.dialoguesTextArray.forEach(function (element) {
        _this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT, width, dialogueHeight, element, 20, false, 48));
      });
    }
  }, {
    key: "createSelections",
    value: function createSelections() {
      var _this2 = this;

      this.selectionsTextArray.forEach(function (element, index) {
        var x = index % _this2.col;
        var y = Math.floor(index / _this2.col);
        var dialogueHeight = _this2.height * _this2.dialoguePortion;
        var containerHeight = _this2.height * (1 - _this2.dialoguePortion);
        var rowHeight = containerHeight / _this2.row;
        var shouldCenterX = index % _this2.col === 0 && _this2.selectionsTextArray.length - 1 - index === 0;
        var shouldCenterY = Math.floor((_this2.selectionsTextArray.length - 1) / _this2.col) === 0;
        var yCenter = containerHeight / 2 + STATUS_BAR_HEIGHT + dialogueHeight;
        var buttonPadding = (width - _this2.buttonWidth * _this2.col - (_this2.col - 1) * _this2.paddingX) / 2;

        _this2.selections.push(new SelectionBox(shouldCenterX ? width / 2 : buttonPadding + _this2.buttonWidth / 2 + x * (_this2.paddingX + _this2.buttonWidth), shouldCenterY ? yCenter : yCenter - rowHeight / 2 + y * rowHeight, _this2.buttonWidth, _this2.buttonHeight, element));
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.dialogues.length - 1 >= this.index) {
        this.dialogues[this.index].show();
      } else {
        this.dialogues[this.dialogues.length - 1].show();
        this.selections.forEach(function (selection) {
          selection.show();
        });
      }
    }
  }, {
    key: "pressed",
    value: function pressed() {
      this.index++;
    }
  }]);

  return SelectionEvent;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this.name = 'NOBODY';
    this.hpMax = 1;
    this.hp = this.hpMax;
    this.mpMax = 0;
    this.mp = this.mpMax;
    this.level = 0;
    this.str = 0;
    this["int"] = 0;
    this.agi = 0;
    this.stats = [this.str, this["int"], this.agi];
    this.money = 0;
    this.material = 0;
    this.mainStat = random(this.stats);
  }

  _createClass(Player, [{
    key: "levelUp",
    value: function levelUp() {
      this.level++;
      this.stats.forEach(function (stat) {
        stat++;
      });
      this.mainStat += this.level - 1;
      this.updateStats();
    }
  }, {
    key: "updateStats",
    value: function updateStats() {
      var newHp = this.str ^ 2 * 5;
      var hpDifference = newHp - this.hpMax;
      this.hpMax = newHp;
      this.hp += hpDifference;
      var newMp = this["int"] ^ 2 * 5;
      var mpDifference = newMp - this.mpMax;
      this.mpMax = newMp;
      this.mp += mpDifference;
    }
  }]);

  return Player;
}();
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SceneManager =
/*#__PURE__*/
function () {
  function SceneManager() {
    _classCallCheck(this, SceneManager);

    this.index = 1;
    this.scenes = [];
    this.createScenes();
  }

  _createClass(SceneManager, [{
    key: "createScenes",
    value: function createScenes() {
      this.createMainMenu();
      this.createGameScene();
    }
  }, {
    key: "createMainMenu",
    value: function createMainMenu() {
      var elements = []; // let dialogueBox = new DialogueBox(width / 2, height / 4, width, height / 2, 'Before changing the example, it might be helpful to submit a feature request to whomever handles these kinds of issues at Mozilla/Webkit citing the noSmooth() documentation as an example of why this type of boolean control for graphics smoothing (not image smoothing) would be practical for developers.')

      var startButton = new SelectionBox(width / 2, height / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 'NOTHING', 'START');
      elements.push(startButton);
      this.scenes.push(new Scene(this.scenes.length, elements));
    }
  }, {
    key: "createStatusBar",
    value: function createStatusBar(items) {
      return items.map(function (item, i) {
        return new DialogueBox(STATUS_WIDTH / 2 + i * STATUS_WIDTH, STATUS_BAR_HEIGHT / 2, STATUS_WIDTH, STATUS_BAR_HEIGHT, item, 0);
      });
    }
  }, {
    key: "createStatsCol",
    value: function createStatsCol(items) {
      return items.map(function (item, i) {
        var ele = new DialogueBox(STATUS_WIDTH / 2, STATUS_BAR_HEIGHT / 2 + (i + 1) * STATUS_BAR_HEIGHT, STATUS_WIDTH, STATUS_BAR_HEIGHT, item, 0);
        ele.hidden = true;
        return ele;
      });
    }
  }, {
    key: "createGameScene",
    value: function createGameScene() {
      var elements = [];
      elements.push.apply(elements, _toConsumableArray(this.createStatusBar([player.name, 'Level: ' + player.level, 'HP: ' + player.hp + ' / ' + player.hpMax, 'MP: ' + player.mp + ' / ' + player.mpMax, '$: ' + player.money, 'Material: ' + player.material])));
      elements.push.apply(elements, _toConsumableArray(this.createStatsCol(['STR: ' + player.str, 'INT: ' + player["int"], 'AGI: ' + player.agi])));
      var events = [];
      events.push(new DialogueEvent(['You have NOTHING...', 'You don\'t know where you are...', 'You are weak...', 'Even the weakest slime kills you in one hit...', 'But you want to stay alive...', 'To find the purpose of your pathetic life...', 'You walk and walk around this place...', 'After some time, you found serval paths in front of you...']));
      events.push(new SelectionEvent(['You are gonna choose...'], ['BATTLE', 'EVENT', 'CHANCE']));
      var scene = new Scene(this.scenes.length, elements);
      scene.events = events;
      this.scenes.push(scene);
    }
  }, {
    key: "next",
    value: function next() {
      this.index++;
      currentScene = this.scenes[this.index];
    }
  }]);

  return SceneManager;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scene =
/*#__PURE__*/
function () {
  function Scene(id, elements) {
    _classCallCheck(this, Scene);

    this.id = id;
    this.elements = elements;
    this.showHiddenElement = false;
    this.events = [];
    this.index = 0;
  }

  _createClass(Scene, [{
    key: "show",
    value: function show() {
      var hovered = false;
      this.elements.filter(function (element) {
        return !element.hidden;
      }).forEach(function (element) {
        element.show();

        if (element.collide()) {
          hovered = true;
        }
      });

      if (this.events.length > 0) {
        this.events[this.index].show();
      }

      if (hovered) {
        this.elements.filter(function (element) {
          return element.hidden;
        }).forEach(function (element) {
          element.show();
        });
      } else {
        this.elements.filter(function (element) {
          return element.hidden;
        }).forEach(function (element) {
          element.index = 0;
        });
      }
    }
  }, {
    key: "pressed",
    value: function pressed() {
      this.elements.forEach(function (element) {
        element.pressed();
      });
      this.events[this.index].pressed();
    }
  }]);

  return Scene;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Box =
/*#__PURE__*/
function () {
  function Box(x, y, w, h) {
    _classCallCheck(this, Box);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  _createClass(Box, [{
    key: "show",
    value: function show() {
      rectMode(CENTER);
      fill(255);

      if (this.collide()) {
        fill(255, 0, 0);
      }

      rect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "collide",
    value: function collide() {
      if (mouseX >= this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY >= this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
        return true;
      }

      return false;
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return;
      console.log('pressed box');
    }
  }]);

  return Box;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle =
/*#__PURE__*/
function () {
  function Circle(x, y, r) {
    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    this.r = r;
  }

  _createClass(Circle, [{
    key: "show",
    value: function show() {
      rectMode(CENTER);
      fill(255);

      if (this.collide()) {
        fill(255, 0, 0);
      }

      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
  }, {
    key: "collide",
    value: function collide() {
      if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
        return true;
      }

      return false;
    }
  }]);

  return Circle;
}();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DialogueBox =
/*#__PURE__*/
function (_Box) {
  _inherits(DialogueBox, _Box);

  function DialogueBox(x, y, w, h, text) {
    var _this;

    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 20;
    var border = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var fontSize = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 24;

    _classCallCheck(this, DialogueBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DialogueBox).call(this, x, y, w, h));
    _this.text = text;
    _this.padding = padding;
    _this.border = border;
    _this.fontSize = fontSize;
    _this.hidden = false;
    _this.index = 0;
    _this.frame = 0;
    return _this;
  }

  _createClass(DialogueBox, [{
    key: "show",
    value: function show() {
      rectMode(CENTER);
      fill(255);
      rect(this.x, this.y, this.w, this.h);
      textLeading(0);
      textAlign(CENTER, CENTER);
      textFont(font);
      textSize(this.fontSize);
      fill(0);
      stroke(0);
      strokeWeight(1);
      var textToShow = this.text.split('').slice(0, this.index).join('');
      text(textToShow, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h);

      if (this.frame % 2 === 0) {
        this.index++;

        if (this.index > this.text.split('').length) {
          this.index = this.text.split('').length;
        }
      }

      this.frame++; // spriteFont.showFont(this.text, this.x, this.y, this.w, this.h)
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return false;
      console.log('pressed dialogue box');
    }
  }]);

  return DialogueBox;
}(Box);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IconSelectionBox =
/*#__PURE__*/
function (_Box) {
  _inherits(IconSelectionBox, _Box);

  function IconSelectionBox(x, y, w, h, image) {
    var _this;

    _classCallCheck(this, IconSelectionBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IconSelectionBox).call(this, x, y, w, h));
    _this.image = image;
    return _this;
  }

  _createClass(IconSelectionBox, [{
    key: "show",
    value: function show() {
      rectMode(CENTER);
      image(this.image, this.x, this.y, this.w, this.h, 0, 0, 16, 16); // fill(255)
      // if (this.collide()) {
      //     strokeWeight(5)
      // } else {
      //     strokeWeight(1)
      // }
      // rect(this.x, this.y, this.w, this.h)
      // let t = this.collide() ? this.hoverText : this.text
      // textLeading(0)
      // textAlign(CENTER, CENTER)
      // textFont(font)
      // textSize(this.fontSize)
      // fill(0)
      // stroke(0)
      // strokeWeight(1)
      // text(t, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h)
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return;
      sceneManager.next();
    }
  }]);

  return IconSelectionBox;
}(Box);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectionBox =
/*#__PURE__*/
function (_Box) {
  _inherits(SelectionBox, _Box);

  function SelectionBox(x, y, w, h, text, hoverText) {
    var _this;

    _classCallCheck(this, SelectionBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectionBox).call(this, x, y, w, h));
    _this.padding = 10;
    _this.text = text;
    _this.fontSize = 24;
    _this.hoverText = hoverText ? hoverText : text;
    _this.hoverDistance = 10;
    return _this;
  }

  _createClass(SelectionBox, [{
    key: "show",
    value: function show() {
      rectMode(CENTER);
      fill(255);

      if (this.collide()) {
        strokeWeight(5);
      } else {
        strokeWeight(1);
      }

      rect(this.x, this.y, this.w, this.h);
      var t = this.collide() ? this.hoverText : this.text;
      textLeading(0);
      textAlign(CENTER, CENTER);
      textFont(font);
      textSize(this.fontSize);
      fill(0);
      stroke(0);
      strokeWeight(1);
      text(t, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h);
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return;
      sceneManager.next();
    }
  }]);

  return SelectionBox;
}(Box);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var StatusBar =
/*#__PURE__*/
function (_Box) {
  _inherits(StatusBar, _Box);

  function StatusBar(w, h) {
    var _this;

    _classCallCheck(this, StatusBar);

    return _possibleConstructorReturn(_this);
  }

  _createClass(StatusBar, [{
    key: "show",
    value: function show() {// let dialogueBox = new DialogueBox(width / 2, height / 4, width, height / 2, 'Before changing the example, it might be helpful to submit a feature request to whomever handles these kinds of issues at Mozilla/Webkit citing the noSmooth() documentation as an example of why this type of boolean control for graphics smoothing (not image smoothing) would be practical for developers.')
    }
  }]);

  return StatusBar;
}(Box);
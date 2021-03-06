"use strict";

var font;
var spriteFont;
var currentScene;
var sceneManager;
var player; // icons

var iconBattle, iconEvent, iconOpportunity, iconBoss;
var swordImage, handImage, bodyImage;
var plateArmorImage;
var mageImage;
var giantSwordGuyImage;
var icons = [];

function preload() {
  font = loadFont('./assets/BitPotionExt.ttf');
  iconBattle = loadImage('./assets/icon-battle.png');
  iconEvent = loadImage('./assets/icon-event.png');
  iconOpportunity = loadImage('./assets/icon-opportunity.png');
  iconBoss = loadImage('./assets/icon-boss.png');
  swordImage = loadImage('./assets/sword.png');
  handImage = loadImage('./assets/hand.png');
  bodyImage = loadImage('./assets/body.png');
  plateArmorImage = loadImage('./assets/plate-armor.png');
  mageImage = loadImage('./assets/mage.png');
  giantSwordGuyImage = loadImage('./assets/giant-sword-guy.png');
  icons.push.apply(icons, [iconBattle, iconEvent, iconOpportunity, iconBoss]);
}

function setup() {
  noSmooth();
  rectMode(CENTER);
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.elt.id = 'game';
  initGame(); // player = new Player()
  // sceneManager = new SceneManager()
  // currentScene = sceneManager.scenes[sceneManager.index]
}

function initGame() {
  player = new Player();
  player.weapon = new Weapon();
  player.armor = new Armor();
  player.updateStats();
  sceneManager = new SceneManager();
  currentScene = sceneManager.scenes[sceneManager.index];
}

function draw() {
  background(255);
  currentScene.show();

  if (sceneManager.index > 0) {
    sceneManager.statusBar.show();
  }
}

function mousePressed(e) {
  currentScene.pressed();

  if (sceneManager.index > 0) {
    sceneManager.statusBar.pressed();
  }
}
"use strict";

var BUTTON_WIDTH = 250;
var BUTTON_HEIGHT = 70;
var WIDTH = 900;
var HEIGHT = 506.25;
var STATUS_BAR_HEIGHT = 50;
var STATUS_TITLE_HEIGHT = 25;
var STATUS_WIDTH = 150;
var STATE_PICK_EVENT = 1;
var BATTLE = 0;
var EVENT = 1;
var OPPORTUNITY = 2;
var BOSS = 3;
var SWORD = 0;
var STAFF = 1;
var DAGGER = 2;
var PLATE = 0;
var CLOTH = 1;
var LEATHER = 2;
var NORMAL = 0;
var RARE = 1;
var WEAPON = 0;
var ARMOR = 1;
var GIANT_SWORD_GUY = 0;
var CREEP = 1;
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

var BattleEvent =
/*#__PURE__*/
function () {
  function BattleEvent(creep, selectionsTextArray) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$row = _ref.row,
        row = _ref$row === void 0 ? 2 : _ref$row,
        _ref$col = _ref.col,
        col = _ref$col === void 0 ? 2 : _ref$col,
        _ref$paddingX = _ref.paddingX,
        paddingX = _ref$paddingX === void 0 ? 20 : _ref$paddingX,
        _ref$paddingY = _ref.paddingY,
        paddingY = _ref$paddingY === void 0 ? 10 : _ref$paddingY,
        _ref$dialoguePortion = _ref.dialoguePortion,
        dialoguePortion = _ref$dialoguePortion === void 0 ? 0.1 : _ref$dialoguePortion,
        _ref$creepPortion = _ref.creepPortion,
        creepPortion = _ref$creepPortion === void 0 ? 0.5 : _ref$creepPortion,
        _ref$buttonWidth = _ref.buttonWidth,
        buttonWidth = _ref$buttonWidth === void 0 ? BUTTON_WIDTH : _ref$buttonWidth,
        _ref$buttonHeight = _ref.buttonHeight,
        buttonHeight = _ref$buttonHeight === void 0 ? BUTTON_HEIGHT : _ref$buttonHeight,
        _ref$isIcon = _ref.isIcon,
        isIcon = _ref$isIcon === void 0 ? false : _ref$isIcon,
        _ref$results = _ref.results,
        results = _ref$results === void 0 ? [] : _ref$results,
        _ref$dialogueTextSize = _ref.dialogueTextSize,
        dialogueTextSize = _ref$dialogueTextSize === void 0 ? 48 : _ref$dialogueTextSize;

    _classCallCheck(this, BattleEvent);

    this.dialoguesTextArray = [creep.name];
    this.selectionsTextArray = selectionsTextArray;
    this.height = height - STATUS_BAR_HEIGHT;
    this.dialogues = [];
    this.selections = [];
    this.index = 0;
    this.shouldEnd = false;
    this.turn = 0;
    this.creep = creep;
    this.results = results;
    this.dialoguePortion = dialoguePortion;
    this.creepPortion = creepPortion;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    this.width = width - this.paddingX * 2;
    this.row = row;
    this.col = col;
    this.dialogueTextSize = dialogueTextSize;
    this.isIcon = isIcon;
    this.resolved = false;
    this.createCreepPortion();
    this.createDialogues();

    if (this.isIcon) {
      this.createIconSelections();
    } else {
      this.createSelections();
    }
  }

  _createClass(BattleEvent, [{
    key: "createCreepPortion",
    value: function createCreepPortion() {
      var creepBoxHeight = this.height * this.creepPortion;
      this.creepBox = new ImageBox(width / 2, STATUS_BAR_HEIGHT + creepBoxHeight / 2, width, creepBoxHeight, this.creep.img);
    }
  }, {
    key: "healthBar",
    value: function healthBar() {
      var creepBoxHeight = this.height * this.creepPortion;
      var w = 128;
      var barH = 10;
      var barY = STATUS_BAR_HEIGHT + creepBoxHeight / 2 - 128 / 2 - 30;
      var x = width / 2;
      var healthPorporation = constrain(this.creep.hp / this.creep.hpMax, 0, 1);
      var barW = healthPorporation * w;
      var barX = x - w / 2 + barW / 2;
      noFill();
      stroke(0);
      strokeWeight(1);
      rect(x, barY, w, barH);
      fill(0);
      stroke(0);
      strokeWeight(1);
      rect(barX, barY, barW, barH);
    }
  }, {
    key: "createDialogues",
    value: function createDialogues() {
      var _this = this;

      var dialogueHeight = this.height * this.dialoguePortion;
      var creepBoxHeight = this.height * this.creepPortion;
      this.dialoguesTextArray.forEach(function (element) {
        _this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, element, 20, false, _this.dialogueTextSize));
      });
    }
  }, {
    key: "createSelections",
    value: function createSelections() {
      var _this2 = this;

      this.selectionsTextArray.forEach(function (element, index) {
        var x = index % _this2.col;
        var y = Math.floor(index / _this2.col);
        var dialogueHeight = _this2.height * (_this2.dialoguePortion + _this2.creepPortion);
        var containerHeight = _this2.height * (1 - _this2.dialoguePortion - _this2.creepPortion);
        var rowHeight = containerHeight / _this2.row;
        var shouldCenterX = index % _this2.col === 0 && _this2.selectionsTextArray.length - 1 - index === 0;
        var shouldCenterY = Math.floor((_this2.selectionsTextArray.length - 1) / _this2.col) === 0;
        var yCenter = containerHeight / 2 + STATUS_BAR_HEIGHT + dialogueHeight;
        var buttonPadding = (width - _this2.buttonWidth * _this2.col - (_this2.col - 1) * _this2.paddingX) / 2;

        _this2.selections.push(new SelectionBox(shouldCenterX ? width / 2 : buttonPadding + _this2.buttonWidth / 2 + x * (_this2.paddingX + _this2.buttonWidth), shouldCenterY ? yCenter : yCenter - rowHeight / 2 + y * rowHeight, _this2.buttonWidth, _this2.buttonHeight, element));
      });
    }
  }, {
    key: "createIconSelections",
    value: function createIconSelections() {
      var _this3 = this;

      this.selectionsTextArray.forEach(function (element, index) {
        var x = index % _this3.col;
        var y = Math.floor(index / _this3.col);
        var dialogueHeight = _this3.height * _this3.dialoguePortion;
        var containerHeight = _this3.height * (1 - _this3.dialoguePortion);
        var rowHeight = containerHeight / _this3.row;
        var shouldCenterX = index % _this3.col === 0 && _this3.selectionsTextArray.length - 1 - index === 0;
        var shouldCenterY = Math.floor((_this3.selectionsTextArray.length - 1) / _this3.col) === 0;
        var yCenter = containerHeight / 2 + STATUS_BAR_HEIGHT + dialogueHeight;
        var buttonPadding = (width - _this3.buttonWidth * _this3.col - (_this3.col - 1) * _this3.paddingX) / 2;

        _this3.selections.push(new IconSelectionBox(shouldCenterX ? width / 2 : buttonPadding + _this3.buttonWidth / 2 + x * (_this3.paddingX + _this3.buttonWidth), shouldCenterY ? yCenter : yCenter - rowHeight / 2 + y * rowHeight, _this3.buttonWidth, _this3.buttonHeight, element));
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.dialogues.length - 1 > this.index) {
        this.dialogues[this.index].show();
      } else {
        if (this.dialogues.length > 0) {
          // console.log(this.dialogues)
          this.dialogues[this.dialogues.length - 1].show();
        }

        if (this.turn % 2 == 0 && !this.resolved) {
          this.selections.forEach(function (selection) {
            selection.show();
          });
        }
      }

      this.creepBox.show();
      this.healthBar();
    }
  }, {
    key: "attack",
    value: function attack() {
      var _this4 = this;

      //this.creep.name + ' took ' + player.attack + ' damages!'
      var dialogueHeight = this.height * this.dialoguePortion;
      var creepBoxHeight = this.height * this.creepPortion; // currentScene.events[currentScene.index].creep.hp -= player.attack

      this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, this.creep.name + ' took ' + constrain(player.attack - this.creep.defence, 0, Infinity) + ' damages!', 20, false, this.dialogueTextSize, function () {
        currentScene.events[currentScene.index].creep.hp -= constrain(player.attack - currentScene.events[currentScene.index].creep.defence, 0, Infinity);
        _this4.resolved = true;
      })); // this.turn++
    }
  }, {
    key: "ability",
    value: function ability() {
      var _this5 = this;

      //this.creep.name + ' took ' + player.attack + ' damages!'
      var dialogueHeight = this.height * this.dialoguePortion;
      var creepBoxHeight = this.height * this.creepPortion; // currentScene.events[currentScene.index].creep.hp -= player.attack

      this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, this.creep.name + ' took ' + constrain(player.weapon.abilityAttack - this.creep.defence, 0, currentScene.events[currentScene.index].creep.hp) + ' damages!', 20, false, this.dialogueTextSize, function () {
        currentScene.events[currentScene.index].creep.hp -= constrain(player.weapon.abilityAttack - currentScene.events[currentScene.index].creep.defence, 0, currentScene.events[currentScene.index].creep.hp);
        player.mp -= Math.round(player.weapon.mp * player.mpMax);
        _this5.resolved = true;
      }));
    }
  }, {
    key: "creepAttack",
    value: function creepAttack() {
      var _this6 = this;

      var dialogueHeight = this.height * this.dialoguePortion;
      var creepBoxHeight = this.height * this.creepPortion;
      this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, 'YOU took ' + constrain(this.creep.attack - player.defence, 0, Infinity) + ' damages!', 20, false, this.dialogueTextSize, function () {
        player.hp -= constrain(_this6.creep.attack - player.defence, 0, Infinity);
        _this6.resolved = true;
      })); // this.turn++
    }
  }, {
    key: "pressed",
    value: function pressed() {
      var _this7 = this;

      if (this.shouldEnd) {
        if (this.index < this.dialogues.length - 1) {
          this.index++;
          return;
        }

        return;
      }

      if (this.resolved) {
        if (this.creep.hp <= 0) {
          var dialogueHeight = this.height * this.dialoguePortion;
          var creepBoxHeight = this.height * this.creepPortion;
          var creep = currentScene.events[currentScene.index].creep;
          this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, 'VICTORY!', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, 'Gain ' + Math.ceil(creep.exp) + ' experience!', 20, false, this.dialogueTextSize, function () {
            player.exp += Math.ceil(creep.exp);
          }));
          this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, 'Gain ' + Math.ceil(creep.money) + ' gold!', 20, false, this.dialogueTextSize, function () {
            player.money += Math.ceil(creep.money);
          }));
          this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, 'Gain ' + Math.ceil(creep.material) + ' material(s)!', 20, false, this.dialogueTextSize, function () {
            player.material += Math.ceil(creep.material);
          }));
          this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight, width, dialogueHeight, '', 20, false, this.dialogueTextSize, function () {
            sceneManager.next();
          }));
          this.shouldEnd = true;

          if (this.index < this.dialogues.length - 1) {
            this.index++;
          }

          return;
        }

        if (player.hp <= 0) {
          var _dialogueHeight = this.height * this.dialoguePortion;

          var _creepBoxHeight = this.height * this.creepPortion;

          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'YOU DIED!', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'YOU START FROM HAVING NOTHING...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'AND YOU ARE HERE...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'LIKE PUSHING A GIANT ROCK UP THE HILL...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'BUT YOU COULD NEVER GET TO THE TOP...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'LIKE A GAME DEVELOPER...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'A NEVER ENDING JOURNEY...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'JUST KEEP GOING...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, 'AND GOING...', 20, false, this.dialogueTextSize));
          this.dialogues.push(new DialogueBox(width / 2, _dialogueHeight / 2 + STATUS_BAR_HEIGHT + _creepBoxHeight, width, _dialogueHeight, '', 20, false, this.dialogueTextSize, function () {
            sceneManager.gameOver();
          }));
          this.shouldEnd = true;

          if (this.index < this.dialogues.length - 1) {
            this.index++;
          }

          return;
        }

        this.resolved = false;
        this.turn++;
      } // console.log(this.turn % 2, this.resolved)


      if (this.turn % 2 === 1) {
        if (!this.resolved) {
          this.creepAttack();
        }
      }

      this.selections.forEach(function (selection, index) {
        selection.pressed(function () {
          if (_this7.turn % 2 === 0) {
            if (!_this7.resolved) {
              if (index === 0) {
                _this7.attack();
              } else {
                if (player.mp < player.weapon.mp * player.mpMax) return;

                _this7.ability();
              }
            }
          }
        });
      });

      if (this.index < this.dialogues.length - 1) {
        this.index++;
      }
    }
  }]);

  return BattleEvent;
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

        if (currentScene.events.length <= currentScene.index) {
          sceneManager.next();
        }
      }
    }
  }, {
    key: "pressed",
    value: function pressed() {
      // this.dialogues[this.index]
      if (!this.dialogues[this.index].collide()) return;

      if (this.dialogues[this.index].atTheEnd) {
        this.index++;
      } else {
        this.dialogues[this.index].atTheEnd = true;
      }
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
        col = _ref$col === void 0 ? 2 : _ref$col,
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
        isIcon = _ref$isIcon === void 0 ? false : _ref$isIcon,
        _ref$results = _ref.results,
        results = _ref$results === void 0 ? [] : _ref$results,
        _ref$dialogueTextSize = _ref.dialogueTextSize,
        dialogueTextSize = _ref$dialogueTextSize === void 0 ? 48 : _ref$dialogueTextSize;

    _classCallCheck(this, SelectionEvent);

    this.dialoguesTextArray = dialoguesTextArray;
    this.selectionsTextArray = selectionsTextArray;
    this.height = height - STATUS_BAR_HEIGHT;
    this.dialogues = [];
    this.selections = [];
    this.index = 0;
    this.results = results;
    this.dialoguePortion = dialoguePortion;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    this.width = width - this.paddingX * 2;
    this.row = row;
    this.col = col;
    this.dialogueTextSize = dialogueTextSize;
    this.isIcon = isIcon;
    this.createDialogues();

    if (this.isIcon) {
      this.createIconSelections();
    } else {
      this.createSelections();
    }
  }

  _createClass(SelectionEvent, [{
    key: "createDialogues",
    value: function createDialogues() {
      var _this = this;

      var dialogueHeight = this.height * this.dialoguePortion;
      this.dialoguesTextArray.forEach(function (element) {
        _this.dialogues.push(new DialogueBox(width / 2, dialogueHeight / 2 + STATUS_BAR_HEIGHT, width, dialogueHeight, element, 20, false, _this.dialogueTextSize));
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
    key: "createIconSelections",
    value: function createIconSelections() {
      var _this3 = this;

      this.selectionsTextArray.forEach(function (element, index) {
        var x = index % _this3.col;
        var y = Math.floor(index / _this3.col);
        var dialogueHeight = _this3.height * _this3.dialoguePortion;
        var containerHeight = _this3.height * (1 - _this3.dialoguePortion);
        var rowHeight = containerHeight / _this3.row;
        var shouldCenterX = index % _this3.col === 0 && _this3.selectionsTextArray.length - 1 - index === 0;
        var shouldCenterY = Math.floor((_this3.selectionsTextArray.length - 1) / _this3.col) === 0;
        var yCenter = containerHeight / 2 + STATUS_BAR_HEIGHT + dialogueHeight;
        var buttonPadding = (width - _this3.buttonWidth * _this3.col - (_this3.col - 1) * _this3.paddingX) / 2;

        _this3.selections.push(new IconSelectionBox(shouldCenterX ? width / 2 : buttonPadding + _this3.buttonWidth / 2 + x * (_this3.paddingX + _this3.buttonWidth), shouldCenterY ? yCenter : yCenter - rowHeight / 2 + y * rowHeight, _this3.buttonWidth, _this3.buttonHeight, element));
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.dialogues.length - 1 > this.index) {
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
      var _this4 = this;

      this.index++;
      this.selections.forEach(function (selection, index) {
        selection.pressed(_this4.results[index]);
      });
    }
  }]);

  return SelectionEvent;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Armor = function Armor(type, quality) {
  _classCallCheck(this, Armor);

  this.type = type;
  this.quality = quality;
  this.name = 'Naked';
  this.attack = 0;
  this.defence = 0;
  this.str = 0;
  this.agi = 0;
  this["int"] = 0;
  this.img = bodyImage;

  switch (this.type) {
    case PLATE:
      if (quality === RARE) {
        this.defence = Math.round(player.str * 0.8 + 20);
        this.img = plateArmorImage;
        this.name = 'Bikini Plate Armor';
      } else {
        this.defence = Math.round(player.str * 0.5 + 10);
        this.img = plateArmorImage;
        this.name = 'Plate Armor';
      }

      break;

    default:
      break;
  }
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Creep =
/*#__PURE__*/
function () {
  function Creep() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CREEP;

    _classCallCheck(this, Creep);

    this.attack = player.level * 5 + 1;
    this.defence = 0;
    this.hpMax = player.level * 10 + 1;
    this.hp = this.hpMax;
    this.img = mageImage;
    this.name = 'MAGE';
    this.exp = Math.ceil(player.levelExp * 0.25);
    this.money = Math.ceil(player.level * 10 + 1);
    this.type = type;
    this.material = player.level * 2 + 1;
    this.initStats();
  }

  _createClass(Creep, [{
    key: "initStats",
    value: function initStats() {
      if (this.type === BOSS) {
        this.attack = Math.round(player.level * 10 + 10 + player.defence * 0.1);
        this.hpMax = Math.round(player.level * 50 + 20);
        this.defence = Math.round(player.attack * 0.2);
        this.name = 'GAINT SWORD GUY';
        this.exp = Math.ceil(player.levelExp * 0.5);
        this.img = giantSwordGuyImage;
        this.hp = this.hpMax;
        this.money = Math.ceil(player.level * 50 + 1);
        this.material = player.level * 5 + 1;
      }
    }
  }]);

  return Creep;
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
    this.level = 0;
    this.str = 0;
    this["int"] = 0;
    this.agi = 0;
    this.baseStr = this.str;
    this.baseInt = this["int"];
    this.baseAgi = this.agi;
    this.stats = [this.str, this["int"], this.agi];
    this.money = 0;
    this.material = 0;
    this.mainStat = random(this.stats);
    this.exp = 0;
    this.levelExp = 1;
    this.hpMax = this.str * 2 + 1;
    this.hp = this.hpMax;
    this.mpMax = this["int"] * 2 + 1;
    this.mp = this.mpMax;
    this.baseAttack = this.str * 2;
    this.attack = this.baseAttack;
    this.defence = 0;
    this.weapon = false;
    this.armor = false; // this.updateStats()
  }

  _createClass(Player, [{
    key: "equipWeapon",
    value: function equipWeapon(weapon) {
      this.weapon = weapon;
      this.updateStats();
    }
  }, {
    key: "equipArmor",
    value: function equipArmor(armor) {
      this.armor = armor;
      this.updateStats();
    }
  }, {
    key: "gainExp",
    value: function gainExp(amt) {
      this.exp += amt;

      if (this.exp >= this.levelExp) {
        this.exp -= this.levelExp;
        this.levelUp();
      }
    }
  }, {
    key: "levelUp",
    value: function levelUp() {
      // currentScene.events.push(
      //     new DialogueEvent(
      //         [
      //             'Level Up!'
      //         ]
      //     )
      // )
      // currentScene.index++
      this.level++;
      this.baseStr += Math.round(random(1, this.level));
      this.baseInt += Math.round(random(1, this.level));
      this.baseAgi += Math.round(random(1, this.level));
      this.hp = this.hpMax;
      this.mp = this.mpMax; // this.mainStat += (this.level - 1)

      this.updateStats();
    }
  }, {
    key: "updateStats",
    value: function updateStats() {
      this.str = this.baseStr + this.weapon.str + this.armor.str;
      this["int"] = this.baseInt + this.weapon["int"] + this.armor["int"];
      this.agi = this.baseAgi + this.weapon.agi + this.armor.agi;
      this.baseAttack = Math.round(this.str * 0.5);
      this.baseDefence = Math.ceil(this.agi * 0.5);
      this.attack = this.baseAttack + this.weapon.attack + this.armor.attack;
      this.defence = this.baseDefence + this.weapon.defence + this.armor.defence;
      var newHp = this.str * 5 + 1;
      var hpDifference = newHp - this.hpMax;
      this.hpMax = newHp;
      this.hp += hpDifference;
      var newMp = this["int"] * 5 + 1;
      var mpDifference = newMp - this.mpMax;
      this.mpMax = newMp;
      this.mp += mpDifference;
      this.levelExp = this.level * this.level + 1;
    }
  }]);

  return Player;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weapon = function Weapon(type, quality) {
  _classCallCheck(this, Weapon);

  this.type = type;
  this.quality = quality;
  this.name = 'Bare hand';
  this.mp = 1;
  this.ability = 'ONE PUNCH!';
  this.abilityAttack = 999999;
  this.attack = 1;
  this.defence = 0;
  this.str = 0;
  this.agi = 0;
  this["int"] = 0;
  this.img = handImage;

  switch (this.type) {
    case SWORD:
      if (quality === RARE) {
        this.attack = 50 + player.level * 5;
        this.str = Math.round(player.baseStr * 0.2) + 1;
        this.img = swordImage;
        this.name = 'Great Sword';
        this.ability = 'Heavy Slash';
        this.mp = 0.3;
        this.abilityAttack = 100 + player.level * 10;
      } else {
        this.attack = 20 + player.level * 2;
        this.img = swordImage;
        this.name = 'Sword';
        this.ability = 'Slash';
        this.mp = 0.3;
        this.abilityAttack = 40 + player.level * 4;
      }

      break;

    default:
      break;
  }
};
"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SceneManager =
/*#__PURE__*/
function () {
  function SceneManager() {
    var _this = this;

    _classCallCheck(this, SceneManager);

    this.index = 0;
    this.scenes = [];
    this.statusBar = this.createStatusBar();
    this.createScenes();
    this.events = [function () {
      return _construct(SelectionEvent, [['You found a homeless person on the street...'], ['Give him: $' + (Math.ceil(player.money * 0.8) === 0 ? 1 : Math.ceil(player.money * 0.8)), 'No way!'], {
        paddingX: 50,
        results: [function () {
          if (player.money < (Math.ceil(player.money * 0.8) === 0 ? 1 : Math.ceil(player.money * 0.8))) return;
          player.money -= Math.ceil(player.money * 0.8);
          currentScene.events.push(new DialogueEvent(['HOMELESS: THANK YOU SO MUCH!!!', 'He gives you...']));
          var equipment;

          if (Math.random() > 0.5) {
            equipment = new Weapon(SWORD, NORMAL);
            currentScene.events.push(_this.equipSelection(equipment, WEAPON)); // player.equipWeapon(equipment)
          } else {
            equipment = new Armor(PLATE, NORMAL);
            currentScene.events.push(_this.equipSelection(equipment, ARMOR)); // player.equipArmor(equipment)
          } // currentScene.events.push()


          currentScene.index++;
        }, function () {
          _this.next();
        }]
      }]);
    }, function () {
      var mat = Math.ceil(player.material * 0.5) === 0 ? 1 : Math.ceil(player.material * 0.5);
      return _construct(SelectionEvent, [['You found a villige...', 'You can exchange some of your materials for an equipment...'], ['Trade ' + mat + ' Materials for a Weapon', 'Trade ' + mat + ' Materials for an Armor', 'Walk away...'], {
        paddingX: 50,
        results: [function () {
          if (player.material < mat) return;
          player.material -= mat;
          var equipment;
          equipment = new Weapon(SWORD, NORMAL);
          currentScene.events.push(_this.equipSelection(equipment, WEAPON));
          currentScene.index++;
        }, function () {
          if (player.material < mat) return;
          player.material -= mat;
          var equipment;
          equipment = new Armor(PLATE, NORMAL);
          currentScene.events.push(_this.equipSelection(equipment, ARMOR));
          currentScene.index++;
        }, function () {
          _this.next();
        }]
      }]);
    }, function () {
      var money = Math.ceil(player.str * player.level + 30);
      return _construct(SelectionEvent, [['RIP OFF STORE...'], ['Pay $' + money + ' for a Weapon', 'Pay $' + money + ' for a Armor', 'Walk away...'], {
        paddingX: 50,
        results: [function () {
          if (player.money < money) return;
          player.money -= money;
          var equipment;
          equipment = new Weapon(SWORD, RARE);
          currentScene.events.push(_this.equipSelection(equipment, WEAPON));
          currentScene.index++;
        }, function () {
          if (player.money < money) return;
          player.money -= money;
          var equipment;
          equipment = new Armor(PLATE, RARE);
          currentScene.events.push(_this.equipSelection(equipment, ARMOR));
          currentScene.index++;
        }, function () {
          _this.next();
        }]
      }]);
    }, function () {
      return _construct(SelectionEvent, [['CASINO...'], ['Bet for $30!', 'Bet for $80!', 'Bet for $200!', 'Walk away...'], {
        paddingX: 50,
        results: [function () {
          var betAmount = 30;
          if (player.money < betAmount) return;
          player.money -= betAmount;

          if (random() > 0.5) {
            currentScene.events.push(new DialogueEvent(['You won $' + betAmount * 2 + '!']));
            player.money += betAmount * 2;
          } else {
            currentScene.events.push(new DialogueEvent(['You lost your bet...', 'Better luck next time']));
          }

          currentScene.index++;
        }, function () {
          var betAmount = 80;
          if (player.money < betAmount) return;
          player.money -= betAmount;

          if (random() > 0.5) {
            currentScene.events.push(new DialogueEvent(['You won $' + betAmount * 2 + '!']));
            player.money += betAmount * 2;
          } else {
            currentScene.events.push(new DialogueEvent(['You lost your bet...', 'Better luck next time']));
          }

          currentScene.index++;
        }, function () {
          var betAmount = 200;
          if (player.money < betAmount) return;
          player.money -= betAmount;

          if (random() > 0.5) {
            currentScene.events.push(new DialogueEvent(['You won $' + betAmount * 2 + '!']));
            player.money += betAmount * 2;
          } else {
            currentScene.events.push(new DialogueEvent(['You lost your bet...', 'Better luck next time']));
          }

          currentScene.index++;
        }, function () {
          _this.next();
        }]
      }]);
    }];
    this.opportunity = [function () {
      return _construct(SelectionEvent, [['Repeated Horizontal Jump competition...'], ['Have a look', 'Walk away'], {
        paddingX: 50,
        results: [function () {
          currentScene.events.push(new DialogueEvent(['Gain 3 AGILITY']));
          currentScene.index++;
          player.baseAgi += 3;
          player.updateStats();
        }, function () {
          _this.next();
        }]
      }]);
    }, function () {
      var reduceHp = player.hp > 10 ? 10 : player.hp - 1;
      return _construct(SelectionEvent, [['You heard wispers of unknown words...'], ['AKLD LSNKLNSDLK DLSKNDLKSD KLSD NJHD SHKDJ KJHSDK'], {
        paddingX: 50,
        results: [function () {
          currentScene.events.push(new DialogueEvent(['HP - ' + reduceHp, 'INT + 5']));
          currentScene.index++;
          player.baseInt += 5;
          player.updateStats();
          player.hp -= reduceHp;
        }]
      }]);
    }, function () {
      var reduceHp = player.hp > 10 ? 10 : player.hp - 1;
      return _construct(SelectionEvent, [['Excalibur...'], ['Try to pull it out...'], {
        paddingX: 50,
        results: [function () {
          if (random() < 0.3) {
            currentScene.events.push(new DialogueEvent(['Successful!']));
            var equipment;
            equipment = new Weapon(SWORD, RARE);
            currentScene.events.push(_this.equipSelection(equipment, WEAPON));
            currentScene.index++;
          } else {
            var gainStr = player.level * 2 + 1;
            currentScene.events.push(new DialogueEvent(['Fail!', 'But you fell you become stronger...', 'STR + ' + gainStr]));
            player.baseStr += gainStr;
            player.updateStats();
            currentScene.index++;
          }
        }]
      }]);
    }];

    this.equipSelection = function (equipment, type) {
      var stats = [];

      if (equipment.attack > 0) {
        stats.push('ATTACK +' + equipment.attack);
      }

      if (equipment.defence > 0) {
        stats.push('DEFENCE +' + equipment.defence);
      }

      if (equipment.str > 0) {
        stats.push('STR +' + equipment.str);
      }

      if (equipment["int"] > 0) {
        stats.push('INT +' + equipment["int"]);
      }

      if (equipment.agi > 0) {
        stats.push('AGI +' + equipment.agi);
      }

      return _construct(SelectionEvent, [[equipment.name + '\n' + stats.join('\n')], ['Equip', 'Discard'], {
        dialogueTextSize: 36,
        paddingX: 50,
        results: [function () {
          if (type === WEAPON) {
            player.equipWeapon(equipment);
          }

          if (type === ARMOR) {
            player.equipArmor(equipment);
          }

          _this.next();
        }, function () {
          _this.next();
        }]
      }]);
    };
  }

  _createClass(SceneManager, [{
    key: "createBattle",
    value: function createBattle(type) {
      return _construct(BattleEvent, [new Creep(type), ['Attack', player.weapon.ability + ' (MP: ' + Math.ceil(player.weapon.mp * player.mpMax) + ')'], {
        paddingX: 50
      }]);
    }
  }, {
    key: "createScenes",
    value: function createScenes() {
      this.createMainMenu();
      this.createGameScene(); // this.createGameScene()
    }
  }, {
    key: "createMainMenu",
    value: function createMainMenu() {
      var elements = []; // let dialogueBox = new DialogueBox(width / 2, height / 4, width, height / 2, 'Before changing the example, it might be helpful to submit a feature request to whomever handles these kinds of issues at Mozilla/Webkit citing the noSmooth() documentation as an example of why this type of boolean control for graphics smoothing (not image smoothing) would be practical for developers.')

      var startButton = new SelectionBox(width / 2, height / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 'NOTHING', 'START');
      elements.push(startButton);
      elements.push({
        show: function show() {
          textLeading(0);
          textAlign(CENTER, CENTER);
          textFont(font);
          textSize(48);
          fill(0);
          stroke(0);
          strokeWeight(1);
          text('JOURNEY TO NOWHERE', width / 2, height / 2 - 100);
        },
        collide: function collide() {
          return false;
        },
        pressed: function pressed() {}
      });
      this.scenes.push(new Scene(this.scenes.length, elements));
    }
  }, {
    key: "createStatusBar",
    value: function createStatusBar() {
      return new StatusBar();
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
      var elements = []; // elements.push(this.createStatusBar())
      // elements.push(...this.createStatsCol([
      //     'STR: ' + player.str,
      //     'INT: ' + player.int,
      //     'AGI: ' + player.agi
      // ]))

      var events = [];
      events.push(new DialogueEvent(['You have NOTHING...', 'You don\'t know where you are...', 'You are weak...', 'Even the weakest slime kills you in one hit...', 'But you want to stay alive...', 'To find the purpose of your pathetic life...', 'You walk and walk around this place...', 'You found serval paths in front of you...']));
      events.push(new SelectionEvent(['You are gonna choose...'], [BATTLE, EVENT, OPPORTUNITY, BOSS], {
        isIcon: true,
        col: 4,
        buttonWidth: 64,
        buttonHeight: 64,
        paddingX: 50
      }));
      var scene = new Scene(this.scenes.length, elements);
      scene.events = events;
      this.scenes.push(scene);
    }
  }, {
    key: "createIconSelection",
    value: function createIconSelection() {
      var elements = [];
      var events = [];
      var amountOfChoices = Math.round(random(1, 4));
      var allE = [BATTLE, EVENT, OPPORTUNITY, BOSS];
      var e = [];

      for (var i = 0; i < amountOfChoices; i++) {
        e.push(random(allE));
      }

      events.push(new SelectionEvent(['Make another choice...'], e, {
        isIcon: true,
        col: amountOfChoices,
        buttonWidth: 64,
        buttonHeight: 64,
        paddingX: 50
      }));
      var scene = new Scene(this.scenes.length, elements);
      scene.events = events;
      this.scenes.push(scene);
    }
  }, {
    key: "next",
    value: function next() {
      this.index++;

      if (this.scenes.length <= this.index) {
        player.gainExp(1);
        this.createIconSelection();
      }

      currentScene = this.scenes[this.index];
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      initGame();
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

      if (this.events.length > this.index) {
        this.events[this.index].pressed();
      }
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
    var cb = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : function () {};

    _classCallCheck(this, DialogueBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DialogueBox).call(this, x, y, w, h));
    _this.text = text;
    _this.padding = padding;
    _this.border = border;
    _this.fontSize = fontSize;
    _this.hidden = false;
    _this.index = 0;
    _this.frame = 0;
    _this.atTheEnd = false;
    _this.cb = cb;
    return _this;
  }

  _createClass(DialogueBox, [{
    key: "show",
    value: function show() {
      this.cb();

      this.cb = function () {};

      rectMode(CENTER);
      fill(255);
      rect(this.x, this.y, this.w, this.h);
      textAlign(CENTER, CENTER);
      textFont(font);
      textSize(this.fontSize);
      textLeading(this.fontSize);
      fill(0);
      stroke(0);
      strokeWeight(1);
      var textToShow = this.text.split('').slice(0, this.index).join('');
      text(textToShow, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h);

      if (this.frame % 2 === 0) {
        this.index++;
      }

      if (this.index > this.text.split('').length || this.atTheEnd) {
        this.index = this.text.split('').length;
        this.atTheEnd = true;
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

  function IconSelectionBox(x, y, w, h, type) {
    var _this;

    _classCallCheck(this, IconSelectionBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IconSelectionBox).call(this, x, y, w, h));
    _this.type = type;
    _this.image = icons[type];
    _this.scale = 1.2;
    _this.hoverWidth = _this.w * _this.scale;
    _this.hoverHeight = _this.h * _this.scale;
    _this.currentWidth = _this.w;
    _this.currentHeight = _this.h;
    return _this;
  }

  _createClass(IconSelectionBox, [{
    key: "show",
    value: function show() {
      noSmooth();
      imageMode(CENTER);

      if (this.collide()) {
        this.currentWidth = lerp(this.currentWidth, this.hoverWidth, 0.1);
        this.currentHeight = lerp(this.currentHeight, this.hoverHeight, 0.1);
      } else {
        this.currentWidth = lerp(this.currentWidth, this.w, 0.1);
        this.currentHeight = lerp(this.currentHeight, this.h, 0.1);
      }

      image(this.image, this.x, this.y, this.currentWidth, this.currentHeight, 0, 0, 16, 16);
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return;

      switch (this.type) {
        case EVENT:
          currentScene.events.push(random(sceneManager.events)());
          currentScene.index++;
          break;

        case BATTLE:
          currentScene.events.push(sceneManager.createBattle(CREEP));
          currentScene.index++;
          break;

        case BOSS:
          currentScene.events.push(sceneManager.createBattle(BOSS));
          currentScene.index++;
          break;

        case OPPORTUNITY:
          // currentScene.events.push(sceneManager.opportunity[2]())
          currentScene.events.push(random(sceneManager.opportunity)());
          currentScene.index++;
          break;

        default:
          break;
      }
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

var ImageBox =
/*#__PURE__*/
function (_Box) {
  _inherits(ImageBox, _Box);

  function ImageBox(x, y, w, h, image) {
    var _this;

    var imageWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 128;
    var imageHeight = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 128;

    _classCallCheck(this, ImageBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageBox).call(this, x, y, w, h));
    _this.image = image;
    _this.imageWidth = imageWidth;
    _this.imageHeight = imageHeight * (24 / 16);
    _this.frame = 0;
    return _this;
  }

  _createClass(ImageBox, [{
    key: "show",
    value: function show() {
      rectMode(CENTER);
      fill(255);
      rect(this.x, this.y, this.w, this.h);
      noSmooth();
      imageMode(CENTER);
      image(this.image, this.x, this.y + 10, this.imageWidth, this.imageHeight, 0, 0, 16, 24);
      this.frame++;
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return false;
      console.log('pressed dialogue box');
    }
  }]);

  return ImageBox;
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
    value: function pressed(cb) {
      if (!this.collide()) return; // console.log(this.type)

      if (cb) {
        cb();
      } else {
        sceneManager.next();
      }
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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var StatusBar =
/*#__PURE__*/
function (_Box) {
  _inherits(StatusBar, _Box);

  function StatusBar() {
    var _this;

    _classCallCheck(this, StatusBar);

    var x = width / 2;
    var y = STATUS_BAR_HEIGHT / 2;
    var w = width;
    var h = STATUS_BAR_HEIGHT;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(StatusBar).call(this, x, y, w, h));
    _this.fontSize = 24;
    _this.items = ['', '', '', '', '', ''].map(function (item) {
      return {
        item: item,
        index: 0
      };
    });
    _this.stats = ['', '', '', '', ''].map(function (item) {
      return {
        item: item,
        index: 0
      };
    });
    _this.equipments = [''].map(function (item) {
      return {
        index: 0
      };
    });
    _this.frame = 0;
    return _this;
  }

  _createClass(StatusBar, [{
    key: "updateStatus",
    value: function updateStatus() {
      this.items[0].item = player.name;
      this.items[1].item = 'Level: ' + player.level;
      this.items[2].item = 'HP: ' + player.hp + ' / ' + player.hpMax;
      this.items[3].item = 'MP: ' + player.mp + ' / ' + player.mpMax;
      this.items[4].item = '$: ' + player.money;
      this.items[5].item = 'Material: ' + player.material;
      this.stats[0].item = 'STR: ' + player.baseStr + '(+' + (player.weapon.str + player.armor.str) + ')';
      this.stats[1].item = 'INT: ' + player.baseInt + '(+' + (player.weapon["int"] + player.armor["int"]) + ')';
      this.stats[2].item = 'AGI: ' + player.baseAgi + '(+' + (player.weapon.agi + player.armor.agi) + ')';
      this.stats[3].item = 'ATK: ' + player.baseAttack + '(+' + (player.weapon.attack + player.armor.attack) + ')';
      this.stats[4].item = 'DEF: ' + player.baseDefence + '(+' + (player.weapon.defence + player.armor.defence) + ')';
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      this.updateStatus(); // STATUS_WIDTH / 2 + i * STATUS_WIDTH, STATUS_BAR_HEIGHT / 2, STATUS_WIDTH, STATUS_BAR_HEIGHT, item, 0

      this.items.forEach(function (_ref, i) {
        var item = _ref.item,
            index = _ref.index;
        var x = STATUS_WIDTH / 2 + i * STATUS_WIDTH;
        var y = STATUS_BAR_HEIGHT / 2;
        var w = STATUS_WIDTH;
        var h = STATUS_BAR_HEIGHT;

        _this2.drawBox(x, y, w, h, item, index, i);

        if (i === 1) {
          _this2.createBar(x, y, w, h, 2, player.exp, player.levelExp);
        }

        if (i === 2) {
          _this2.createBar(x, y, w, h, 2, player.hp, player.hpMax);
        }

        if (i === 3) {
          _this2.createBar(x, y, w, h, 2, player.mp, player.mpMax);
        }

        if (_this2.frame % 2 === 0) {
          _this2.items[i].index++;
        }
      });

      if (this.collide()) {
        this.stats.forEach(function (_ref2, i) {
          var item = _ref2.item,
              index = _ref2.index;
          var x = STATUS_WIDTH / 2;
          var y = STATUS_BAR_HEIGHT / 2 + (i + 1) * STATUS_BAR_HEIGHT;
          var w = STATUS_WIDTH;
          var h = STATUS_BAR_HEIGHT;

          _this2.drawBox(x, y, w, h, item, index, i);

          if (_this2.frame % 2 === 0) {
            _this2.stats[i].index++;
          }
        });
        this.createEquipment(STATUS_WIDTH / 2 + STATUS_WIDTH, STATUS_TITLE_HEIGHT / 2 + STATUS_BAR_HEIGHT, STATUS_WIDTH, STATUS_TITLE_HEIGHT, player.weapon, this.equipments[0].index);
        this.createEquipment(STATUS_WIDTH / 2 + STATUS_WIDTH + STATUS_WIDTH, STATUS_TITLE_HEIGHT / 2 + STATUS_BAR_HEIGHT, STATUS_WIDTH, STATUS_TITLE_HEIGHT, player.armor, this.equipments[0].index);

        if (this.frame % 2 === 0) {
          this.equipments[0].index++;
        }
      } else {
        this.stats.forEach(function (_, i) {
          _this2.stats[i].index = 0;
          _this2.equipments[0].index = 0;
        });
      }

      this.frame++; // spriteFont.showFont(this.text, this.x, this.y, this.w, this.h)
    }
  }, {
    key: "createEquipment",
    value: function createEquipment(x, y, w, h, equipment, index) {
      var _this3 = this;

      rectMode(CENTER);
      stroke(0);
      strokeWeight(1);
      fill(255);
      rect(x, y, w, h);
      textLeading(0);
      textAlign(CENTER, CENTER);
      textFont(font);
      textSize(this.fontSize);
      fill(0);
      stroke(0);
      strokeWeight(1);
      var textToShow = equipment.name.split('').slice(0, index).join('');
      text(textToShow, x + this.fontSize / 8, y - this.fontSize / 8, w, h);
      rectMode(CENTER);
      stroke(0);
      strokeWeight(1);
      fill(255);
      rect(x, y + h / 2 + w / 4, w, w / 2);
      noSmooth();
      imageMode(CENTER);
      image(equipment.img, x, y + h / 2 + w / 4, w / 2, w / 2, 0, 0, 16, 16);
      var stats = [];

      if (equipment.attack > 0) {
        stats.push('ATTACK +' + equipment.attack);
      }

      if (equipment.defence > 0) {
        stats.push('DEFENCE +' + equipment.defence);
      }

      if (equipment.str > 0) {
        stats.push('STR +' + equipment.str);
      }

      if (equipment["int"] > 0) {
        stats.push('INT +' + equipment["int"]);
      }

      if (equipment.agi > 0) {
        stats.push('AGI +' + equipment.agi);
      }

      stats.forEach(function (stat, i) {
        stroke(0);
        strokeWeight(1);
        fill(255);
        var textToShow = stat.split('').slice(0, index).join('');
        rect(x, y + w / 4 + w / 2 - h / 2 + i * h, w, h);
        fill(0);
        text(textToShow, x + _this3.fontSize / 8, y - _this3.fontSize / 8 + w / 4 + w / 2 - h / 2 + i * h, w, h);
      });
    }
  }, {
    key: "createBar",
    value: function createBar(x, y, w, h, padding, from, to) {
      w = w - padding * 2;
      h = h - padding * 2;
      var percentage = constrain(from / to || 0, 0, 1);
      var barW = w * percentage;
      var barH = 10;
      var barX = x - w / 2 + barW / 2;
      var barY = y - h / 2 + barH / 2;
      noFill();
      stroke(0);
      strokeWeight(1);
      rect(x, barY, w, barH);
      fill(0);
      noStroke();
      rect(barX, barY, barW, barH);
    }
  }, {
    key: "drawBox",
    value: function drawBox(x, y, w, h, item, index, i) {
      rectMode(CENTER);
      stroke(0);
      strokeWeight(1);
      fill(255);
      rect(x, y, w, h);
      textLeading(0);
      textAlign(CENTER, CENTER);
      textFont(font);
      textSize(this.fontSize);
      fill(0);
      stroke(0);
      strokeWeight(1);
      var textToShow = item.split('').slice(0, index).join('');
      text(textToShow, x + this.fontSize / 8, y - this.fontSize / 8, w, h); // image(
      //     this.image,
      //     this.x,
      //     this.y,
      //     this.currentWidth,
      //     this.currentHeight,
      //     0,
      //     0,
      //     16,
      //     16
      // )

      if (index > item.split('').length) {
        index = item.split('').length;
      }
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (!this.collide()) return false;
      console.log('pressed status bar');
    }
  }]);

  return StatusBar;
}(Box);
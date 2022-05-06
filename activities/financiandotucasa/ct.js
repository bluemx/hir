/*! Made with ct.js http://ctjs.rocks/ */
"file:" === location.protocol &&
  alert(
    "Your game won't work like this because\nWeb 👏 builds 👏 require 👏 a web 👏 server!\n\nConsider using a desktop build, or upload your web build to itch.io, GameJolt or your own website.\n\nIf you haven't created this game, please contact the developer about this issue.\n\n Also note that ct.js games do not work inside the itch app; you will need to open the game with your browser of choice."
  );
const deadPool = [],
  copyTypeSymbol = Symbol("I am a ct.js copy");
setInterval(function () {
  deadPool.length = 0;
}, 6e4);
const ct = {
  speed: 60,
  templates: {},
  snd: {},
  stack: [],
  fps: 60,
  delta: 1,
  deltaUi: 1,
  camera: null,
  version: "2.0.1",
  meta: { name: "Blue Pure Loyalty", author: "", site: "", version: "1.0.0" },
  get width() {
    return ct.pixiApp.renderer.view.width;
  },
  set width(t) {
    return (
      (ct.camera.width = ct.roomWidth = t),
      (ct.fittoscreen && "fastScale" !== ct.fittoscreen.mode) ||
        ct.pixiApp.renderer.resize(t, ct.height),
      ct.fittoscreen && ct.fittoscreen(),
      t
    );
  },
  get height() {
    return ct.pixiApp.renderer.view.height;
  },
  set height(t) {
    return (
      (ct.camera.height = ct.roomHeight = t),
      (ct.fittoscreen && "fastScale" !== ct.fittoscreen.mode) ||
        ct.pixiApp.renderer.resize(ct.width, t),
      ct.fittoscreen && ct.fittoscreen(),
      t
    );
  },
};
console.log(
  `%c 😺 %c ct.js game editor %c v${ct.version} %c https://ctjs.rocks/ `,
  "background: #446adb; color: #fff; padding: 0.5em 0;",
  "background: #5144db; color: #fff; padding: 0.5em 0;",
  "background: #446adb; color: #fff; padding: 0.5em 0;",
  "background: #5144db; color: #fff; padding: 0.5em 0;"
),
  (ct.highDensity = !0);
const pixiAppSettings = {
  width: 544,
  height: 960,
  antialias: !0,
  powerPreference: "high-performance",
  sharedTicker: !1,
  sharedLoader: !0,
};
try {
  ct.pixiApp = new PIXI.Application(pixiAppSettings);
} catch (t) {
  console.error(t),
    console.warn(
      "[ct.js] Something bad has just happened. This is usually due to hardware problems. I'll try to fix them now, but if the game still doesn't run, try including a legacy renderer in the project's settings."
    ),
    (PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
      PIXI.settings.SPRITE_MAX_TEXTURES,
      16
    )),
    (ct.pixiApp = new PIXI.Application(pixiAppSettings));
}
(PIXI.settings.ROUND_PIXELS = !1),
  (ct.pixiApp.ticker.maxFPS = 60),
  ct.pixiApp.renderer.options.antialias ||
    (PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST),
  (ct.stage = ct.pixiApp.stage),
  (ct.pixiApp.renderer.autoDensity = ct.highDensity),
  document.getElementById("ct").appendChild(ct.pixiApp.view),
  (ct.u = {
    getEnvironment() {
      if ("ct.js debugger" === window.name) return "ct.ide";
      try {
        if (nw.require) return "nw";
      } catch (t) {}
      try {
        return require("electron"), "electron";
      } catch (t) {}
      return "browser";
    },
    getOS() {
      const t = window.navigator.userAgent;
      return -1 !== t.indexOf("Windows")
        ? "windows"
        : -1 !== t.indexOf("Linux")
        ? "linux"
        : -1 !== t.indexOf("Mac")
        ? "darwin"
        : "unknown";
    },
    ldx: (t, e) => t * Math.cos((e * Math.PI) / 180),
    ldy: (t, e) => t * Math.sin((e * Math.PI) / 180),
    pdn: (t, e, o, i) =>
      ((180 * Math.atan2(i - e, o - t)) / Math.PI + 360) % 360,
    pdc: (t, e, o, i) => Math.sqrt((o - t) * (o - t) + (i - e) * (i - e)),
    degToRad: (t) => (t * Math.PI) / 180,
    radToDeg: (t) => (t / Math.PI) * 180,
    rotate: (t, e, o) => ct.u.rotateRad(t, e, ct.u.degToRad(o)),
    rotateRad(t, e, o) {
      const i = Math.sin(o),
        s = Math.cos(o);
      return new PIXI.Point(s * t - i * e, s * e + i * t);
    },
    deltaDir(t, e) {
      var o = (e = ((e % 360) + 360) % 360) - (t = ((t % 360) + 360) % 360);
      return o > 180 && (o -= 360), o < -180 && (o += 360), o;
    },
    clamp: (t, e, o) => Math.max(t, Math.min(o, e)),
    lerp: (t, e, o) => t + (e - t) * o,
    unlerp: (t, e, o) => (o - t) / (e - t),
    map: (t, e, o, i, s) => ((t - e) * (s - i)) / (o - e) + i,
    uiToGameCoord: (t, e) => ct.camera.uiToGameCoord(t, e),
    gameToUiCoord: (t, e) => ct.camera.gameToUiCoord(t, e),
    hexToPixi: (t) => Number("0x" + t.slice(1)),
    pixiToHex: (t) => "#" + t.toString(16).padStart(6, 0),
    prect(t, e, o) {
      var i, s, n, a;
      return (
        o.splice
          ? ((i = Math.min(o[0], o[2])),
            (s = Math.max(o[0], o[2])),
            (n = Math.min(o[1], o[3])),
            (a = Math.max(o[1], o[3])))
          : ((i = o.x - o.shape.left * o.scale.x),
            (s = o.x + o.shape.right * o.scale.x),
            (n = o.y - o.shape.top * o.scale.y),
            (a = o.y + o.shape.bottom * o.scale.y)),
        t >= i && e >= n && t <= s && e <= a
      );
    },
    pcircle: (t, e, o) =>
      o.splice
        ? ct.u.pdc(t, e, o[0], o[1]) < o[2]
        : ct.u.pdc(0, 0, (o.x - t) / o.scale.x, (o.y - e) / o.scale.y) <
          o.shape.r,
    ext(t, e, o) {
      if (o) for (const i in o) e[o[i]] && (t[o[i]] = e[o[i]]);
      else for (const o in e) t[o] = e[o];
      return t;
    },
    wait: (t) => ct.timer.add(t),
    waitUi: (t) => ct.timer.addUi(t),
    promisify: (t) =>
      function (...e) {
        return new Promise((o, i) => {
          e.push(function (t, e) {
            t ? i(t) : o(e);
          }),
            t.call(this, ...e);
        });
      },
    required(t, e) {
      let o = "The parameter ";
      throw (
        (t && (o += t + " "),
        e && (o += `of ${e} `),
        (o += "is required."),
        new Error(o))
      );
    },
    numberedString: (t, e) => t + "_" + e.toString().padStart(2, "0"),
    getStringNumber: (t) => Number(t.split("_").pop()),
  }),
  ct.u.ext(ct.u, {
    getOs: ct.u.getOS,
    lengthDirX: ct.u.ldx,
    lengthDirY: ct.u.ldy,
    pointDirection: ct.u.pdn,
    pointDistance: ct.u.pdc,
    pointRectangle: ct.u.prect,
    pointCircle: ct.u.pcircle,
    extend: ct.u.ext,
  }),
  (() => {
    const t = (e) => {
      (e.kill = !0),
        e.onDestroy && (ct.templates.onDestroy.apply(e), e.onDestroy.apply(e));
      for (const o of e.children) o[copyTypeSymbol] && t(o);
      const o = ct.stack.indexOf(e);
      if ((-1 !== o && ct.stack.splice(o, 1), e.template)) {
        const t = ct.templates.list[e.template].indexOf(e);
        -1 !== t && ct.templates.list[e.template].splice(t, 1);
      }
      deadPool.push(e);
    };
    ct.loop = function (e) {
      (ct.delta = e),
        (ct.deltaUi =
          ct.pixiApp.ticker.elapsedMS /
          (1e3 / (ct.pixiApp.ticker.maxFPS || 60))),
        ct.inputs.updateActions(),
        ct.timer.updateTimers(),
        ct.place.debugTraceGraphics.clear();
      for (let t = 0, e = ct.stack.length; t < e; t++)
        ct.templates.beforeStep.apply(ct.stack[t]),
          ct.stack[t].onStep.apply(ct.stack[t]),
          ct.templates.afterStep.apply(ct.stack[t]);
      for (const t of ct.stage.children)
        t instanceof Room &&
          (ct.rooms.beforeStep.apply(t),
          t.onStep.apply(t),
          ct.rooms.afterStep.apply(t));
      for (const e of ct.stack)
        e.kill && !e._destroyed && (t(e), e.destroy({ children: !0 }));
      for (const t of ct.stage.children)
        t.children.sort(
          (t, e) =>
            (t.depth || 0) - (e.depth || 0) || (t.uid || 0) - (e.uid || 0) || 0
        );
      ct.camera && (ct.camera.update(ct.delta), ct.camera.manageStage());
      for (let t = 0, e = ct.stack.length; t < e; t++)
        ct.templates.beforeDraw.apply(ct.stack[t]),
          ct.stack[t].onDraw.apply(ct.stack[t]),
          ct.templates.afterDraw.apply(ct.stack[t]),
          (ct.stack[t].xprev = ct.stack[t].x),
          (ct.stack[t].yprev = ct.stack[t].y);
      for (const t of ct.stage.children)
        t instanceof Room &&
          (ct.rooms.beforeDraw.apply(t),
          t.onDraw.apply(t),
          ct.rooms.afterDraw.apply(t));
      ct.rooms.switching && ct.rooms.forceSwitch();
    };
  })();
class CtAction {
  constructor(t) {
    return (
      (this.name = t),
      (this.methodCodes = []),
      (this.methodMultipliers = []),
      (this.prevValue = 0),
      (this.value = 0),
      this
    );
  }
  methodExists(t) {
    return -1 !== this.methodCodes.indexOf(t);
  }
  addMethod(t, e) {
    if (-1 !== this.methodCodes.indexOf(t))
      throw new Error(
        `[ct.inputs] An attempt to add an already added input "${t}" to an action "${name}".`
      );
    this.methodCodes.push(t), this.methodMultipliers.push(void 0 !== e ? e : 1);
  }
  removeMethod(t) {
    const e = this.methodCodes.indexOf(t);
    -1 !== e &&
      (this.methodCodes.splice(e, 1), this.methodMultipliers.splice(e, 1));
  }
  setMultiplier(t, e) {
    const o = this.methodCodes.indexOf(t);
    -1 !== o
      ? (this.methodMultipliers[o] = e)
      : (console.warning(
          `[ct.inputs] An attempt to change multiplier of a non-existent method "${t}" at event ${this.name}`
        ),
        console.trace());
  }
  update() {
    (this.prevValue = this.value), (this.value = 0);
    for (let t = 0, e = this.methodCodes.length; t < e; t++) {
      const e = ct.inputs.registry[this.methodCodes[t]] || 0;
      this.value += e * this.methodMultipliers[t];
    }
    this.value = Math.max(-1, Math.min(this.value, 1));
  }
  reset() {
    this.prevValue = this.value = 0;
  }
  get pressed() {
    return 0 === this.prevValue && 0 !== this.value;
  }
  get released() {
    return 0 !== this.prevValue && 0 === this.value;
  }
  get down() {
    return 0 !== this.value;
  }
}
(ct.actions = {}),
  (ct.inputs = {
    registry: {},
    addAction(t, e) {
      if (t in ct.actions)
        throw new Error(
          `[ct.inputs] An action "${t}" already exists, can't add a new one with the same name.`
        );
      const o = new CtAction(t);
      for (const t of e) o.addMethod(t.code, t.multiplier);
      return (ct.actions[t] = o), o;
    },
    removeAction(t) {
      delete ct.actions[t];
    },
    updateActions() {
      for (const t in ct.actions) ct.actions[t].update();
    },
  }),
  ct.inputs.addAction("TouchAction", [{ code: "touch.Any" }]),
  ct.inputs.addAction("MoveAction", [
    { code: "keyboard.ArrowLeft", multiplier: -1 },
    { code: "keyboard.ArrowRight" },
  ]);
class Room extends PIXI.Container {
  static getNewId() {
    return this.roomId++, this.roomId;
  }
  constructor(t) {
    if (
      (super(),
      (this.x = this.y = 0),
      (this.uid = Room.getNewId()),
      (this.tileLayers = []),
      (this.backgrounds = []),
      ct.room || (ct.room = ct.rooms.current = this),
      t)
    ) {
      t.extends && ct.u.ext(this, t.extends),
        (this.onCreate = t.onCreate),
        (this.onStep = t.onStep),
        (this.onDraw = t.onDraw),
        (this.onLeave = t.onLeave),
        (this.template = t),
        (this.name = t.name),
        this === ct.room &&
          (ct.pixiApp.renderer.backgroundColor = ct.u.hexToPixi(
            this.template.backgroundColor
          )),
        this === ct.room && (ct.place.tileGrid = {}),
        ct.fittoscreen();
      for (let e = 0, o = t.bgs.length; e < o; e++) {
        const o = new ct.templates.Background(
          t.bgs[e].texture,
          null,
          t.bgs[e].depth,
          t.bgs[e].extends
        );
        this.addChild(o);
      }
      for (let e = 0, o = t.tiles.length; e < o; e++) {
        const o = new Tilemap(t.tiles[e]);
        o.cache(), this.tileLayers.push(o), this.addChild(o);
      }
      for (let e = 0, o = t.objects.length; e < o; e++) {
        const o = t.objects[e].exts || {};
        ct.templates.copyIntoRoom(
          t.objects[e].template,
          t.objects[e].x,
          t.objects[e].y,
          this,
          {
            tx: t.objects[e].tx,
            ty: t.objects[e].ty,
            tr: t.objects[e].tr,
            ...o,
          }
        );
      }
    }
    return this;
  }
  get x() {
    return -this.position.x;
  }
  set x(t) {
    return (this.position.x = -t), t;
  }
  get y() {
    return -this.position.y;
  }
  set y(t) {
    return (this.position.y = -t), t;
  }
}
(Room.roomId = 0),
  (function () {
    var t;
    ct.rooms = {
      templates: {},
      list: {},
      addBg(t, e) {
        const o = new ct.templates.Background(t, null, e);
        return ct.room.addChild(o), o;
      },
      addTileLayer: (t) => ct.tilemaps.create(t),
      clear() {
        (ct.stage.children = []), (ct.stack = []);
        for (const t in ct.templates.list) ct.templates.list[t] = [];
        for (const t in ct.backgrounds.list) ct.backgrounds.list[t] = [];
        ct.rooms.list = {};
        for (const t in ct.rooms.templates) ct.rooms.list[t] = [];
      },
      remove(t) {
        if (!(t instanceof Room)) {
          if ("string" == typeof t)
            throw new Error(
              "[ct.rooms] To remove a room, you should provide a reference to it (to an object), not its name. Provided value:",
              t
            );
          throw new Error(
            "[ct.rooms] An attempt to remove a room that is not actually a room! Provided value:",
            t
          );
        }
        const e = ct.rooms.list[t.name];
        -1 !== e
          ? ct.rooms.list[t.name].splice(e, 1)
          : console.warn(
              "[ct.rooms] Removing a room that was not found in ct.rooms.list. This is strange…"
            ),
          (t.kill = !0),
          ct.stage.removeChild(t);
        for (const e of t.children) e.kill = !0;
        t.onLeave(), ct.rooms.onLeave.apply(t);
      },
      switch(e) {
        ct.rooms.templates[e]
          ? ((t = e), (ct.rooms.switching = !0))
          : console.error('[ct.rooms] The room "' + e + '" does not exist!');
      },
      switching: !1,
      append(t, e) {
        if (!(t in ct.rooms.templates))
          return (
            console.error(
              `[ct.rooms] append failed: the room ${t} does not exist!`
            ),
            !1
          );
        const o = new Room(ct.rooms.templates[t]);
        return (
          e && ct.u.ext(o, e),
          ct.stage.addChild(o),
          o.onCreate(),
          ct.rooms.onCreate.apply(o),
          ct.rooms.list[t].push(o),
          o
        );
      },
      prepend(t, e) {
        if (!(t in ct.rooms.templates))
          return (
            console.error(
              `[ct.rooms] prepend failed: the room ${t} does not exist!`
            ),
            !1
          );
        const o = new Room(ct.rooms.templates[t]);
        return (
          e && ct.u.ext(o, e),
          ct.stage.addChildAt(o, 0),
          o.onCreate(),
          ct.rooms.onCreate.apply(o),
          ct.rooms.list[t].push(o),
          o
        );
      },
      merge(t) {
        if (!(t in ct.rooms.templates))
          return (
            console.error(
              `[ct.rooms] merge failed: the room ${t} does not exist!`
            ),
            !1
          );
        const e = { copies: [], tileLayers: [], backgrounds: [] },
          o = ct.rooms.templates[t],
          i = ct.room;
        for (const t of o.bgs) {
          const o = new ct.templates.Background(
            t.texture,
            null,
            t.depth,
            t.extends
          );
          i.backgrounds.push(o), i.addChild(o), e.backgrounds.push(o);
        }
        for (const t of o.tiles) {
          const o = new Tilemap(t);
          i.tileLayers.push(o), i.addChild(o), e.tileLayers.push(o), o.cache();
        }
        for (const t of o.objects) {
          const o = ct.templates.copyIntoRoom(t.template, t.x, t.y, i, {
            tx: t.tx || 1,
            ty: t.ty || 1,
            tr: t.tr || 0,
          });
          e.copies.push(o);
        }
        return e;
      },
      forceSwitch(e) {
        t && (e = t),
          ct.room &&
            (ct.room.onLeave(),
            ct.rooms.onLeave.apply(ct.room),
            (ct.room = void 0)),
          ct.rooms.clear(),
          (deadPool.length = 0);
        var o = ct.rooms.templates[e];
        (ct.roomWidth = o.width),
          (ct.roomHeight = o.height),
          (ct.camera = new Camera(
            ct.roomWidth / 2,
            ct.roomHeight / 2,
            ct.roomWidth,
            ct.roomHeight
          )),
          o.cameraConstraints &&
            ((ct.camera.minX = o.cameraConstraints.x1),
            (ct.camera.maxX = o.cameraConstraints.x2),
            (ct.camera.minY = o.cameraConstraints.y1),
            (ct.camera.maxY = o.cameraConstraints.y2)),
          ct.pixiApp.renderer.resize(o.width, o.height),
          (ct.rooms.current = ct.room = new Room(o)),
          ct.stage.addChild(ct.room),
          ct.room.onCreate(),
          ct.rooms.onCreate.apply(ct.room),
          ct.rooms.list[e].push(ct.room),
          ct.camera.manageStage(),
          (ct.rooms.switching = !1),
          (t = void 0);
      },
      onCreate() {
        if (this === ct.room) {
          const t = new PIXI.Graphics();
          (t.depth = 1e7),
            ct.room.addChild(t),
            (ct.place.debugTraceGraphics = t);
        }
        for (const t of this.tileLayers)
          -1 !== this.children.indexOf(t) &&
            ct.place.enableTilemapCollisions(t);
      },
      onLeave() {
        this === ct.room && (ct.place.grid = {});
      },
      starting: "01Start",
    };
  })(),
  (ct.room = null),
  (ct.rooms.beforeStep = function () {
    ct.touch.updateGestures();
  }),
  (ct.rooms.afterStep = function () {}),
  (ct.rooms.beforeDraw = function () {}),
  (ct.rooms.afterDraw = function () {
    (ct.mouse.xprev = ct.mouse.x),
      (ct.mouse.yprev = ct.mouse.y),
      (ct.mouse.xuiprev = ct.mouse.xui),
      (ct.mouse.yuiprev = ct.mouse.yui),
      (ct.mouse.pressed = ct.mouse.released = !1),
      (ct.inputs.registry["mouse.Wheel"] = 0);
    for (const t of ct.touch.events)
      (t.xprev = t.x),
        (t.yprev = t.y),
        (t.xuiprev = t.x),
        (t.yuiprev = t.y),
        ct.touch.clearReleased();
    ct.keyboard.clear(),
      ct.sound.follow && !ct.sound.follow.kill
        ? ct.sound.howler.pos(
            ct.sound.follow.x,
            ct.sound.follow.y,
            ct.sound.useDepth ? ct.sound.follow.z : 0
          )
        : ct.sound.manageListenerPosition &&
          ct.sound.howler.pos(ct.camera.x, ct.camera.y, ct.camera.z || 0);
  }),
  (ct.rooms.templates.Game = {
    name: "Game",
    width: 544,
    height: 960,
    objects: JSON.parse(
      '[{"x":288,"y":64,"exts":{},"template":"timer"},{"x":0,"y":224,"exts":{},"template":"linea"},{"x":0,"y":448,"exts":{},"template":"linea"},{"x":0,"y":672,"exts":{},"template":"linea"}]'
    ),
    bgs: JSON.parse(
      '[{"depth":-1,"texture":"bottom","extends":{"repeat":"no-repeat","shiftY":794,"scaleX":0.98,"scaleY":0.98,"shiftX":6}},{"depth":0,"texture":"thehomedepot","extends":{"repeat":"no-repeat","scaleX":0.8,"scaleY":0.8,"shiftX":34,"shiftY":10}},{"depth":3,"texture":"linea-cubierta","extends":{"repeat":"no-repeat","shiftX":502,"scaleY":0.9,"shiftY":564}},{"depth":3,"texture":"linea-cubierta","extends":{"repeat":"no-repeat","shiftX":502,"scaleY":0.9,"shiftY":338}},{"depth":3,"texture":"linea-cubierta","extends":{"repeat":"no-repeat","shiftX":502,"shiftY":114,"scaleY":0.9}}]'
    ),
    tiles: JSON.parse('[{"depth":-10,"tiles":[],"extends":{}}]'),
    backgroundColor: "#F5750D",
    onStep() {},
    onDraw() {
      this.scoreLabel.text = ct.room.score;
    },
    onLeave() {},
    onCreate() {
      (ct.room.dropsColors = ["blue", "green", "pink", "orange"]),
        (ct.room.colLen = ct.room.dropsColors.length - 1),
        (ct.room.paused = !1),
        (ct.room.score = 0),
        (this.scoreLabel = new PIXI.Text(
          ct.room.score,
          ct.styles.get("boldScore")
        )),
        this.scoreLabel.anchor.set(0.5, 0.5),
        (this.scoreLabel.x = ct.viewWidth - 86),
        (this.scoreLabel.y = 50),
        this.addChild(this.scoreLabel),
        (this.scoreLabelTXT = new PIXI.Text(
          "puntos",
          ct.styles.get("boldScore_txt")
        )),
        (this.scoreLabelTXT.x = ct.viewWidth - 130),
        (this.scoreLabelTXT.y = 70),
        this.addChild(this.scoreLabelTXT);
      var t = new PIXI.Graphics();
      t.beginFill(16777215),
        t.drawRect(0, 6, ct.viewWidth, 110),
        t.endFill(),
        (t.depth = -1),
        this.addChild(t);
      var e = ["t1", "t2", "t3", "t4", "t5"],
        o = ct.viewHeight - 100;
      for (var i in e) {
        var s = ct.types.copy("tools", 66 + 100 * i, o);
        (s.scale.x = s.scale.y = 0.6), s.gotoAndStop(i);
      }
      (ct.room.GameOverFN = function () {
        console.warn("---------------"),
          console.log("GAME OVER"),
          (ct.room.gameover = !0),
          ct.u.wait(1e3).then(() => {
            ct.rooms.merge("GameOver"),
              ct.sound.spawn("end"),
              (this.scoreLabelEnd = new PIXI.Text(
                ct.room.score,
                ct.styles.get("boldScore_BIG")
              )),
              this.scoreLabelEnd.anchor.set(0.5, 0.5),
              (this.scoreLabelTXTEnd = new PIXI.Text(
                "puntos",
                ct.styles.get("boldScore_txt_BIG")
              )),
              this.scoreLabelTXTEnd.anchor.set(0.5, 0.5),
              (this.scoreLabelEnd.depth = 11),
              (this.scoreLabelTXTEnd.depth = 11),
              (this.scoreLabelEnd.x = ct.viewWidth / 2),
              (this.scoreLabelEnd.y = ct.viewHeight / 2 - 60),
              (this.scoreLabelTXTEnd.x = ct.viewWidth / 2),
              (this.scoreLabelTXTEnd.y = ct.viewHeight / 2),
              this.addChild(this.scoreLabelEnd),
              this.addChild(this.scoreLabelTXTEnd);
            var t = { score: ct.room.score, points: this.pointsList };
            window.parent.postMessage(JSON.stringify(t), "*");
          });
      }),
        (this.pointsList = {
          taladro: 0,
          martillo: 0,
          llaves: 0,
          inglesa: 0,
          pinzas: 0,
          especiales: 0,
          values: [
            ["taladro", 19],
            ["martillo", 47],
            ["llaves", 79],
            ["inglesa", 97],
            ["pinzas", 149],
            ["especiales", "valor*3"],
          ],
        }),
        (this.addPoints = function (t, e, o, i) {
          var s = e,
            n = o,
            a = t;
          (this.pointsList[i] += a),
            (ct.types.copy("points", s, n).pointLabel.text = "+" + a),
            (ct.room.score += a);
        });
    },
    extends: {},
  }),
  (ct.rooms.templates["01Start"] = {
    name: "01Start",
    width: 544,
    height: 960,
    objects: JSON.parse(
      '[{"x":64,"y":832,"exts":{},"template":"btn_back_exit"},{"x":256,"y":832,"exts":{},"template":"btn_siguiente"},{"x":224,"y":540,"exts":{},"template":"alcanciaNoFN"},{"x":120,"y":400,"exts":{"type":0},"template":"coinNoFN"},{"x":300,"y":400,"exts":{"type":0},"template":"coinNoFN"},{"x":440,"y":400,"exts":{"type":1},"template":"coinNoFN"},{"x":120,"y":248,"exts":{"type":1,"fix":true},"template":"coinNoFN"},{"x":136,"y":305,"exts":{"type":0,"fix":true},"template":"coinNoFN"}]'
    ),
    bgs: JSON.parse(
      '[{"depth":-2,"texture":"Clouds","extends":{"movementX":0.1}},{"depth":-1,"texture":"Floor","extends":{"repeat":"no-repeat","shiftX":-1,"scaleX":1.1,"scaleY":1.1,"shiftY":812}},{"depth":1,"texture":"Inst","extends":{"repeat":"no-repeat","shiftX":124,"shiftY":676}}]'
    ),
    tiles: JSON.parse('[{"depth":-10,"tiles":[],"extends":{}}]'),
    backgroundColor: "#FFFFFF",
    onStep() {},
    onDraw() {},
    onLeave() {},
    onCreate() {
      loadfonts(),
        (this.title = new PIXI.Text("Financiando \ntu Casa", ct.MainFontBold)),
        this.title.anchor.set(0.5, 0.5),
        (this.title.x = ct.camera.width / 2),
        (this.title.y = 80),
        (this.subtitle = new PIXI.Text("¿Cómo jugar?", ct.MainFontBoldSM)),
        this.subtitle.anchor.set(0.5, 0.5),
        (this.subtitle.x = ct.camera.width / 2),
        (this.subtitle.y = 160),
        (this.description = new PIXI.Text(
          "Atrapa la mayor cantidad de monedas que puedas con la alcancía.",
          ct.MainFontSM
        )),
        this.description.anchor.set(0.5, 0.5),
        (this.description.x = ct.camera.width / 2),
        (this.description.y = 190),
        (this.values = new PIXI.Text(
          "Pago Anticipado = 200 Puntos \n\n\nPago Puntual = 100 Puntos",
          ct.MainFontSM
        )),
        this.values.anchor.set(0.5, 0.5),
        (this.values.x = ct.camera.width / 2 + 40),
        (this.values.align = "left"),
        (this.values.y = 280),
        (this.description2 = new PIXI.Text(
          "Para desplazar la alcancía de un lado a otro:",
          ct.MainFontSM
        )),
        this.description2.anchor.set(0.5, 0.5),
        (this.description2.x = ct.camera.width / 2),
        (this.description2.y = 640),
        this.addChild(
          this.title,
          this.description,
          this.description2,
          this.values
        );
    },
    extends: { isUi: !0 },
  }),
  (ct.rooms.templates["05Paused"] = {
    name: "05Paused",
    width: 544,
    height: 960,
    objects: JSON.parse("[]"),
    bgs: JSON.parse(
      '[{"depth":0,"texture":"pausedbg","extends":{"repeat":"no-repeat"}}]'
    ),
    tiles: JSON.parse('[{"depth":-10,"tiles":[],"extends":{}}]'),
    backgroundColor: "#FFFFFF",
    onStep() {},
    onDraw() {},
    onLeave() {},
    onCreate() {
      (this.pausedLabel = new PIXI.Text(
        "Juego Pausado",
        ct.styles.get("boldScore")
      )),
        this.pausedLabel.anchor.set(0.5, 0.5),
        (this.pausedLabel.x = ct.viewWidth / 2),
        (this.pausedLabel.y = 140),
        this.addChild(this.pausedLabel);
    },
    extends: { isUi: !0 },
  }),
  (ct.rooms.templates["02Start"] = {
    name: "02Start",
    width: 544,
    height: 960,
    objects: JSON.parse(
      '[{"x":64,"y":832,"exts":{},"template":"btn_back"},{"x":256,"y":832,"exts":{},"template":"btn_comenzar"},{"x":96,"y":384,"exts":{"type":2},"template":"coinNoFN"},{"x":256,"y":352,"exts":{"type":2},"template":"coinNoFN"},{"x":352,"y":416,"exts":{"type":2},"template":"coinNoFN"},{"x":448,"y":352,"exts":{"type":2},"template":"coinNoFN"},{"x":80,"y":660,"exts":{},"template":"coinNoFN"},{"x":160,"y":760,"exts":{},"template":"coinNoFN"},{"x":288,"y":640,"exts":{},"template":"coinNoFN"},{"x":320,"y":736,"exts":{},"template":"coinNoFN"},{"x":448,"y":768,"exts":{"type":0},"template":"coinNoFN"},{"x":480,"y":672,"exts":{},"template":"coinNoFN"},{"x":170,"y":618,"exts":{},"template":"coinNoFN"},{"x":397,"y":648,"exts":{"type":1},"template":"coinNoFN"}]'
    ),
    bgs: JSON.parse(
      '[{"depth":-2,"texture":"Clouds","extends":{"movementX":0.1}},{"depth":-1,"texture":"Floor","extends":{"repeat":"no-repeat","shiftX":-1,"scaleX":1.1,"scaleY":1.1,"shiftY":812}},{"depth":0,"texture":"1minuto","extends":{"repeat":"no-repeat","shiftX":49.4,"shiftY":32}}]'
    ),
    tiles: JSON.parse('[{"depth":-10,"tiles":[],"extends":{}}]'),
    backgroundColor: "#FFFFFF",
    onStep() {},
    onDraw() {},
    onLeave() {},
    onCreate() {
      loadfonts(),
        (this.title = new PIXI.Text(
          "¡Evita la monedas rojas!, son Pagos No Puntuales",
          ct.MainFontBoldSM
        )),
        this.title.anchor.set(0.5, 0.5),
        (this.title.x = ct.camera.width / 2),
        (this.title.y = 270),
        (this.description = new PIXI.Text(
          "Entre más Pagos Anticipados y Pagos Puntuales acumules más puntos conseguirás.",
          ct.MainFontSM
        )),
        this.description.anchor.set(0.5, 0.5),
        (this.description.x = ct.camera.width / 2),
        (this.description.y = 520),
        this.addChild(this.title, this.description);
    },
    extends: { isUi: !0 },
  }),
  (ct.rooms.templates["03Game"] = {
    name: "03Game",
    width: 544,
    height: 960,
    objects: JSON.parse('[{"x":271,"y":877,"exts":{},"template":"alcancia"}]'),
    bgs: JSON.parse(
      '[{"depth":-2,"texture":"Clouds","extends":{"movementX":0.1}},{"depth":-1,"texture":"Floor","extends":{"repeat":"no-repeat","shiftX":-1,"scaleX":1.1,"scaleY":1.1,"shiftY":772}}]'
    ),
    tiles: JSON.parse('[{"depth":-10,"tiles":[],"extends":{}}]'),
    backgroundColor: "#FFFFFF",
    onStep() {
      this.counterBarTime.width = 82 - 82 / (60 / this.countdown);
    },
    onDraw() {
      (this.countdownTxt.text = this.countText),
        this.scoreAnim < ct.score
          ? (this.scoreAnim += 10)
          : this.scoreAnim > ct.score && (this.scoreAnim -= 10),
        (this.scoreTxt.text = Math.round(this.scoreAnim));
    },
    onLeave() {},
    onCreate() { //########################################speed : 1e3
      loadfonts(), (this.timerSpeed = 1e3); 
      var t = new PIXI.Graphics();
      t.beginFill(15965204),
        t.drawRoundedRect(6, 6, ct.camera.width - 12, 80, 10),
        t.endFill(),
        this.addChild(t),
        (ct.score = 0),
        (ct.points = {'anticipado':0, 'puntual':0, 'nopago': 0}),
        (this.scoreAnim = ct.score),
        (this.scoreTxt = new PIXI.Text(this.scoreAnim, ct.MainFontBoldLG)),
        (this.scoreTxt.x = ct.camera.width - 16),
        (this.scoreTxt.y = -2),
        this.scoreTxt.anchor.set(1, 0),
        this.addChild(this.scoreTxt),
        (this.puntosTxt = new PIXI.Text("puntos", ct.MainFontSM)),
        (this.puntosTxt.x = ct.camera.width - 90),
        (this.puntosTxt.y = 60),
        this.addChild(this.puntosTxt),
        (this.countText = "1:00"),
        (this.countdownTxt = new PIXI.Text(this.countText, ct.MainFontBoldMD)),
        (this.countdownTxt.x = 20),
        (this.countdownTxt.y = 8),
        this.addChild(this.countdownTxt);
      var e = new PIXI.Graphics();
      e.beginFill(4796389),
        e.drawRoundedRect(20, 60, 90, 18, 6),
        e.endFill(),
        this.addChild(e),
        (this.counterBarTime = new PIXI.Graphics()),
        this.counterBarTime.beginFill(16777215),
        this.counterBarTime.drawRoundedRect(0, 64, 82, 10, 4),
        this.counterBarTime.endFill(),
        (this.counterBarTime.x = 24),
        this.addChild(this.counterBarTime),
        (this.countdown = 60);
      var o = setInterval(() => {
          this.countdown--;
          var t = "0:" + this.countdown;
          this.countdown < 10 && (t = "0:0" + this.countdown),
            (this.countText = t),
            0 == this.countdown &&
              (clearInterval(o),
              clearInterval(i),
              (ct.pixiApp.ticker.speed = 0),
              setTimeout(() => {
                ct.rooms.switch("04End");
              }, 250));
        }, this.timerSpeed),
        i = setInterval(() => {
          var t = ct.templates.copy(
            "coin",
            Math.random() * (ct.camera.width - 100) + 50,
            100
          );
          (t.speed = 4),
            (t.direction = 90),
            t.y > ct.camera.height && (t.kill = !0);
        }, 500);
      this.setScore = function (t) {
        ct.sound.spawn("coin"+(t.type+1));
        var e = 0,
          o = t.type;
          0 == o && (e = 100),
          1 == o && (e += 200),
          2 == o && (e = ct.score > 300 ? -300 : ct.score),
          (ct.score += e),
          (ct.templates.copy("points", t.x, t.y).pointLabel.text = e);
      };
    },
    extends: { isUi: !0 },
  }),
  (ct.rooms.templates["04End"] = {
    name: "04End",
    width: 544,
    height: 960,
    objects: JSON.parse("[]"),
    bgs: JSON.parse(
      '[{"depth":-2,"texture":"Clouds","extends":{"movementX":0.1}}]'
    ),
    tiles: JSON.parse('[{"depth":-10,"tiles":[],"extends":{}}]'),
    backgroundColor: "#FFFFFF",
    onStep() {},
    onDraw() {},
    onLeave() {},
    onCreate() {
      loadfonts(),
        (ct.pixiApp.ticker.speed = 0),
        (this.title = new PIXI.Text("¡Felicidades!", ct.MainFontBold)),
        this.title.anchor.set(0.5, 0.5),
        (this.title.x = ct.camera.width / 2),
        (this.title.y = 70);
      var t = new PIXI.Graphics();
      t.beginFill(15965204),
        t.drawRoundedRect(30, 180, ct.camera.width - 60, 200, 20),
        t.endFill(),
        this.addChild(t),
        (this.obtu = new PIXI.Text("Obtuviste", ct.MainFont)),
        this.obtu.anchor.set(0.5, 0.5),
        (this.obtu.x = ct.camera.width / 2),
        (this.obtu.y = 160),
        (this.puntaje = new PIXI.Text(ct.score || "0", ct.MainFontBold2)),
        this.puntaje.anchor.set(0.5, 0.5),
        (this.puntaje.x = ct.camera.width / 2),
        (this.puntaje.y = 260),
        (this.puntos = new PIXI.Text("puntos", ct.MainFontBoldMD)),
        this.puntos.anchor.set(0.5, 0.5),
        (this.puntos.x = ct.camera.width / 2),
        (this.puntos.y = 320);
      var e = new PIXI.Graphics();
      e.beginFill(4796389),
        e.drawRoundedRect(10, 400, ct.camera.width - 20, 140, 20),
        e.endFill(),
        this.addChild(e),
        (this.description = new PIXI.Text(
          "Si tu puntaje resulta ser el más alto de la semana, recibirás un correo electrónico y/o SMS con tu número de certificado de regalo.",
          ct.MainFontMD
        )),
        this.description.anchor.set(0.5, 0.5),
        (this.description.x = ct.camera.width / 2),
        (this.description.y = 470),
        (this.felici = new PIXI.Text(
          "¡Gracias por participar!",
          ct.MainFontBoldXL
        )),
        this.felici.anchor.set(0.5, 0.5),
        (this.felici.x = ct.camera.width / 2),
        (this.felici.y = 630),
        this.addChild(
          this.title,
          this.puntaje,
          this.description,
          this.puntos,
          this.felici,
          this.obtu
        );
        var t = { score: ct.score, points: ct.points };
        console.log('ENDING', t)
        window.postMessage(JSON.stringify(t), "*");
        window.parent.postMessage(JSON.stringify(t), "*");
    },
    extends: { isUi: !0 },
  }),
  (ct.styles = {
    types: {},
    new: (t, e) => ((ct.styles.types[t] = e), e),
    get: (t, e) =>
      !0 === e
        ? ct.u.ext({}, ct.styles.types[t])
        : e
        ? ct.u.ext(ct.u.ext({}, ct.styles.types[t]), e)
        : ct.styles.types[t],
  }),
  ct.styles.new("regular", {
    fontFamily: '"CTPROJFONTOpenSans-Regular", "OpenSans-Regular", sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineJoin: "round",
    lineHeight: 16.200000000000003,
  }),
  ct.styles.new("boldScore", {
    fontFamily:
      '"CTPROJFONTOpenSans-ExtraBold", "OpenSans-ExtraBold", sans-serif',
    fontSize: 46,
    fontStyle: "normal",
    fontWeight: 400,
    align: "center",
    lineJoin: "round",
    lineHeight: 62.1,
    fill: "#F4750D",
  }),
  ct.styles.new("boldScore_txt", {
    fontFamily:
      '"CTPROJFONTOpenSans-ExtraBold", "OpenSans-ExtraBold", sans-serif',
    fontSize: 26,
    fontStyle: "normal",
    fontWeight: 400,
    align: "center",
    lineJoin: "round",
    lineHeight: 35.1,
    fill: "#808080",
  }),
  ct.styles.new("points", {
    fontFamily:
      '"CTPROJFONTOpenSans-ExtraBold", "OpenSans-ExtraBold", sans-serif',
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 400,
    align: "center",
    lineJoin: "round",
    lineHeight: 27,
    fill: ["#D6D6D6", "#C4BEB9"],
    fillGradientType: 0,
    strokeThickness: 4,
    stroke: "#FFFFFF",
  }),
  ct.styles.new("boldScore_BIG", {
    fontFamily:
      '"CTPROJFONTOpenSans-ExtraBold", "OpenSans-ExtraBold", sans-serif',
    fontSize: 94,
    fontStyle: "normal",
    fontWeight: 400,
    align: "center",
    lineJoin: "round",
    lineHeight: 126.9,
    fill: "#F4750D",
  }),
  ct.styles.new("boldScore_txt_BIG", {
    fontFamily:
      '"CTPROJFONTOpenSans-ExtraBold", "OpenSans-ExtraBold", sans-serif',
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: 400,
    align: "center",
    lineJoin: "round",
    lineHeight: 54,
    fill: "#808080",
  }),
  ct.styles.new("Style_R5G4rr", {
    fontFamily: "sans-serif",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineJoin: "round",
    lineHeight: 16.200000000000003,
  }),
  ct.styles.new("titleFont", {
    fontFamily: '"CTPROJFONTMuli-Bold", "Muli-Bold", sans-serif',
    fontSize: 48,
    fontStyle: "normal",
    fontWeight: "400",
    align: "center",
    lineJoin: "round",
    lineHeight: 64.80000000000001,
    fill: "#F39C14",
  }),
  ct.styles.new("subtitleFont", {
    fontFamily: '"CTPROJFONTMuli", "Muli", sans-serif',
    fontSize: 26,
    fontStyle: "normal",
    fontWeight: "400",
    align: "center",
    lineJoin: "round",
    lineHeight: 35.1,
    fill: "#F39C14",
  }),
  ct.styles.new("regularFont", {
    fontFamily: '"CTPROJFONTMuli", "Muli", sans-serif',
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
    align: "center",
    lineJoin: "round",
    lineHeight: 27,
    fill: "#000000",
  }),
  ct.styles.new("captionFont", {
    fontFamily: '"CTPROJFONTMuli", "Muli", sans-serif',
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    align: "center",
    lineJoin: "round",
    lineHeight: 21.6,
    fill: "#F39C14",
  }),
  ct.styles.new("captionGrayFont", {
    fontFamily: '"CTPROJFONTMuli", "Muli", sans-serif',
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    align: "center",
    lineJoin: "round",
    lineHeight: 21.6,
    fill: "#7F7F7F",
  }),
  ct.styles.new("MainFont", {
    fontFamily: '"CTPROJFONTMuli", "Muli", sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineJoin: "round",
    lineHeight: 16.200000000000003,
  }),
  ct.styles.new("MainFontBold", {
    fontFamily: '"CTPROJFONTMuli-Bold", "Muli-Bold", sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineJoin: "round",
    lineHeight: 16.200000000000003,
  });
class EmitterTandem extends PIXI.Container {
  constructor(t, e) {
    super(), (this.emitters = []), (this.delayed = []);
    for (const o of t) {
      const t = new PIXI.particles.Emitter(
          this,
          ct.res.getTexture(o.texture),
          o.settings
        ),
        i = o.settings.delay + e.prewarmDelay;
      i > 0
        ? ((t.emit = !1), this.delayed.push({ value: i, emitter: t }))
        : i < 0
        ? ((t.emit = !0), t.update(-i))
        : (t.emit = !0),
        (t.initialDeltaPos = { x: o.settings.pos.x, y: o.settings.pos.y }),
        this.emitters.push(t),
        t.playOnce(() => {
          this.emitters.splice(this.emitters.indexOf(t), 1);
        });
    }
    (this.isUi = e.isUi),
      (this.scale.x = e.scale.x),
      (this.scale.y = e.scale.y),
      e.rotation
        ? (this.rotation = e.rotation)
        : e.angle && (this.angle = e.angle),
      (this.deltaPosition = e.position),
      (this.depth = e.depth),
      (this.frozen = !1),
      this.isUi
        ? ct.emitters.uiTandems.push(this)
        : ct.emitters.tandems.push(this);
  }
  update() {
    if (this.stopped)
      for (const t of this.emitters)
        t.particleCount || this.emitters.splice(this.emitters.indexOf(t), 1);
    if (
      (this.appendant && this.appendant._destroyed) ||
      this.kill ||
      !this.emitters.length
    )
      return (
        this.emit("done"),
        this.isUi
          ? ct.emitters.uiTandems.splice(ct.emitters.uiTandems.indexOf(this), 1)
          : ct.emitters.tandems.splice(ct.emitters.tandems.indexOf(this), 1),
        void this.destroy()
      );
    if (this.frozen) return;
    const t =
      (this.isUi ? PIXI.Ticker.shared.elapsedMS : PIXI.Ticker.shared.deltaMS) /
      1e3;
    for (const e of this.delayed)
      (e.value -= t),
        e.value <= 0 &&
          ((e.emitter.emit = !0),
          this.delayed.splice(this.delayed.indexOf(e), 1));
    for (const e of this.emitters)
      this.delayed.find((t) => t.emitter === e) || e.update(t);
    this.follow && this.updateFollow();
  }
  stop() {
    if (this.stopped)
      console.trace(
        "[ct.emitters] An attempt to stop an already stopped emitter tandem. Continuing…"
      );
    else {
      this.stopped = !0;
      for (const t of this.emitters) t.emit = !1;
      this.delayed = [];
    }
  }
  pause() {
    for (const t of this.emitters)
      0 !== t.maxParticles &&
        ((t.oldMaxParticles = t.maxParticles), (t.maxParticles = 0));
  }
  resume() {
    for (const t of this.emitters)
      t.maxParticles = t.oldMaxParticles || t.maxParticles;
  }
  clear() {
    for (const t of this.emitters) t.cleanup();
  }
  updateFollow() {
    if (!this.follow) return;
    if (this.follow.kill || !this.follow.scale)
      return (this.follow = null), void this.stop();
    const t = ct.u.rotate(
      this.deltaPosition.x * this.follow.scale.x,
      this.deltaPosition.y * this.follow.scale.y,
      -this.follow.angle
    );
    for (const e of this.emitters) {
      e.updateOwnerPos(this.follow.x + t.x, this.follow.y + t.y);
      const o = ct.u.rotate(
        e.initialDeltaPos.x * this.follow.scale.x,
        e.initialDeltaPos.y * this.follow.scale.y,
        -this.follow.angle
      );
      e.updateSpawnPos(o.x, o.y);
    }
  }
}
!(function () {
  const t = {
    prewarmDelay: 0,
    scale: { x: 1, y: 1 },
    tint: 16777215,
    alpha: 1,
    position: { x: 0, y: 0 },
    isUi: !1,
    depth: 1 / 0,
  };
  (ct.emitters = {
    templates:
      {
        killSillo: [
          {
            texture: "nut",
            settings: {
              alpha: {
                list: [
                  { value: 0, time: 0 },
                  { value: 0.9899997016817748, time: 0.46431484137267437 },
                  { time: 0.9040240185589155, value: 1 },
                  { value: 0, time: 1 },
                ],
                isStepped: !1,
              },
              scale: {
                list: [
                  { value: 1, time: 0 },
                  { value: 0.3, time: 1 },
                ],
                isStepped: !1,
              },
              color: {
                list: [
                  { value: "ffffff", time: 0 },
                  { value: "ffffff", time: 0.46431484137267437 },
                  { time: 0.9040240185589155, value: "FFFFFF" },
                  { value: "ffffff", time: 1 },
                ],
                isStepped: !1,
              },
              blendMode: "normal",
              speed: {
                list: [
                  { value: 162.48993175989654, time: 0 },
                  { value: 100, time: 1 },
                ],
                isStepped: !1,
              },
              startRotation: { min: -90, max: 90 },
              rotationSpeed: { min: 0, max: 0 },
              rotationAcceleration: 0,
              lifetime: { min: 0.5, max: 0.5 },
              frequency: 10,
              spawnChance: 1,
              particlesPerWave: 10,
              angleStart: 270,
              emitterLifetime: 0,
              maxParticles: 10,
              maxSpeed: 0,
              pos: { x: 0, y: 0 },
              acceleration: { x: 0, y: 0 },
              addAtBack: !1,
              spawnType: "circle",
              spawnCircle: { x: 0, y: 0, r: 20, minR: 100 },
              delay: 0,
              particleSpacing: 36,
              spawnRect: { x: -100, y: -100, w: 200, h: 200 },
              noRotation: !1,
            },
          },
        ],
        goldtool: [
          {
            texture: "nut",
            settings: {
              alpha: {
                list: [
                  { value: 0, time: 0 },
                  { value: 1, time: 0.2343438191076871 },
                  { time: 0.5511374499109174, value: 0.7799934369990438 },
                  { time: 0.848513771805298, value: 0.9450266994811629 },
                  { value: 0, time: 1 },
                ],
                isStepped: !1,
              },
              scale: {
                list: [
                  { value: 1, time: 0 },
                  { value: 0.3, time: 1 },
                ],
                isStepped: !1,
              },
              color: {
                list: [
                  { value: "FF7E33", time: 0 },
                  { value: "FFE600", time: 0.2343438191076871 },
                  { time: 0.5511374499109174, value: "FF0000" },
                  { time: 0.848513771805298, value: "FFD900" },
                  { value: "ffffff", time: 1 },
                ],
                isStepped: !0,
              },
              blendMode: "add",
              speed: {
                list: [
                  { value: 162.48993175989654, time: 0 },
                  { value: 100, time: 1 },
                ],
                isStepped: !1,
              },
              startRotation: { min: -90, max: 90 },
              rotationSpeed: { min: 0, max: 0 },
              rotationAcceleration: 0,
              lifetime: { min: 0.5, max: 0.5 },
              frequency: 0.1,
              spawnChance: 1,
              particlesPerWave: 1,
              angleStart: 270,
              emitterLifetime: 0,
              maxParticles: 100,
              maxSpeed: 0,
              pos: { x: 0, y: 0 },
              acceleration: { x: 0, y: 0 },
              addAtBack: !1,
              spawnType: "ring",
              spawnCircle: { x: 0, y: 0, r: 80, minR: 60 },
              delay: 0,
              particleSpacing: 360,
              spawnRect: { x: -100, y: -100, w: 200, h: 200 },
              noRotation: !1,
            },
          },
        ],
      } || {},
    uiTandems: [],
    tandems: [],
    fire(e, o, i, s) {
      if (!(e in ct.emitters.templates))
        throw new Error(
          `[ct.emitters] An attempt to create a non-existent emitter ${e}.`
        );
      const n = Object.assign({}, t, s),
        a = new EmitterTandem(ct.emitters.templates[e], n);
      return (
        (a.x = o),
        (a.y = i),
        n.room
          ? (n.room.addChild(a), (a.isUi = n.room.isUi))
          : (ct.room.addChild(a), (a.isUi = ct.room.isUi)),
        a
      );
    },
    append(e, o, i) {
      if (!(o in ct.emitters.templates))
        throw new Error(
          `[ct.emitters] An attempt to create a non-existent emitter ${o}.`
        );
      const s = Object.assign({}, t, i),
        n = new EmitterTandem(ct.emitters.templates[o], s);
      return (
        s.position && ((n.x = s.position.x), (n.y = s.position.y)),
        (n.appendant = e),
        e.addChild(n),
        n
      );
    },
    follow(e, o, i) {
      if (!(o in ct.emitters.templates))
        throw new Error(
          `[ct.emitters] An attempt to create a non-existent emitter ${o}.`
        );
      const s = Object.assign({}, t, i),
        n = new EmitterTandem(ct.emitters.templates[o], s);
      return (
        (n.follow = e),
        n.updateFollow(),
        "getRoom" in e ? e.getRoom().addChild(n) : ct.room.addChild(n),
        n
      );
    },
  }),
    PIXI.Ticker.shared.add(() => {
      for (const t of ct.emitters.uiTandems) t.update();
      for (const t of ct.emitters.tandems) t.update();
    });
})();
const Copy = (function () {
  const t = Symbol("texture"),
    e = Symbol("zeroDirection"),
    o = Symbol("hspeed"),
    i = Symbol("vspeed");
  let s = 0;
  class n extends PIXI.AnimatedSprite {
    constructor(n, a, r, c, l) {
      var h;
      if (((l = l || ct.room), n)) {
        if (!(n in ct.templates.templates))
          throw new Error(
            `[ct.templates] An attempt to create a copy of a non-existent template \`${n}\` detected. A typo?`
          );
        if ((h = ct.templates.templates[n]).texture && "-1" !== h.texture) {
          const e = ct.res.getTexture(h.texture);
          super(e),
            (this[t] = h.texture),
            (this.anchor.x = e[0].defaultAnchor.x),
            (this.anchor.y = e[0].defaultAnchor.y);
        } else super([PIXI.Texture.EMPTY]);
        (this.template = n),
          (this.parent = l),
          (this.blendMode = h.blendMode || PIXI.BLEND_MODES.NORMAL),
          h.playAnimationOnStart && this.play(),
          h.extends && ct.u.ext(this, h.extends);
      } else super([PIXI.Texture.EMPTY]);
      return (
        (this[copyTypeSymbol] = !0),
        this.position.set(a || 0, r || 0),
        (this.xprev = this.xstart = this.x),
        (this.yprev = this.ystart = this.y),
        (this[o] = 0),
        (this[i] = 0),
        (this[e] = 0),
        (this.speed = this.direction = this.gravity = 0),
        (this.gravityDir = 90),
        (this.depth = 0),
        c &&
          (ct.u.ext(this, c),
          c.tx && (this.scale.x = c.tx),
          c.ty && (this.scale.y = c.ty),
          c.tr && (this.angle = c.tr)),
        (this.uid = ++s),
        n &&
          (ct.u.ext(this, {
            template: n,
            depth: h.depth,
            onStep: h.onStep,
            onDraw: h.onDraw,
            onCreate: h.onCreate,
            onDestroy: h.onDestroy,
            shape: ct.res.getTextureShape(h.texture || -1),
          }),
          c && void 0 !== c.depth && (this.depth = c.depth),
          ct.templates.list[n]
            ? ct.templates.list[n].push(this)
            : (ct.templates.list[n] = [this]),
          this.onBeforeCreateModifier(),
          ct.templates.templates[n].onCreate.apply(this)),
        this
      );
    }
    set tex(e) {
      if (this[t] === e) return e;
      var { playing: o } = this;
      return (
        (this.textures = ct.res.getTexture(e)),
        (this[t] = e),
        (this.shape = ct.res.getTextureShape(e)),
        (this.anchor.x = this.textures[0].defaultAnchor.x),
        (this.anchor.y = this.textures[0].defaultAnchor.y),
        o && this.play(),
        e
      );
    }
    get tex() {
      return this[t];
    }
    get speed() {
      return Math.hypot(this.hspeed, this.vspeed);
    }
    set speed(t) {
      if (0 === t)
        return (this[e] = this.direction), void (this.hspeed = this.vspeed = 0);
      if (0 !== this.speed) {
        var o = t / this.speed;
        (this.hspeed *= o), (this.vspeed *= o);
      } else this.hspeed = t;
    }
    get hspeed() {
      return this[o];
    }
    set hspeed(t) {
      return (
        0 === this.vspeed && 0 === t && (this[e] = this.direction),
        (this[o] = t),
        t
      );
    }
    get vspeed() {
      return this[i];
    }
    set vspeed(t) {
      return (
        0 === this.hspeed && 0 === t && (this[e] = this.direction),
        (this[i] = t),
        t
      );
    }
    get direction() {
      return 0 === this.speed
        ? this[e]
        : ((180 * Math.atan2(this.vspeed, this.hspeed)) / Math.PI + 360) % 360;
    }
    set direction(t) {
      if (((this[e] = t), this.speed > 0)) {
        var o = this.speed;
        (this.hspeed = o * Math.cos((t * Math.PI) / 180)),
          (this.vspeed = o * Math.sin((t * Math.PI) / 180));
      }
      return t;
    }
    move() {
      this.gravity &&
        ((this.hspeed +=
          this.gravity *
          ct.delta *
          Math.cos((this.gravityDir * Math.PI) / 180)),
        (this.vspeed +=
          this.gravity *
          ct.delta *
          Math.sin((this.gravityDir * Math.PI) / 180))),
        (this.x += this.hspeed * ct.delta),
        (this.y += this.vspeed * ct.delta);
    }
    addSpeed(t, e) {
      (this.hspeed += t * Math.cos((e * Math.PI) / 180)),
        (this.vspeed += t * Math.sin((e * Math.PI) / 180));
    }
    getRoom() {
      let t = this.parent;
      for (; !(t instanceof Room); ) t = t.parent;
      return t;
    }
    onBeforeCreateModifier() {}
  }
  return n;
})();
!(function (ct) {
  const t = function () {
    this.$chashes = ct.place.getHashes(this);
    for (const t of this.$chashes)
      t in ct.place.grid
        ? ct.place.grid[t].push(this)
        : (ct.place.grid[t] = [this]);
  };
  (ct.templates = {
    Copy: Copy,
    list: { BACKGROUND: [], TILEMAP: [] },
    templates: {},
    copyIntoRoom(e, o = 0, i = 0, s, n) {
      if (!(s && s instanceof Room))
        throw new Error(
          `Attempt to spawn a copy of template ${e} inside an invalid room. Room's value provided: ${s}`
        );
      const a = new Copy(e, o, i, n);
      return s.addChild(a), ct.stack.push(a), t.apply(a), a;
    },
    copy: (t, e = 0, o = 0, i) =>
      ct.templates.copyIntoRoom(t, e, o, ct.room, i),
    each(t) {
      for (const e of ct.stack) e instanceof Copy && t.apply(e, this);
    },
    withCopy(t, e) {
      e.apply(t, this);
    },
    withTemplate(t, e) {
      for (const o of ct.templates.list[t]) e.apply(o, this);
    },
    exists(t) {
      if (!(t in ct.templates.templates))
        throw new Error(
          `[ct.templates] ct.templates.exists: There is no such template ${t}.`
        );
      return ct.templates.list[t].length > 0;
    },
    valid: (t) =>
      t instanceof Copy
        ? !t.kill
        : t instanceof PIXI.DisplayObject
        ? Boolean(t.position)
        : Boolean(t),
    isCopy: (t) => t instanceof Copy,
  }),
    (ct.templates.templates.timer = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "timer",
      onStep: function () {
        this.move();
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        var t = this;
        (this.times = 0), this.gotoAndStop(10), (this.fullTime = 60);
        var e = setInterval(function () {
          if (ct.room.gameover) return clearInterval(e), !1;
          ct.room.paused || (t.fullTime -= 1);
          var o = Math.round(t.fullTime / 6);
          t.gotoAndStop(o), 0 == t.currentFrame && ct.room.GameOverFN();
        }, 1e3);
      },
      extends: {},
    }),
    (ct.templates.list.timer = []),
    (ct.templates.templates.playpause = {
      depth: 6,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "playpause",
      onStep: function () {
        this.move(),
          ct.touch.collideUi(this) &&
            (ct.room.gameover ||
              this.pressed ||
              (0 == this.currentFrame
                ? ((ct.room.paused = !0),
                  (ct.pixiApp.ticker.speed = 0),
                  this.gotoAndStop(1),
                  (this.x = 480),
                  (this.pauseRoom = ct.rooms.append("Paused", { isUi: !0 })))
                : 1 == this.currentFrame &&
                  (setTimeout(function () {
                    (ct.room.paused = !1), (ct.pixiApp.ticker.speed = 1);
                  }, 200),
                  this.gotoAndStop(0),
                  (this.x = 64),
                  ct.rooms.remove(this.pauseRoom))));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        this.pauseRoom;
      },
      extends: {},
    }),
    (ct.templates.list.playpause = []),
    (ct.templates.templates.points = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      onStep: function () {
        this.move(), (this.y -= 1);
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        (this.pointLabel = new PIXI.Text("+9", ct.styles.get("points"))),
          (this.pointLabel.x = 0),
          (this.pointLabel.y = 0),
          this.addChild(this.pointLabel),
          ct.timer.add(500, "killtimer").then(() => {
            this.kill = !0;
          });
      },
      extends: {},
    }),
    (ct.templates.list.points = []),
    (ct.templates.templates.btn_back = {
      depth: 1,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "btnBack",
      onStep: function () {
        this.move(),
          this.move(),
          ct.touch.collideUi(this) &&
            ((this.tint = 16098664),
            this.pressed ||
              ((this.pressed = !0),
              ct.u.wait(150).then(() => {
                ct.rooms.switch("01Start");
              })));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        this.pressed = !1;
      },
      extends: {},
    }),
    (ct.templates.list.btn_back = []),
    (ct.templates.templates.btn_comenzar = {
      depth: 1,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "btnComenzar",
      onStep: function () {
        this.move(),
          ct.touch.collideUi(this) &&
            ((this.tint = 16098664),
            this.pressed ||
              ((this.pressed = !0),
              ct.sound.spawn("wave"),
              ct.u.wait(150).then(() => {
                ct.rooms.switch("03Game");
              })));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        this.pressed = !1;
      },
      extends: {},
    }),
    (ct.templates.list.btn_comenzar = []),
    (ct.templates.templates.btn_siguiente = {
      depth: 1,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "btnContinuar",
      onStep: function () {
        this.move(),
          ct.touch.collideUi(this) &&
            ((this.tint = 16098664),
            this.pressed ||
              ((this.pressed = !0),
              ct.sound.spawn("wave"),
              ct.u.wait(150).then(() => {
                ct.rooms.switch("02Start");
              })));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        this.pressed = !1;
      },
      extends: {},
    }),
    (ct.templates.list.btn_siguiente = []),
    (ct.templates.templates.btn_back_exit = {
      depth: 1,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "btnBack",
      onStep: function () {
        this.move(),
          ct.touch.collideUi(this) &&
            (this.pressed ||
              ((this.pressed = !0),
              window.parent.postMessage("closegame", "*"),
              console.log("closegame")));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        (this.pressed = !0),
          ct.u.wait(1e3).then(() => {
            this.pressed = !1;
          });
      },
      extends: {},
    }),
    (ct.templates.list.btn_back_exit = []),
    (ct.templates.templates.linea = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "linea",
      onStep: function () {
        this.move(),
          ct.room.gameover &&
            (clearInterval(this.builderInterval), (this.kill = !0));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        var t = this;
        function e() {
          var o = ct.types.copy("sillos", t.x + t.width, t.y);
          (o.speed = 2 - 0.1 * t.builderspeed),
            (o.direction = 180),
            (o.depth = 1),
            (o.scale.x = o.scale.y = 0.6),
            (t.builderspeed -= 0.2),
            (t.builderspeed = Math.round(10 * t.builderspeed) / 10),
            (function () {
              if (ct.room.gameover) return !1;
              t.builderInterval && clearInterval(t.builderInterval);
              ct.u.wait(200).then(() => {
                var o = Math.round(1e3 * t.builderspeed);
                t.builderInterval = setInterval(e, o);
              });
            })();
        }
        this.builderspeed = 5;
        var o = Math.round(3e3 * Math.random());
        ct.timer.add(o, "start").then(() => {
          e();
        });
      },
      extends: {},
    }),
    (ct.templates.list.linea = []),
    (ct.templates.templates.sillos = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "sillos",
      onStep: function () {
        this.move(),
          this.x < 0 &&
            !this.readyToKill &&
            ("sillos" == this.tex &&
              ((this.readyToKill = !0),
              (this.endpart = ct.emitters.fire("killSillo", this.x, this.y, {
                depth: 3,
              })),
              ct.sound.spawn("sillokill")),
            ct.u.wait(500).then(() => {
              "sillos" == this.tex && (this.endpart.kill = !0),
                (this.kill = !0);
            })),
          ct.room.gameover && (this.kill = !0);
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        this.gotoAndStop(Math.round(4 * Math.random())),
          (this.readyToKill = !1),
          (this.isSpecial = 1 == Math.round(Math.random() - 0.3)),
          this.isSpecial &&
            ct.emitters.append(this, "goldtool", { position: { x: 0, y: 0 } });
      },
      extends: {},
    }),
    (ct.templates.list.sillos = []),
    (ct.templates.templates.tools = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "tools",
      onStep: function () {
        if (
          (this.move(), ct.touch.hovers(this) && ct.actions.TouchAction.pressed)
        ) {
          var t = ct.types.copy("tools_draggable", ct.touch.x, ct.touch.y);
          t.gotoAndStop(this.currentFrame),
            (t.scale.x = t.scale.y = 0.6),
            ct.sound.spawn("grab");
        }
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {},
      extends: {},
    }),
    (ct.templates.list.tools = []),
    (ct.templates.templates.tools_draggable = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "tools",
      onStep: function () {
        if (
          (this.move(),
          this.dragging &&
            ct.actions.TouchAction.released &&
            ((this.dragging = !1), (this.kill = !0), ct.sound.spawn("release")),
          this.dragging)
        ) {
          (this.x = ct.touch.x), (this.y = ct.touch.y);
          var t = ct.place.meet(this, "sillos");
          if (t && "sillos" == t.tex && t.currentFrame == this.currentFrame) {
            (t.tex = this.tex), t.gotoAndStop(this.currentFrame);
            var e = 0,
              o = "";
            switch (this.currentFrame) {
              case 0:
                (e = 19), (o = "taladro");
                break;
              case 1:
                (e = 47), (o = "martillo");
                break;
              case 2:
                (e = 79), (o = "llaves");
                break;
              case 3:
                (e = 97), (o = "inglesa");
                break;
              case 4:
                (e = 149), (o = "pinzas");
            }
            t.isSpecial
              ? (ct.room.addPoints(Math.round(3 * e), this.x, this.y, o),
                ct.sound.spawn("okgold"))
              : (ct.room.addPoints(e, this.x, this.y, o), ct.sound.spawn("ok")),
              (this.kill = !0);
          }
        }
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        (this.dragging = !0), (this.depth = 3);
      },
      extends: {},
    }),
    (ct.templates.list.tools_draggable = []),
    (ct.templates.templates.alcanciaNoFN = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "pigSprite",
      onStep: function () {
        this.move(),
          "l" == this.dir && this.gotoAndStop(2),
          "c" == this.dir && this.gotoAndStop(1),
          "r" == this.dir && this.gotoAndStop(0),
          "r" == this.dir && this.x <= ct.camera.width - 100
            ? (this.x += 3)
            : (this.dir = "l"),
          "l" == this.dir && this.x >= 100 ? (this.x -= 3) : (this.dir = "r");
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        this.dir = "r";
      },
      extends: {},
    }),
    (ct.templates.list.alcanciaNoFN = []),
    (ct.templates.templates.coinNoFN = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "coins",
      onStep: function () {
        this.move(),
          this.fix ||
            ((this.movX = this.constant + Math.sin(this.angle) * this.scalar),
            (this.movY = this.constant + Math.cos(this.angle) * this.scalar),
            (this.x = this.pos.x + this.movX),
            (this.y = this.pos.y + this.movY / 2),
            (this.angle = this.angle + this.speed));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        (this.constant = 25 * Math.random()),
          (this.angle = 0.005),
          (this.scalar = Math.round(20 * Math.random())),
          (this.speed = 0.1 * Math.random() - 0.05),
          this.fix && ((this.speed = 0), (this.width = 50), (this.height = 50)),
          (this.pos = { x: this.x, y: this.y }),
          null == this.type && (this.type = Math.round(2 * Math.random())),
          this.gotoAndStop(this.type);
      },
      extends: {},
    }),
    (ct.templates.list.coinNoFN = []),
    (ct.templates.templates.alcancia = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "pigSprite",
      onStep: function () {
        var t = this;
        if (
          (this.move(),
          "l" == this.dir && this.gotoAndStop(2),
          "c" == this.dir && this.gotoAndStop(1),
          "r" == this.dir && this.gotoAndStop(0),
          ct.touch.hovers(this) &&
            ct.actions.TouchAction.pressed &&
            (this.dragging = !0),
          this.dragging &&
            ct.actions.TouchAction.released &&
            ((this.dragging = !1), (this.dir = "c")),
          this.dragging)
        ) {
          var e = Math.round(ct.touch.x),
            o = Math.round(this.x);
          if (Math.abs(e - o) < 10) return (this.dir = "c"), !1;
          e > o ? i("r") : e && i("l");
        }
        function i(e) {
          (t.dir = e),
            "r" == e && t.x < ct.camera.width - t.width / 2
              ? (t.x += t.speedmove)
              : "l" == e && t.x > t.width / 2 && (t.x -= t.speedmove);
        }
        ct.actions.MoveAction.down &&
          (ct.actions.MoveAction.value > 0
            ? i("r")
            : ct.actions.MoveAction.value < 0 && i("l")),
          ct.actions.MoveAction.released && (this.dir = "c");
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        (this.dir = "c"), (this.dragging = !1), (this.speedmove = 8);
      },
      extends: {},
    }),
    (ct.templates.list.alcancia = []),
    (ct.templates.templates.coin = {
      depth: 0,
      blendMode: PIXI.BLEND_MODES.NORMAL,
      playAnimationOnStart: !1,
      texture: "coins",
      onStep: function () {
        this.move(),
          ct.place.meet(this, "alcancia") &&
            (ct.room.setScore(this), (this.kill = !0));
      },
      onDraw: function () {},
      onDestroy: function () {},
      onCreate: function () {
        (this.pos = { x: this.x, y: this.y }),
          null == this.type && (this.type = Math.round(2 * Math.random())),
          this.gotoAndStop(this.type);
      },
      extends: {},
    }),
    (ct.templates.list.coin = []),
    (ct.templates.beforeStep = function () {}),
    (ct.templates.afterStep = function () {}),
    (ct.templates.beforeDraw = function () {
      !1;
    }),
    (ct.templates.afterDraw = function () {
      if (
        (this.transform &&
          this.transform._localID !== this.transform._currentLocalID) ||
        this.x !== this.xprev ||
        this.y !== this.yprev
      ) {
        delete this._shape;
        const t = this.$chashes || [];
        this.$chashes = ct.place.getHashes(this);
        for (const e of t)
          -1 === this.$chashes.indexOf(e) &&
            ct.place.grid[e].splice(ct.place.grid[e].indexOf(this), 1);
        for (const e of this.$chashes)
          -1 === t.indexOf(e) &&
            (e in ct.place.grid
              ? ct.place.grid[e].push(this)
              : (ct.place.grid[e] = [this]));
      }
    }),
    (ct.templates.onDestroy = function () {
      if (this.$chashes)
        for (const t of this.$chashes)
          ct.place.grid[t].splice(ct.place.grid[t].indexOf(this), 1);
    });
})(ct);
class Background extends PIXI.TilingSprite {
  constructor(t, e = 0, o = 0, i = {}) {
    var s = ct.camera.width,
      n = ct.camera.height;
    const a = t instanceof PIXI.Texture ? t : ct.res.getTexture(t, e || 0);
    ("no-repeat" !== i.repeat && "repeat-x" !== i.repeat) ||
      (n = a.height * (i.scaleY || 1)),
      ("no-repeat" !== i.repeat && "repeat-y" !== i.repeat) ||
        (s = a.width * (i.scaleX || 1)),
      super(a, s, n),
      ct.backgrounds.list[t] || (ct.backgrounds.list[t] = []),
      ct.backgrounds.list[t].push(this),
      ct.templates.list.BACKGROUND.push(this),
      ct.stack.push(this),
      (this.anchor.x = this.anchor.y = 0),
      (this.depth = o),
      (this.shiftX = this.shiftY = this.movementX = this.movementY = 0),
      (this.parallaxX = this.parallaxY = 1),
      i && ct.u.extend(this, i),
      this.scaleX && (this.tileScale.x = Number(this.scaleX)),
      this.scaleY && (this.tileScale.y = Number(this.scaleY)),
      this.reposition();
  }
  onStep() {
    (this.shiftX += ct.delta * this.movementX),
      (this.shiftY += ct.delta * this.movementY);
  }
  reposition() {
    const t = this.isUi
      ? { x: 0, y: 0, width: ct.camera.width, height: ct.camera.height }
      : ct.camera.getBoundingBox();
    "repeat-x" !== this.repeat && "no-repeat" !== this.repeat
      ? ((this.y = t.y),
        (this.tilePosition.y = -this.y * this.parallaxY + this.shiftY),
        (this.height = t.height + 1))
      : (this.y = this.shiftY + t.y * (this.parallaxY - 1)),
      "repeat-y" !== this.repeat && "no-repeat" !== this.repeat
        ? ((this.x = t.x),
          (this.tilePosition.x = -this.x * this.parallaxX + this.shiftX),
          (this.width = t.width + 1))
        : (this.x = this.shiftX + t.x * (this.parallaxX - 1));
  }
  onDraw() {
    this.reposition();
  }
  static onCreate() {}
  static onDestroy() {}
  get isUi() {
    return !!this.parent && Boolean(this.parent.isUi);
  }
}
(ct.backgrounds = {
  Background: Background,
  list: {},
  add(t, e = 0, o = 0, i = ct.room) {
    if (!t)
      throw new Error("[ct.backgrounds] The texName argument is required.");
    const s = new Background(t, e, o);
    return i.addChild(s), s;
  },
}),
  (ct.templates.Background = Background);
class Tilemap extends PIXI.Container {
  constructor(t) {
    if ((super(), (this.pixiTiles = []), t)) {
      (this.depth = t.depth),
        (this.tiles = t.tiles.map((t) => ({ ...t }))),
        t.extends && Object.assign(this, t.extends);
      for (let e = 0, o = t.tiles.length; e < o; e++) {
        const o = ct.res.getTexture(t.tiles[e].texture),
          i = new PIXI.Sprite(o[t.tiles[e].frame]);
        (i.anchor.x = i.anchor.y = 0),
          (i.shape = o.shape),
          this.addChild(i),
          this.pixiTiles.push(i),
          (this.tiles[e].sprite = i),
          (i.x = t.tiles[e].x),
          (i.y = t.tiles[e].y);
      }
    } else this.tiles = [];
    ct.templates.list.TILEMAP.push(this);
  }
  addTile(t, e, o, i = 0) {
    if (this.cached)
      throw new Error(
        "[ct.tiles] Adding tiles to cached tilemaps is forbidden. Create a new tilemap, or add tiles before caching the tilemap."
      );
    const s = ct.res.getTexture(t, i),
      n = new PIXI.Sprite(s);
    return (
      (n.x = e),
      (n.y = o),
      (n.shape = s.shape),
      this.tiles.push({
        texture: t,
        frame: i,
        x: e,
        y: o,
        width: n.width,
        height: n.height,
        sprite: n,
      }),
      this.addChild(n),
      this.pixiTiles.push(n),
      n
    );
  }
  cache(t = 1024) {
    if (this.cached)
      throw new Error("[ct.tiles] Attempt to cache an already cached tilemap.");
    const e = this.getLocalBounds(),
      o = Math.ceil(e.width / t),
      i = Math.ceil(e.height / t);
    this.cells = [];
    for (let t = 0; t < i; t++)
      for (let t = 0; t < o; t++) {
        const t = new PIXI.Container();
        this.cells.push(t);
      }
    for (let i = 0, s = this.tiles.length; i < s; i++) {
      const i = this.children[0],
        s = Math.floor((i.x - e.x) / t),
        n = Math.floor((i.y - e.y) / t);
      this.cells[n * o + s].addChild(i);
    }
    this.removeChildren();
    for (let t = 0, e = this.cells.length; t < e; t++)
      0 !== this.cells[t].children.length
        ? (this.addChild(this.cells[t]), (this.cells[t].cacheAsBitmap = !0))
        : (this.cells.splice(t, 1), t--, e--);
    this.cached = !0;
  }
  cacheDiamond(t = 1024) {
    if (this.cached)
      throw new Error("[ct.tiles] Attempt to cache an already cached tilemap.");
    (this.cells = []), (this.diamondCellMap = {});
    for (let e = 0, o = this.tiles.length; e < o; e++) {
      const e = this.children[0],
        [o, i] = ct.u.rotate(e.x, 2 * e.y, -45),
        s = Math.floor(o / t),
        n = Math.floor(i / t),
        a = `${s}:${n}`;
      if (!(a in this.diamondCellMap)) {
        const t = new PIXI.Container();
        (t.chunkX = s),
          (t.chunkY = n),
          (this.diamondCellMap[a] = t),
          this.cells.push(t);
      }
      this.diamondCellMap[a].addChild(e);
    }
    this.removeChildren(),
      this.cells.sort((t, e) => {
        const o = Math.max(t.chunkY, t.chunkX),
          i = Math.max(e.chunkY, e.chunkX);
        return o === i ? e.chunkX - t.chunkX : o - i;
      });
    for (let t = 0, e = this.cells.length; t < e; t++)
      this.addChild(this.cells[t]), (this.cells[t].cacheAsBitmap = !0);
    this.cached = !0;
  }
}
(ct.templates.Tilemap = Tilemap),
  (ct.tilemaps = {
    create(t = 0) {
      const e = new Tilemap();
      return (e.depth = t), ct.room.addChild(e), e;
    },
    addTile: (t, e, o, i, s = 0) => t.addTile(e, o, i, s),
    cache(t, e) {
      t.cache(e);
    },
    cacheDiamond(t, e) {
      t.cacheDiamond(e);
    },
  });
const Camera = (function () {
  class t extends PIXI.DisplayObject {
    constructor(t, e, o, i) {
      super(),
        (this.follow = this.rotate = !1),
        (this.followX = this.followY = !0),
        (this.targetX = this.x = t),
        (this.targetY = this.y = e),
        (this.z = 500),
        (this.width = o || 1920),
        (this.height = i || 1080),
        (this.shiftX =
          this.shiftY =
          this.interpolatedShiftX =
          this.interpolatedShiftY =
            0),
        (this.borderX = this.borderY = null),
        (this.drift = 0),
        (this.shake = 0),
        (this.shakeDecay = 5),
        (this.shakeX = this.shakeY = 1),
        (this.shakeFrequency = 50),
        (this.shakePhase = this.shakePhaseX = this.shakePhaseY = 0),
        (this.shakeMax = 10),
        (this.getBounds = this.getBoundingBox);
    }
    get scale() {
      return this.transform.scale;
    }
    set scale(t) {
      "number" == typeof t && (t = { x: t, y: t }),
        this.transform.scale.copyFrom(t);
    }
    moveTo(t, e) {
      (this.targetX = t), (this.targetY = e);
    }
    teleportTo(t, e) {
      (this.targetX = this.x = t),
        (this.targetY = this.y = e),
        (this.shakePhase = this.shakePhaseX = this.shakePhaseY = 0),
        (this.interpolatedShiftX = this.shiftX),
        (this.interpolatedShiftY = this.shiftY);
    }
    update(t) {
      !(function (t, e) {
        const o = e / (PIXI.Ticker.shared.maxFPS || 60);
        (t.shake -= o * t.shakeDecay),
          (t.shake = Math.max(0, t.shake)),
          t.shakeMax && (t.shake = Math.min(t.shake, t.shakeMax));
        const i = o * t.shakeFrequency;
        (t.shakePhase += i),
          (t.shakePhaseX += i * (1 + 0.25 * Math.sin(0.1489 * t.shakePhase))),
          (t.shakePhaseY += i * (1 + 0.25 * Math.sin(0.1734 * t.shakePhase)));
      })(this, t),
        this.follow && this.follow.kill && (this.follow = !1),
        this.follow &&
          "x" in this.follow &&
          "y" in this.follow &&
          (function (t) {
            const e =
                null === t.borderX
                  ? t.width / 2
                  : Math.min(t.borderX, t.width / 2),
              o =
                null === t.borderY
                  ? t.height / 2
                  : Math.min(t.borderY, t.height / 2),
              i = t.uiToGameCoord(e, o),
              s = t.uiToGameCoord(t.width - e, t.height - o);
            t.followX &&
              (t.follow.x < i.x - t.interpolatedShiftX
                ? (t.targetX = t.follow.x - e + t.width / 2)
                : t.follow.x > s.x - t.interpolatedShiftX &&
                  (t.targetX = t.follow.x + e - t.width / 2)),
              t.followY &&
                (t.follow.y < i.y - t.interpolatedShiftY
                  ? (t.targetY = t.follow.y - o + t.height / 2)
                  : t.follow.y > s.y - t.interpolatedShiftY &&
                    (t.targetY = t.follow.y + o - t.height / 2));
          })(this);
      const e = this.drift ? Math.min(1, (1 - this.drift) * t) : 1;
      (this.x = this.targetX * e + this.x * (1 - e)),
        (this.y = this.targetY * e + this.y * (1 - e)),
        (this.interpolatedShiftX =
          this.shiftX * e + this.interpolatedShiftX * (1 - e)),
        (this.interpolatedShiftY =
          this.shiftY * e + this.interpolatedShiftY * (1 - e)),
        (function (t) {
          if (void 0 !== t.minX) {
            const e = t.minX + t.width * t.scale.x * 0.5;
            (t.x = Math.max(e, t.x)), (t.targetX = Math.max(e, t.targetX));
          }
          if (void 0 !== t.maxX) {
            const e = t.maxX - t.width * t.scale.x * 0.5;
            (t.x = Math.min(e, t.x)), (t.targetX = Math.min(e, t.targetX));
          }
          if (void 0 !== t.minY) {
            const e = t.minY + t.height * t.scale.y * 0.5;
            (t.y = Math.max(e, t.y)), (t.targetY = Math.max(e, t.targetY));
          }
          if (void 0 !== t.maxY) {
            const e = t.maxY - t.height * t.scale.y * 0.5;
            (t.y = Math.min(e, t.y)), (t.targetY = Math.min(e, t.targetY));
          }
        })(this),
        (this.x = this.x || 0),
        (this.y = this.y || 0);
    }
    get computedX() {
      const t =
        (Math.sin(this.shakePhaseX) +
          0.25 * Math.sin(3.1846 * this.shakePhaseX)) /
        1.25;
      return (
        this.x +
        ((t * this.shake * Math.max(this.width, this.height)) / 100) *
          this.shakeX +
        this.interpolatedShiftX
      );
    }
    get computedY() {
      const t =
        (Math.sin(this.shakePhaseY) +
          0.25 * Math.sin(2.8948 * this.shakePhaseY)) /
        1.25;
      return (
        this.y +
        ((t * this.shake * Math.max(this.width, this.height)) / 100) *
          this.shakeY +
        this.interpolatedShiftY
      );
    }
    get left() {
      return this.computedX - (this.width / 2) * this.scale.x;
    }
    get top() {
      return this.computedY - (this.height / 2) * this.scale.y;
    }
    get right() {
      return this.computedX + (this.width / 2) * this.scale.x;
    }
    get bottom() {
      return this.computedY + (this.height / 2) * this.scale.y;
    }
    uiToGameCoord(t, e) {
      const o = (t - this.width / 2) * this.scale.x,
        i = (e - this.height / 2) * this.scale.y,
        s = ct.u.rotate(o, i, this.angle);
      return new PIXI.Point(s.x + this.computedX, s.y + this.computedY);
    }
    gameToUiCoord(t, e) {
      const o = t - this.computedX,
        i = e - this.computedY,
        s = ct.u.rotate(o, i, -this.angle);
      return new PIXI.Point(
        s.x / this.scale.x + this.width / 2,
        s.y / this.scale.y + this.height / 2
      );
    }
    getTopLeftCorner() {
      return this.uiToGameCoord(0, 0);
    }
    getTopRightCorner() {
      return this.uiToGameCoord(this.width, 0);
    }
    getBottomLeftCorner() {
      return this.uiToGameCoord(0, this.height);
    }
    getBottomRightCorner() {
      return this.uiToGameCoord(this.width, this.height);
    }
    getBoundingBox() {
      const t = new PIXI.Bounds(),
        e = this.getTopLeftCorner(),
        o = this.getTopRightCorner(),
        i = this.getBottomLeftCorner(),
        s = this.getBottomRightCorner();
      return (
        t.addPoint(new PIXI.Point(e.x, e.y)),
        t.addPoint(new PIXI.Point(o.x, o.y)),
        t.addPoint(new PIXI.Point(i.x, i.y)),
        t.addPoint(new PIXI.Point(s.x, s.y)),
        t.getRectangle()
      );
    }
    contains(t) {
      const e = t.getBounds(!0);
      return (
        e.right > 0 &&
        e.left < this.width * this.scale.x &&
        e.bottom > 0 &&
        e.top < this.width * this.scale.y
      );
    }
    realign(t) {
      if (!t.isUi)
        throw new Error(
          "[ct.camera] An attempt to realing a room that is not in UI space. The room in question is",
          t
        );
      const e = ct.rooms.templates[t.name].width || 1,
        o = ct.rooms.templates[t.name].height || 1;
      for (const i of t.children)
        "xstart" in i &&
          !i.skipRealign &&
          ((i.x = (i.xstart / e) * this.width),
          (i.y = (i.ystart / o) * this.height));
    }
    manageStage() {
      const t = this.computedX,
        e = this.computedY,
        o = 1 / (isNaN(this.scale.x) ? 1 : this.scale.x),
        i = 1 / (isNaN(this.scale.y) ? 1 : this.scale.y);
      for (const s of ct.stage.children)
        !s.isUi &&
          s.pivot &&
          ((s.x = -this.width / 2),
          (s.y = -this.height / 2),
          (s.pivot.x = t),
          (s.pivot.y = e),
          (s.scale.x = o),
          (s.scale.y = i),
          (s.angle = -this.angle));
    }
  }
  return t;
})();
if (
  ((function () {
    const t = Symbol("time"),
      e = Symbol("roomUid"),
      o = Symbol("timeLeftOriginal"),
      i = Symbol("promiseResolve"),
      s = Symbol("promiseReject");
    class n {
      constructor(n, a = !1, r = !1) {
        (this[e] = ct.room.uid || null),
          (this.name = a && a.toString()),
          (this.isUi = r),
          (this[t] = 0),
          (this[o] = n),
          (this.timeLeft = this[o]),
          (this.promise = new Promise((t, e) => {
            (this[i] = t), (this[s] = e);
          })),
          (this.rejected = !1),
          (this.done = !1),
          (this.settled = !1),
          ct.timer.timers.add(this);
      }
      then(...t) {
        return this.promise.then(...t);
      }
      catch(t) {
        return this.promise.catch(t);
      }
      get time() {
        return (1e3 * this[t]) / ct.speed;
      }
      set time(e) {
        this[t] = (e / 1e3) * ct.speed;
      }
      update() {
        !0 !== this.rejected && !0 !== this.done
          ? ((this[t] += this.isUi ? ct.deltaUi : ct.delta),
            ct.room.uid !== this[e] &&
              null !== this[e] &&
              this.reject({ info: "Room switch", from: "ct.timer" }),
            0 !== this.timeLeft &&
              ((this.timeLeft = this[o] - this.time),
              this.timeLeft <= 0 && this.resolve()))
          : this.remove();
      }
      resolve() {
        this.settled ||
          ((this.done = !0), (this.settled = !0), this[i](), this.remove());
      }
      reject(t) {
        this.settled ||
          ((this.rejected = !0),
          (this.settled = !0),
          this[s](t),
          this.remove());
      }
      remove() {
        ct.timer.timers.delete(this);
      }
    }
    (window.CtTimer = n),
      (ct.timer = {
        timers: new Set(),
        counter: 0,
        add: (t, e = !1) => new n(t, e, !1),
        addUi: (t, e = !1) => new n(t, e, !0),
        updateTimers() {
          for (const t of this.timers) t.update();
        },
      });
  })(),
  document.fonts)
)
  for (const t of document.fonts) t.load();
function loadfonts() {
  (ct.MainFontBold = ct.styles.get("MainFontBold", !1)),
    (ct.MainFontBold.breakWords = !0),
    (ct.MainFontBold.wordWrap = !0),
    (ct.MainFontBold.wordWrapWidth = ct.camera.width - 40),
    (ct.MainFontBold.align = "center"),
    (ct.MainFontBold.fontSize = 76),
    (ct.MainFontBold.fill = ["#F39C14", "#e99035"]),
    (ct.MainFontBold.lineHeight = 55),
    (ct.MainFontBoldXL = JSON.parse(JSON.stringify(ct.MainFontBold))),
    (ct.MainFontBoldXL.fontSize = 60),
    (ct.MainFontBoldXL.lineHeight = 60),
    (ct.MainFontBoldSM = JSON.parse(JSON.stringify(ct.MainFontBold))),
    (ct.MainFontBoldSM.fontSize = 24),
    (ct.MainFontBoldSM.lineHeight = 24),
    (ct.MainFontBoldMD = JSON.parse(JSON.stringify(ct.MainFontBold))),
    (ct.MainFontBoldMD.fontSize = 40),
    (ct.MainFontBoldMD.lineHeight = 40),
    (ct.MainFontBoldMD.fill = ["#ffffff"]),
    (ct.MainFontBold2 = JSON.parse(JSON.stringify(ct.MainFontBold))),
    (ct.MainFontBold2.fontSize = 76),
    (ct.MainFontBold2.lineHeight = 76),
    (ct.MainFontBold2.fill = ["#ffffff"]),
    (ct.MainFontBoldLG = JSON.parse(JSON.stringify(ct.MainFontBold))),
    (ct.MainFontBoldLG.fontSize = 60),
    (ct.MainFontBoldLG.lineHeight = 60),
    (ct.MainFontBoldLG.fill = ["#ffffff"]),
    (ct.MainFont = ct.styles.get("MainFont", !0)),
    (ct.MainFont.breakWords = !0),
    (ct.MainFont.wordWrap = !0),
    (ct.MainFont.wordWrapWidth = ct.camera.width - 40),
    (ct.MainFont.align = "center"),
    (ct.MainFont.fontSize = 24),
    (ct.MainFont.fill = ["#000000"]),
    (ct.MainFont.lineHeight = 20),
    (ct.MainFontSM = JSON.parse(JSON.stringify(ct.MainFont))),
    (ct.MainFontSM.fontSize = 20),
    (ct.MainFontSM.lineHeight = 18),
    (ct.MainFontMD = JSON.parse(JSON.stringify(ct.MainFont))),
    (ct.MainFontMD.fontSize = 20),
    (ct.MainFontMD.lineHeight = 18),
    (ct.MainFontMD.fill = ["#ffffff"]);
}
!(function () {
  var t = function (t, e) {
      ct.inputs.registry["mouse." + t] = e;
    },
    e = {
      0: "Left",
      1: "Middle",
      2: "Right",
      3: "Special1",
      4: "Special2",
      5: "Special3",
      6: "Special4",
      7: "Special5",
      8: "Special6",
      unknown: "Unknown",
    };
  (ct.mouse = {
    xui: 0,
    yui: 0,
    xprev: 0,
    yprev: 0,
    xuiprev: 0,
    yuiprev: 0,
    inside: !1,
    pressed: !1,
    down: !1,
    released: !1,
    button: 0,
    hovers: (t) =>
      !!t.shape &&
      ("rect" === t.shape.type
        ? ct.u.prect(ct.mouse.x, ct.mouse.y, t)
        : "circle" === t.shape.type
        ? ct.u.pcircle(ct.mouse.x, ct.mouse.y, t)
        : "point" === t.shape.type && ct.mouse.x === t.x && ct.mouse.y === t.y),
    hoversUi: (t) =>
      !!t.shape &&
      ("rect" === t.shape.type
        ? ct.u.prect(ct.mouse.xui, ct.mouse.yui, t)
        : "circle" === t.shape.type
        ? ct.u.pcircle(ct.mouse.xui, ct.mouse.yui, t)
        : "point" === t.shape.type &&
          ct.mouse.xui === t.x &&
          ct.mouse.yui === t.y),
    hide() {
      ct.pixiApp.renderer.view.style.cursor = "none";
    },
    show() {
      ct.pixiApp.renderer.view.style.cursor = "";
    },
    get x() {
      return ct.u.uiToGameCoord(ct.mouse.xui, ct.mouse.yui).x;
    },
    get y() {
      return ct.u.uiToGameCoord(ct.mouse.xui, ct.mouse.yui).y;
    },
  }),
    (ct.mouse.listenerMove = function (t) {
      var e = ct.pixiApp.view.getBoundingClientRect();
      (ct.mouse.xui = ((t.clientX - e.left) * ct.camera.width) / e.width),
        (ct.mouse.yui = ((t.clientY - e.top) * ct.camera.height) / e.height),
        ct.mouse.xui > 0 &&
        ct.mouse.yui > 0 &&
        ct.mouse.yui < ct.camera.height &&
        ct.mouse.xui < ct.camera.width
          ? (ct.mouse.inside = !0)
          : (ct.mouse.inside = !1),
        window.focus();
    }),
    (ct.mouse.listenerDown = function (o) {
      t(e[o.button] || e.unknown, 1),
        (ct.mouse.pressed = !0),
        (ct.mouse.down = !0),
        (ct.mouse.button = o.button),
        window.focus(),
        o.preventDefault();
    }),
    (ct.mouse.listenerUp = function (o) {
      t(e[o.button] || e.unknown, 0),
        (ct.mouse.released = !0),
        (ct.mouse.down = !1),
        (ct.mouse.button = o.button),
        window.focus(),
        o.preventDefault();
    }),
    (ct.mouse.listenerContextMenu = function (t) {
      t.preventDefault();
    }),
    (ct.mouse.listenerWheel = function (e) {
      t("Wheel", (e.wheelDelta || -e.detail) < 0 ? -1 : 1);
    }),
    (ct.mouse.setupListeners = function () {
      document.addEventListener
        ? (document.addEventListener("mousemove", ct.mouse.listenerMove, !1),
          document.addEventListener("mouseup", ct.mouse.listenerUp, !1),
          document.addEventListener("mousedown", ct.mouse.listenerDown, !1),
          document.addEventListener("wheel", ct.mouse.listenerWheel, !1, {
            passive: !1,
          }),
          document.addEventListener(
            "contextmenu",
            ct.mouse.listenerContextMenu,
            !1
          ),
          document.addEventListener("DOMMouseScroll", ct.mouse.listenerWheel, {
            passive: !1,
          }))
        : (document.attachEvent("onmousemove", ct.mouse.listenerMove),
          document.attachEvent("onmouseup", ct.mouse.listenerUp),
          document.attachEvent("onmousedown", ct.mouse.listenerDown),
          document.attachEvent("onmousewheel", ct.mouse.listenerWheel),
          document.attachEvent("oncontextmenu", ct.mouse.listenerContextMenu));
    });
})(),
  (function () {
    var t = function (t, e) {
      ct.inputs.registry["keyboard." + t] = e;
    };
    (ct.keyboard = {
      string: "",
      lastKey: "",
      lastCode: "",
      alt: !1,
      shift: !1,
      ctrl: !1,
      clear() {
        delete ct.keyboard.lastKey,
          delete ct.keyboard.lastCode,
          (ct.keyboard.string = ""),
          (ct.keyboard.alt = !1),
          (ct.keyboard.shift = !1),
          (ct.keyboard.ctrl = !1);
      },
      check: [],
      onDown(e) {
        (ct.keyboard.shift = e.shiftKey),
          (ct.keyboard.alt = e.altKey),
          (ct.keyboard.ctrl = e.ctrlKey),
          (ct.keyboard.lastKey = e.key),
          (ct.keyboard.lastCode = e.code),
          e.code ? t(e.code, 1) : t("Unknown", 1),
          e.key &&
            (1 === e.key.length
              ? (ct.keyboard.string += e.key)
              : "Backspace" === e.key
              ? (ct.keyboard.string = ct.keyboard.string.slice(0, -1))
              : "Enter" === e.key && (ct.keyboard.string = "")),
          e.preventDefault();
      },
      onUp(e) {
        (ct.keyboard.shift = e.shiftKey),
          (ct.keyboard.alt = e.altKey),
          (ct.keyboard.ctrl = e.ctrlKey),
          e.code ? t(e.code, 0) : t("Unknown", 0),
          e.preventDefault();
      },
    }),
      document.addEventListener
        ? (document.addEventListener("keydown", ct.keyboard.onDown, !1),
          document.addEventListener("keyup", ct.keyboard.onUp, !1))
        : (document.attachEvent("onkeydown", ct.keyboard.onDown),
          document.attachEvent("onkeyup", ct.keyboard.onUp));
  })(),
  (function (t) {
    "use strict";
    var e = "KeyboardEvent" in t;
    e ||
      (t.KeyboardEvent = function () {
        throw TypeError("Illegal constructor");
      }),
      [
        ["DOM_KEY_LOCATION_STANDARD", 0],
        ["DOM_KEY_LOCATION_LEFT", 1],
        ["DOM_KEY_LOCATION_RIGHT", 2],
        ["DOM_KEY_LOCATION_NUMPAD", 3],
      ].forEach(function (e) {
        e[0] in t.KeyboardEvent || (t.KeyboardEvent[e[0]] = e[1]);
      });
    var o = t.KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
      i = t.KeyboardEvent.DOM_KEY_LOCATION_LEFT,
      s = t.KeyboardEvent.DOM_KEY_LOCATION_RIGHT,
      n = t.KeyboardEvent.DOM_KEY_LOCATION_NUMPAD;
    function a(t, e) {
      return -1 !== String(t).indexOf(e);
    }
    var r = a(navigator.platform, "Win")
        ? "win"
        : a(navigator.platform, "Mac")
        ? "mac"
        : a(navigator.platform, "CrOS")
        ? "cros"
        : a(navigator.platform, "Linux")
        ? "linux"
        : a(navigator.userAgent, "iPad") ||
          a(navigator.platform, "iPod") ||
          a(navigator.platform, "iPhone")
        ? "ios"
        : "",
      c = a(navigator.userAgent, "Chrome/")
        ? "chrome"
        : a(navigator.vendor, "Apple")
        ? "safari"
        : a(navigator.userAgent, "MSIE")
        ? "ie"
        : a(navigator.userAgent, "Gecko/")
        ? "moz"
        : a(navigator.userAgent, "Opera/")
        ? "opera"
        : "",
      l = c + "-" + r;
    function h(t, e, o) {
      (l !== e && c !== e && r !== e) ||
        Object.keys(o).forEach(function (e) {
          t[e] = o[e];
        });
    }
    var d = {
      3: { code: "Cancel" },
      6: { code: "Help" },
      8: { code: "Backspace" },
      9: { code: "Tab" },
      12: { code: "Clear" },
      13: { code: "Enter" },
      16: { code: "Shift" },
      17: { code: "Control" },
      18: { code: "Alt" },
      19: { code: "Pause" },
      20: { code: "CapsLock" },
      21: { code: "KanaMode" },
      22: { code: "Lang1" },
      25: { code: "Lang2" },
      27: { code: "Escape" },
      28: { code: "Convert" },
      29: { code: "NonConvert" },
      30: { code: "Accept" },
      31: { code: "ModeChange" },
      32: { code: "Space" },
      33: { code: "PageUp" },
      34: { code: "PageDown" },
      35: { code: "End" },
      36: { code: "Home" },
      37: { code: "ArrowLeft" },
      38: { code: "ArrowUp" },
      39: { code: "ArrowRight" },
      40: { code: "ArrowDown" },
      41: { code: "Select" },
      42: { code: "Print" },
      43: { code: "Execute" },
      44: { code: "PrintScreen" },
      45: { code: "Insert" },
      46: { code: "Delete" },
      47: { code: "Help" },
      48: { code: "Digit0", keyCap: "0" },
      49: { code: "Digit1", keyCap: "1" },
      50: { code: "Digit2", keyCap: "2" },
      51: { code: "Digit3", keyCap: "3" },
      52: { code: "Digit4", keyCap: "4" },
      53: { code: "Digit5", keyCap: "5" },
      54: { code: "Digit6", keyCap: "6" },
      55: { code: "Digit7", keyCap: "7" },
      56: { code: "Digit8", keyCap: "8" },
      57: { code: "Digit9", keyCap: "9" },
      65: { code: "KeyA", keyCap: "a" },
      66: { code: "KeyB", keyCap: "b" },
      67: { code: "KeyC", keyCap: "c" },
      68: { code: "KeyD", keyCap: "d" },
      69: { code: "KeyE", keyCap: "e" },
      70: { code: "KeyF", keyCap: "f" },
      71: { code: "KeyG", keyCap: "g" },
      72: { code: "KeyH", keyCap: "h" },
      73: { code: "KeyI", keyCap: "i" },
      74: { code: "KeyJ", keyCap: "j" },
      75: { code: "KeyK", keyCap: "k" },
      76: { code: "KeyL", keyCap: "l" },
      77: { code: "KeyM", keyCap: "m" },
      78: { code: "KeyN", keyCap: "n" },
      79: { code: "KeyO", keyCap: "o" },
      80: { code: "KeyP", keyCap: "p" },
      81: { code: "KeyQ", keyCap: "q" },
      82: { code: "KeyR", keyCap: "r" },
      83: { code: "KeyS", keyCap: "s" },
      84: { code: "KeyT", keyCap: "t" },
      85: { code: "KeyU", keyCap: "u" },
      86: { code: "KeyV", keyCap: "v" },
      87: { code: "KeyW", keyCap: "w" },
      88: { code: "KeyX", keyCap: "x" },
      89: { code: "KeyY", keyCap: "y" },
      90: { code: "KeyZ", keyCap: "z" },
      91: { code: "MetaLeft", location: i },
      92: { code: "MetaRight", location: s },
      93: { code: "ContextMenu" },
      95: { code: "Standby" },
      96: { code: "Numpad0", keyCap: "0", location: n },
      97: { code: "Numpad1", keyCap: "1", location: n },
      98: { code: "Numpad2", keyCap: "2", location: n },
      99: { code: "Numpad3", keyCap: "3", location: n },
      100: { code: "Numpad4", keyCap: "4", location: n },
      101: { code: "Numpad5", keyCap: "5", location: n },
      102: { code: "Numpad6", keyCap: "6", location: n },
      103: { code: "Numpad7", keyCap: "7", location: n },
      104: { code: "Numpad8", keyCap: "8", location: n },
      105: { code: "Numpad9", keyCap: "9", location: n },
      106: { code: "NumpadMultiply", keyCap: "*", location: n },
      107: { code: "NumpadAdd", keyCap: "+", location: n },
      108: { code: "NumpadComma", keyCap: ",", location: n },
      109: { code: "NumpadSubtract", keyCap: "-", location: n },
      110: { code: "NumpadDecimal", keyCap: ".", location: n },
      111: { code: "NumpadDivide", keyCap: "/", location: n },
      112: { code: "F1" },
      113: { code: "F2" },
      114: { code: "F3" },
      115: { code: "F4" },
      116: { code: "F5" },
      117: { code: "F6" },
      118: { code: "F7" },
      119: { code: "F8" },
      120: { code: "F9" },
      121: { code: "F10" },
      122: { code: "F11" },
      123: { code: "F12" },
      124: { code: "F13" },
      125: { code: "F14" },
      126: { code: "F15" },
      127: { code: "F16" },
      128: { code: "F17" },
      129: { code: "F18" },
      130: { code: "F19" },
      131: { code: "F20" },
      132: { code: "F21" },
      133: { code: "F22" },
      134: { code: "F23" },
      135: { code: "F24" },
      144: { code: "NumLock", location: n },
      145: { code: "ScrollLock" },
      160: { code: "ShiftLeft", location: i },
      161: { code: "ShiftRight", location: s },
      162: { code: "ControlLeft", location: i },
      163: { code: "ControlRight", location: s },
      164: { code: "AltLeft", location: i },
      165: { code: "AltRight", location: s },
      166: { code: "BrowserBack" },
      167: { code: "BrowserForward" },
      168: { code: "BrowserRefresh" },
      169: { code: "BrowserStop" },
      170: { code: "BrowserSearch" },
      171: { code: "BrowserFavorites" },
      172: { code: "BrowserHome" },
      173: { code: "AudioVolumeMute" },
      174: { code: "AudioVolumeDown" },
      175: { code: "AudioVolumeUp" },
      176: { code: "MediaTrackNext" },
      177: { code: "MediaTrackPrevious" },
      178: { code: "MediaStop" },
      179: { code: "MediaPlayPause" },
      180: { code: "LaunchMail" },
      181: { code: "MediaSelect" },
      182: { code: "LaunchApp1" },
      183: { code: "LaunchApp2" },
      186: { code: "Semicolon", keyCap: ";" },
      187: { code: "Equal", keyCap: "=" },
      188: { code: "Comma", keyCap: "," },
      189: { code: "Minus", keyCap: "-" },
      190: { code: "Period", keyCap: "." },
      191: { code: "Slash", keyCap: "/" },
      192: { code: "Backquote", keyCap: "`" },
      219: { code: "BracketLeft", keyCap: "[" },
      220: { code: "Backslash", keyCap: "\\" },
      221: { code: "BracketRight", keyCap: "]" },
      222: { code: "Quote", keyCap: "'" },
      226: { code: "IntlBackslash", keyCap: "\\" },
      229: { code: "Process" },
      246: { code: "Attn" },
      247: { code: "CrSel" },
      248: { code: "ExSel" },
      249: { code: "EraseEof" },
      250: { code: "Play" },
      251: { code: "ZoomToggle" },
      254: { code: "Clear" },
    };
    h(d, "moz", {
      59: { code: "Semicolon", keyCap: ";" },
      61: { code: "Equal", keyCap: "=" },
      107: { code: "Equal", keyCap: "=" },
      109: { code: "Minus", keyCap: "-" },
      187: { code: "NumpadAdd", keyCap: "+", location: n },
      189: { code: "NumpadSubtract", keyCap: "-", location: n },
    }),
      h(d, "moz-mac", {
        12: { code: "NumLock", location: n },
        173: { code: "Minus", keyCap: "-" },
      }),
      h(d, "moz-win", { 173: { code: "Minus", keyCap: "-" } }),
      h(d, "chrome-mac", { 93: { code: "MetaRight", location: s } }),
      h(d, "safari", { 3: { code: "Enter" }, 25: { code: "Tab" } }),
      h(d, "ios", { 10: { code: "Enter", location: o } }),
      h(d, "safari-mac", {
        91: { code: "MetaLeft", location: i },
        93: { code: "MetaRight", location: s },
        229: { code: "KeyQ", keyCap: "Q" },
      });
    var p = {};
    "cros" === r &&
      ((p["U+00A0"] = { code: "ShiftLeft", location: i }),
      (p["U+00A1"] = { code: "ShiftRight", location: s }),
      (p["U+00A2"] = { code: "ControlLeft", location: i }),
      (p["U+00A3"] = { code: "ControlRight", location: s }),
      (p["U+00A4"] = { code: "AltLeft", location: i }),
      (p["U+00A5"] = { code: "AltRight", location: s })),
      "chrome-mac" === l && (p["U+0010"] = { code: "ContextMenu" }),
      "safari-mac" === l && (p["U+0010"] = { code: "ContextMenu" }),
      "ios" === r &&
        ((p["U+0010"] = { code: "Function" }),
        (p["U+001C"] = { code: "ArrowLeft" }),
        (p["U+001D"] = { code: "ArrowRight" }),
        (p["U+001E"] = { code: "ArrowUp" }),
        (p["U+001F"] = { code: "ArrowDown" }),
        (p["U+0001"] = { code: "Home" }),
        (p["U+0004"] = { code: "End" }),
        (p["U+000B"] = { code: "PageUp" }),
        (p["U+000C"] = { code: "PageDown" }));
    var u = [];
    (u[i] = {
      16: { code: "ShiftLeft", location: i },
      17: { code: "ControlLeft", location: i },
      18: { code: "AltLeft", location: i },
    }),
      (u[s] = {
        16: { code: "ShiftRight", location: s },
        17: { code: "ControlRight", location: s },
        18: { code: "AltRight", location: s },
      }),
      (u[n] = { 13: { code: "NumpadEnter", location: n } }),
      h(u[n], "moz", {
        109: { code: "NumpadSubtract", location: n },
        107: { code: "NumpadAdd", location: n },
      }),
      h(u[i], "moz-mac", { 224: { code: "MetaLeft", location: i } }),
      h(u[s], "moz-mac", { 224: { code: "MetaRight", location: s } }),
      h(u[s], "moz-win", { 91: { code: "MetaRight", location: s } }),
      h(u[s], "mac", { 93: { code: "MetaRight", location: s } }),
      h(u[n], "chrome-mac", { 12: { code: "NumLock", location: n } }),
      h(u[n], "safari-mac", {
        12: { code: "NumLock", location: n },
        187: { code: "NumpadAdd", location: n },
        189: { code: "NumpadSubtract", location: n },
        190: { code: "NumpadDecimal", location: n },
        191: { code: "NumpadDivide", location: n },
      });
    var m = {
      ShiftLeft: { key: "Shift" },
      ShiftRight: { key: "Shift" },
      ControlLeft: { key: "Control" },
      ControlRight: { key: "Control" },
      AltLeft: { key: "Alt" },
      AltRight: { key: "Alt" },
      MetaLeft: { key: "Meta" },
      MetaRight: { key: "Meta" },
      NumpadEnter: { key: "Enter" },
      Space: { key: " " },
      Digit0: { key: "0", shiftKey: ")" },
      Digit1: { key: "1", shiftKey: "!" },
      Digit2: { key: "2", shiftKey: "@" },
      Digit3: { key: "3", shiftKey: "#" },
      Digit4: { key: "4", shiftKey: "$" },
      Digit5: { key: "5", shiftKey: "%" },
      Digit6: { key: "6", shiftKey: "^" },
      Digit7: { key: "7", shiftKey: "&" },
      Digit8: { key: "8", shiftKey: "*" },
      Digit9: { key: "9", shiftKey: "(" },
      KeyA: { key: "a", shiftKey: "A" },
      KeyB: { key: "b", shiftKey: "B" },
      KeyC: { key: "c", shiftKey: "C" },
      KeyD: { key: "d", shiftKey: "D" },
      KeyE: { key: "e", shiftKey: "E" },
      KeyF: { key: "f", shiftKey: "F" },
      KeyG: { key: "g", shiftKey: "G" },
      KeyH: { key: "h", shiftKey: "H" },
      KeyI: { key: "i", shiftKey: "I" },
      KeyJ: { key: "j", shiftKey: "J" },
      KeyK: { key: "k", shiftKey: "K" },
      KeyL: { key: "l", shiftKey: "L" },
      KeyM: { key: "m", shiftKey: "M" },
      KeyN: { key: "n", shiftKey: "N" },
      KeyO: { key: "o", shiftKey: "O" },
      KeyP: { key: "p", shiftKey: "P" },
      KeyQ: { key: "q", shiftKey: "Q" },
      KeyR: { key: "r", shiftKey: "R" },
      KeyS: { key: "s", shiftKey: "S" },
      KeyT: { key: "t", shiftKey: "T" },
      KeyU: { key: "u", shiftKey: "U" },
      KeyV: { key: "v", shiftKey: "V" },
      KeyW: { key: "w", shiftKey: "W" },
      KeyX: { key: "x", shiftKey: "X" },
      KeyY: { key: "y", shiftKey: "Y" },
      KeyZ: { key: "z", shiftKey: "Z" },
      Numpad0: { key: "0" },
      Numpad1: { key: "1" },
      Numpad2: { key: "2" },
      Numpad3: { key: "3" },
      Numpad4: { key: "4" },
      Numpad5: { key: "5" },
      Numpad6: { key: "6" },
      Numpad7: { key: "7" },
      Numpad8: { key: "8" },
      Numpad9: { key: "9" },
      NumpadMultiply: { key: "*" },
      NumpadAdd: { key: "+" },
      NumpadComma: { key: "," },
      NumpadSubtract: { key: "-" },
      NumpadDecimal: { key: "." },
      NumpadDivide: { key: "/" },
      Semicolon: { key: ";", shiftKey: ":" },
      Equal: { key: "=", shiftKey: "+" },
      Comma: { key: ",", shiftKey: "<" },
      Minus: { key: "-", shiftKey: "_" },
      Period: { key: ".", shiftKey: ">" },
      Slash: { key: "/", shiftKey: "?" },
      Backquote: { key: "`", shiftKey: "~" },
      BracketLeft: { key: "[", shiftKey: "{" },
      Backslash: { key: "\\", shiftKey: "|" },
      BracketRight: { key: "]", shiftKey: "}" },
      Quote: { key: "'", shiftKey: '"' },
      IntlBackslash: { key: "\\", shiftKey: "|" },
    };
    h(m, "mac", { MetaLeft: { key: "Meta" }, MetaRight: { key: "Meta" } });
    var y,
      f,
      g,
      x = {
        Add: "+",
        Decimal: ".",
        Divide: "/",
        Subtract: "-",
        Multiply: "*",
        Spacebar: " ",
        Esc: "Escape",
        Nonconvert: "NonConvert",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Menu: "ContextMenu",
        MediaNextTrack: "MediaTrackNext",
        MediaPreviousTrack: "MediaTrackPrevious",
        SelectMedia: "MediaSelect",
        HalfWidth: "Hankaku",
        FullWidth: "Zenkaku",
        RomanCharacters: "Romaji",
        Crsel: "CrSel",
        Exsel: "ExSel",
        Zoom: "ZoomToggle",
      },
      w =
        ((y = d),
        (f = "code"),
        (g = {}),
        Object.keys(y).forEach(function (t) {
          var e = y[t];
          f in e && (g[e[f]] = e);
        }),
        g);
    try {
      var v = e && "location" in new KeyboardEvent("");
    } catch (t) {}
    function S(t) {
      var e = "keyCode" in t ? t.keyCode : "which" in t ? t.which : 0,
        o = (function () {
          if (v || "keyLocation" in t) {
            var o = v ? t.location : t.keyLocation;
            if (o && e in u[o]) return u[o][e];
          }
          return "keyIdentifier" in t && t.keyIdentifier in p
            ? p[t.keyIdentifier]
            : e in d
            ? d[e]
            : null;
        })();
      if (!o) return null;
      var i,
        s = (i = m[o.code])
          ? t.shiftKey && "shiftKey" in i
            ? i.shiftKey
            : i.key
          : o.code;
      return { code: o.code, key: s, location: o.location, keyCap: o.keyCap };
    }
    "KeyboardEvent" in t &&
      "defineProperty" in Object &&
      (function () {
        function t(t, e, o) {
          e in t || Object.defineProperty(t, e, o);
        }
        if (
          (t(KeyboardEvent.prototype, "code", {
            get: function () {
              var t = S(this);
              return t ? t.code : "";
            },
          }),
          "key" in KeyboardEvent.prototype)
        ) {
          var e = Object.getOwnPropertyDescriptor(
            KeyboardEvent.prototype,
            "key"
          );
          Object.defineProperty(KeyboardEvent.prototype, "key", {
            get: function () {
              var t = e.get.call(this);
              return x.hasOwnProperty(t) ? x[t] : t;
            },
          });
        }
        t(KeyboardEvent.prototype, "key", {
          get: function () {
            var t = S(this);
            return t && "key" in t ? t.key : "Unidentified";
          },
        }),
          t(KeyboardEvent.prototype, "location", {
            get: function () {
              var t = S(this);
              return t && "location" in t ? t.location : o;
            },
          }),
          t(KeyboardEvent.prototype, "locale", {
            get: function () {
              return "";
            },
          });
      })(),
      "queryKeyCap" in t.KeyboardEvent ||
        (t.KeyboardEvent.queryKeyCap = function (t, e) {
          if (((t = String(t)), !w.hasOwnProperty(t))) return "Undefined";
          if (e && "en-us" !== String(e).toLowerCase())
            throw Error("Unsupported locale");
          var o = w[t];
          return o.keyCap || o.code || "Undefined";
        }),
      (t.identifyKey = function (t) {
        if (!("code" in t)) {
          var e = S(t);
          (t.code = e ? e.code : ""),
            (t.key = e && "key" in e ? e.key : "Unidentified"),
            (t.location =
              "location" in t
                ? t.location
                : "keyLocation" in t
                ? t.keyLocation
                : e && "location" in e
                ? e.location
                : o),
            (t.locale = "");
        }
      });
  })(self),
  (function () {
    (ct.sound = {}),
      (ct.sound.howler = Howler),
      Howler.orientation(0, -1, 0, 0, 0, 1),
      Howler.pos(0, 0, 0),
      (ct.sound.howl = Howl);
    var t = [][0] || 2500;
    (ct.sound.useDepth = !1),
      (ct.sound.manageListenerPosition = !1),
      (ct.sound.detect = Howler.codecs),
      (ct.sound.init = function (t, e, o) {
        o = o || {};
        var i = [];
        e.wav && ".wav" === e.wav.slice(-4) && i.push(e.wav),
          e.mp3 && ".mp3" === e.mp3.slice(-4) && i.push(e.mp3),
          e.ogg && ".ogg" === e.ogg.slice(-4) && i.push(e.ogg);
        var s = !navigator.userAgent.startsWith("ct.js") && o.music,
          n = new Howl({
            src: i,
            autoplay: !1,
            preload: !s,
            html5: s,
            loop: o.loop,
            pool: o.poolSize || 5,
            onload: function () {
              s || ct.res.soundsLoaded++;
            },
            onloaderror: function () {
              ct.res.soundsError++,
                (n.buggy = !0),
                console.error(
                  "[ct.sound.howler] Oh no! We couldn't load " +
                    (e.wav || e.mp3 || e.ogg) +
                    "!"
                );
            },
          });
        s && ct.res.soundsLoaded++, (ct.res.sounds[t] = n);
      });
    (ct.sound.spawn = function (e, o, i) {
      "function" == typeof (o = o || {}) && ((i = o), (o = {}));
      var s = ct.res.sounds[e],
        n = s.play();
      if (
        (o.loop && s.loop(!0, n),
        void 0 !== o.volume && s.volume(o.volume, n),
        void 0 !== o.rate && s.rate(o.rate, n),
        void 0 !== o.x || o.position)
      ) {
        if (void 0 !== o.x) s.pos(o.x, o.y || 0, o.z || 0, n);
        else {
          const t = o.position;
          s.pos(t.x, t.y, o.z || (ct.sound.useDepth ? t.depth : 0), n);
        }
        ((e, o, i) => {
          e.pannerAttr(
            {
              coneInnerAngle: o.coneInnerAngle || 360,
              coneOuterAngle: o.coneOuterAngle || 360,
              coneOuterGain: o.coneOuterGain || 1,
              distanceModel: o.distanceModel || "linear",
              maxDistance: o.maxDistance || t,
              refDistance: o.refDistance || 1,
              rolloffFactor: o.rolloffFactor || 1,
              panningModel: o.panningModel || "HRTF",
            },
            i
          );
        })(s, o, n);
      }
      return i && s.once("end", i, n), n;
    }),
      (ct.sound.stop = function (t, e) {
        ct.sound.playing(t, e) && ct.res.sounds[t].stop(e);
      }),
      (ct.sound.pause = function (t, e) {
        ct.res.sounds[t].pause(e);
      }),
      (ct.sound.resume = function (t, e) {
        ct.res.sounds[t].play(e);
      }),
      (ct.sound.playing = function (t, e) {
        return ct.res.sounds[t].playing(e);
      }),
      (ct.sound.load = function (t) {
        ct.res.sounds[t].load();
      }),
      (ct.sound.volume = function (t, e, o) {
        return ct.res.sounds[t].volume(e, o);
      }),
      (ct.sound.fade = function (t, e, o, i) {
        if (ct.sound.playing(t, i)) {
          var s = ct.res.sounds[t],
            n = i ? s.volume(i) : s.volume;
          try {
            s.fade(n, e, o, i);
          } catch (o) {
            console.warn("Could not reliably fade a sound, reason:", o),
              ct.sound.volume(t, e, i);
          }
        }
      }),
      (ct.sound.moveListener = function (t, e, o) {
        Howler.pos(t, e, o || 0);
      }),
      (ct.sound.position = function (t, e, o, i, s) {
        if (ct.sound.playing(t, e)) {
          var n = ct.res.sounds[t],
            a = n.pos(e);
          n.pos(o, i, s || a[2], e);
        }
      }),
      (ct.sound.globalVolume = Howler.volume.bind(Howler)),
      (ct.sound.exists = function (t) {
        return t in ct.res.sounds;
      });
  })(),
  (function (ct) {
    var t = function (t, e) {
        ct.inputs.registry["touch." + t] = e;
      },
      e = 0,
      o = 0,
      i = 0,
      s = 0,
      n = 0,
      a = () => {
        t("Any", ct.touch.events.length > 0 ? 1 : 0),
          t("Double", ct.touch.events.length > 1 ? 1 : 0),
          t("Triple", ct.touch.events.length > 2 ? 1 : 0);
      },
      r = (t) => {
        const e = ct.pixiApp.view.getBoundingClientRect(),
          o = ((t.clientX - e.left) / e.width) * ct.camera.width,
          i = ((t.clientY - e.top) / e.height) * ct.camera.height,
          s = ct.u.uiToGameCoord(o, i);
        return {
          id: t.identifier,
          x: s.x,
          y: s.y,
          xui: o,
          yui: i,
          xprev: s.x,
          yprev: s.y,
          xuiprev: o,
          yuiprev: i,
          r: t.radiusX ? Math.max(t.radiusX, t.radiusY) : 0,
        };
      },
      c = (t) => {
        for (let e = 0; e < ct.touch.events.length; e++)
          if (ct.touch.events[e].id === t) return ct.touch.events[e];
        return !1;
      },
      l = (t) => {
        for (let e = 0; e < ct.touch.events.length; e++)
          if (ct.touch.events[e].id === t) return e;
        return -1;
      },
      h = function (t) {
        t.preventDefault();
        for (let o = 0, i = t.changedTouches.length; o < i; o++) {
          var e = r(t.changedTouches[o]);
          ct.touch.events.push(e),
            (ct.touch.x = e.x),
            (ct.touch.y = e.y),
            (ct.touch.xui = e.xui),
            (ct.touch.yui = e.yui);
        }
        a();
      },
      d = function (t) {
        t.preventDefault();
        for (let e = 0, o = t.changedTouches.length; e < o; e++) {
          const o = t.changedTouches[e],
            i = c(t.changedTouches[e].identifier);
          if (i) {
            const t = ct.pixiApp.view.getBoundingClientRect();
            (i.xui = ((o.clientX - t.left) / t.width) * ct.camera.width),
              (i.yui = ((o.clientY - t.top) / t.height) * ct.camera.height),
              ({ x: i.x, y: i.y } = ct.u.uiToGameCoord(i.xui, i.yui)),
              (i.r = o.radiusX ? Math.max(o.radiusX, o.radiusY) : 0),
              (ct.touch.x = i.x),
              (ct.touch.y = i.y),
              (ct.touch.xui = i.xui),
              (ct.touch.yui = i.yui);
          }
        }
      },
      p = function (t) {
        t.preventDefault();
        var e = t.changedTouches;
        for (let t = 0; t < e.length; t++) {
          const o = l(e[t].identifier);
          -1 !== o && ct.touch.released.push(ct.touch.events.splice(o, 1)[0]);
        }
        a();
      },
      u = function (t) {
        const e = ct.pixiApp.view.getBoundingClientRect();
        var o = {
          id: -1,
          xui: ((t.clientX - e.left) * ct.camera.width) / e.width,
          yui: ((t.clientY - e.top) * ct.camera.height) / e.height,
          r: 0,
        };
        ({ x: o.x, y: o.y } = ct.u.uiToGameCoord(o.xui, o.yui)),
          ct.touch.events.push(o),
          (ct.touch.x = o.x),
          (ct.touch.y = o.y),
          (ct.touch.xui = o.xui),
          (ct.touch.yui = o.yui),
          a();
      },
      m = function (t) {
        const e = ct.pixiApp.view.getBoundingClientRect(),
          o = c(-1);
        o &&
          ((o.xui = ((t.clientX - e.left) * ct.camera.width) / e.width),
          (o.yui = ((t.clientY - e.top) * ct.camera.height) / e.height),
          ({ x: o.x, y: o.y } = ct.u.uiToGameCoord(o.xui, o.yui)),
          (ct.touch.x = o.x),
          (ct.touch.y = o.y),
          (ct.touch.xui = o.xui),
          (ct.touch.yui = o.yui));
      },
      y = function () {
        (ct.touch.events = ct.touch.events.filter((t) => -1 !== t.id)), a();
      };
    ct.touch = {
      released: [],
      setupListeners() {
        document.addEventListener("touchstart", h, !1),
          document.addEventListener(
            "touchstart",
            () => {
              ct.touch.enabled = !0;
            },
            { once: !0 }
          ),
          document.addEventListener("touchend", p, !1),
          document.addEventListener("touchcancel", p, !1),
          document.addEventListener("touchmove", d, !1);
      },
      setupMouseListeners() {
        document.addEventListener("mousemove", m, !1),
          document.addEventListener("mouseup", y, !1),
          document.addEventListener("mousedown", u, !1);
      },
      enabled: !1,
      events: [],
      x: 0,
      y: 0,
      xprev: 0,
      yprev: 0,
      xui: 0,
      yui: 0,
      xuiprev: 0,
      yuiprev: 0,
      clear() {
        (ct.touch.events.length = 0), ct.touch.clearReleased(), a();
      },
      clearReleased() {
        ct.touch.released.length = 0;
      },
      collide(t, e, o) {
        var i = o ? ct.touch.released : ct.touch.events;
        if (void 0 !== e && !1 !== e) {
          const o = l(e);
          return (
            -1 !== o &&
            ct.place.collide(t, {
              x: i[o].x,
              y: i[o].y,
              shape: { type: i[o].r ? "circle" : "point", r: i[o].r },
              scale: { x: 1, y: 1 },
            })
          );
        }
        for (let e = 0, o = i.length; e < o; e++)
          if (
            ct.place.collide(t, {
              x: i[e].x,
              y: i[e].y,
              shape: { type: i[e].r ? "circle" : "point", r: i[e].r },
              scale: { x: 1, y: 1 },
            })
          )
            return !0;
        return !1;
      },
      collideUi(t, e, o) {
        var i = o ? ct.touch.released : ct.touch.events;
        if (void 0 !== e && !1 !== e) {
          const o = l(e);
          return (
            -1 !== o &&
            ct.place.collide(t, {
              x: i[o].xui,
              y: i[o].yui,
              shape: { type: i[o].r ? "circle" : "point", r: i[o].r },
              scale: { x: 1, y: 1 },
            })
          );
        }
        for (let e = 0, o = i.length; e < o; e++)
          if (
            ct.place.collide(t, {
              x: i[e].xui,
              y: i[e].yui,
              shape: { type: i[e].r ? "circle" : "point", r: i[e].r },
              scale: { x: 1, y: 1 },
            })
          )
            return !0;
        return !1;
      },
      hovers: (t, e, o) =>
        (ct.mouse && ct.mouse.hovers(t)) || ct.touch.collide(t, e, o),
      hoversUi: (t, e, o) =>
        (ct.mouse && ct.mouse.hoversUi(t)) || ct.touch.collideUi(t, e, o),
      getById: c,
      updateGestures: function () {
        let a = 0,
          r = 0;
        const c = ct.pixiApp.view.getBoundingClientRect();
        for (const t of ct.touch.events)
          (a += (t.clientX - c.left) / c.width),
            (r += (t.clientY - c.top) / c.height);
        (a /= ct.touch.events.length), (r /= ct.touch.events.length);
        let l = 0,
          h = s;
        if (ct.touch.events.length > 1) {
          const t = [ct.touch.events[0], ct.touch.events[1]].sort(
            (t, e) => t.id - e.id
          );
          (l = ct.u.pdn(t[0].x, t[0].y, t[1].x, t[1].y)),
            (h = ct.u.pdc(t[0].x, t[0].y, t[1].x, t[1].y));
        }
        e === ct.touch.events.length
          ? (ct.touch.events.length > 1
              ? (t("DeltaRotation", ct.u.degToRad(ct.u.deltaDir(n, l))),
                t("DeltaPinch", h / s - 1))
              : (t("DeltaPinch", 0), t("DeltaRotation", 0)),
            ct.touch.events.length
              ? (t("PanX", a - o), t("PanY", r - i))
              : (t("PanX", 0), t("PanY", 0)))
          : ((e = ct.touch.events.length),
            t("DeltaPinch", 0),
            t("DeltaRotation", 0),
            t("PanX", 0),
            t("PanY", 0)),
          (o = a),
          (i = r),
          (n = l),
          (s = h);
      },
    };
  })(ct),
  (function (ct) {
    const t = 0 * Math.PI;
    var e = function (e) {
      switch (e.shape.type) {
        case "rect":
          return (function (t) {
            const { shape: e } = t,
              o = new SSCD.Vector(t.x, t.y);
            if (0 === t.angle)
              return (
                (o.x -=
                  t.scale.x > 0 ? e.left * t.scale.x : -t.scale.x * e.right),
                (o.y -=
                  t.scale.y > 0 ? e.top * t.scale.y : -e.bottom * t.scale.y),
                new SSCD.Rectangle(
                  o,
                  new SSCD.Vector(
                    Math.abs((e.left + e.right) * t.scale.x),
                    Math.abs((e.bottom + e.top) * t.scale.y)
                  )
                )
              );
            const i = ct.u.rotate(
                -e.left * t.scale.x,
                -e.top * t.scale.y,
                t.angle
              ),
              s = ct.u.rotate(
                -e.left * t.scale.x,
                e.bottom * t.scale.y,
                t.angle
              ),
              n = ct.u.rotate(
                e.right * t.scale.x,
                e.bottom * t.scale.y,
                t.angle
              ),
              a = ct.u.rotate(e.right * t.scale.x, -e.top * t.scale.y, t.angle);
            return new SSCD.LineStrip(
              o,
              [
                new SSCD.Vector(i.x, i.y),
                new SSCD.Vector(s.x, s.y),
                new SSCD.Vector(n.x, n.y),
                new SSCD.Vector(a.x, a.y),
              ],
              !0
            );
          })(e);
        case "circle":
          return (function (e) {
            const { shape: o } = e,
              i = new SSCD.Vector(e.x, e.y);
            if (Math.abs(e.scale.x) === Math.abs(e.scale.y))
              return new SSCD.Circle(i, o.r * Math.abs(e.scale.x));
            const s = [];
            for (let i = 0; i < 16; i++) {
              const n = [
                Math.sin((t / 16) * i) * o.r * e.scale.x,
                Math.cos((t / 16) * i) * o.r * e.scale.y,
              ];
              if (0 !== e.angle) {
                const { x: t, y: o } = ct.u.rotate(n[0], n[1], e.angle);
                s.push(t, o);
              } else s.push(n);
            }
            return new SSCD.LineStrip(i, s, !0);
          })(e);
        case "strip":
          return (function (t) {
            const { shape: e } = t,
              o = new SSCD.Vector(t.x, t.y),
              i = [];
            if (0 !== t.angle)
              for (const o of e.points) {
                const { x: e, y: s } = ct.u.rotate(
                  o.x * t.scale.x,
                  o.y * t.scale.y,
                  t.angle
                );
                i.push(new SSCD.Vector(e, s));
              }
            else
              for (const o of e.points)
                i.push(new SSCD.Vector(o.x * t.scale.x, o.y * t.scale.y));
            return new SSCD.LineStrip(o, i, Boolean(e.closedStrip));
          })(e);
        case "line":
          return (function (t) {
            const { shape: e } = t;
            if (0 !== t.angle) {
              const { x: o, y: i } = ct.u.rotate(
                  e.x1 * t.scale.x,
                  e.y1 * t.scale.y,
                  t.angle
                ),
                { x: s, y: n } = ct.u.rotate(
                  e.x2 * t.scale.x,
                  e.y2 * t.scale.y,
                  t.angle
                );
              return new SSCD.Line(
                new SSCD.Vector(t.x + o, t.y + i),
                new SSCD.Vector(s - o, n - i)
              );
            }
            return new SSCD.Line(
              new SSCD.Vector(t.x + e.x1 * t.scale.x, t.y + e.y1 * t.scale.y),
              new SSCD.Vector(
                (e.x2 - e.x1) * t.scale.x,
                (e.y2 - e.y1) * t.scale.y
              )
            );
          })(e);
        default:
          return new SSCD.Circle(new SSCD.Vector(e.x, e.y), 0);
      }
    };
    const o = (t, e, o) => e.template === o,
      i = (t, e, o) => !o || o === e.cgroup,
      s = function (t, o, i, s, n, a, r) {
        const c = t.x,
          l = t.y,
          h = t._shape;
        let d, p;
        void 0 === o || (c === o && l === i)
          ? ((d = t.$chashes || ct.place.getHashes(t)),
            (t._shape = t._shape || e(t)))
          : ((t.x = o),
            (t.y = i),
            (t._shape = e(t)),
            (d = ct.place.getHashes(t))),
          n && (p = []);
        for (const e of d) {
          const o = s[e];
          if (o)
            for (const e of o)
              if (e !== t && a(t, e, r) && ct.place.collide(t, e)) {
                if (!n)
                  return (
                    (c === t.x && l === t.y) ||
                      ((t.x = c), (t.y = l), (t._shape = h)),
                    e
                  );
                p.includes(e) || p.push(e);
              }
        }
        return (
          (c === t.x && l === t.y) || ((t.x = c), (t.y = l), (t._shape = h)),
          !!n && p
        );
      };
    (ct.place = {
      m: 1,
      gridX: 512,
      gridY: 512,
      grid: {},
      tileGrid: {},
      getHashes(t) {
        var e = [],
          o = Math.round(t.x / ct.place.gridX),
          i = Math.round(t.y / ct.place.gridY),
          s = Math.sign(t.x - ct.place.gridX * o),
          n = Math.sign(t.y - ct.place.gridY * i);
        return (
          e.push(`${o}:${i}`),
          s && (e.push(`${o + s}:${i}`), n && e.push(`${o + s}:${i + n}`)),
          n && e.push(`${o}:${i + n}`),
          e
        );
      },
      drawDebugGraphic(t) {
        const o = this._shape || e(this),
          i = this.$cDebugCollision;
        let s = 65535;
        if (
          (this instanceof Copy
            ? (s = 26367)
            : this instanceof PIXI.Sprite && (s = 6684927),
          this.$cHadCollision && (s = 65280),
          i.lineStyle(2, s),
          o instanceof SSCD.Rectangle)
        ) {
          const e = o.get_position(),
            n = o.get_size();
          i.beginFill(s, 0.1),
            t
              ? i.drawRect(e.x, e.y, n.x, n.y)
              : i.drawRect(e.x - this.x, e.y - this.y, n.x, n.y),
            i.endFill();
        } else if (o instanceof SSCD.LineStrip)
          if (t) {
            i.moveTo(o.__points[0].x + this.x, o.__points[0].y + this.y);
            for (let t = 1; t < o.__points.length; t++)
              i.lineTo(o.__points[t].x + this.x, o.__points[t].y + this.y);
          } else {
            i.moveTo(o.__points[0].x, o.__points[0].y);
            for (let t = 1; t < o.__points.length; t++)
              i.lineTo(o.__points[t].x, o.__points[t].y);
          }
        else if (o instanceof SSCD.Circle && o.get_radius() > 0)
          i.beginFill(s, 0.1),
            t
              ? i.drawCircle(this.x, this.y, o.get_radius())
              : i.drawCircle(0, 0, o.get_radius()),
            i.endFill();
        else if (o instanceof SSCD.Line)
          if (t) {
            const t = o.get_p1(),
              e = o.get_p2();
            i.moveTo(t.x, t.y).lineTo(e.x, e.y);
          } else
            i.moveTo(o.__position.x, o.__position.y).lineTo(
              o.__position.x + o.__dest.x,
              o.__position.y + o.__dest.y
            );
        else
          t
            ? i
                .moveTo(-16 + this.x, -16 + this.y)
                .lineTo(16 + this.x, 16 + this.y)
                .moveTo(-16 + this.x, 16 + this.y)
                .lineTo(16 + this.x, -16 + this.y)
            : i.moveTo(-16, -16).lineTo(16, 16).moveTo(-16, 16).lineTo(16, -16);
      },
      collide(t, o) {
        if (
          ((t._shape = t._shape || e(t)),
          (o._shape = o._shape || e(o)),
          "strip" === t._shape.__type ||
            "strip" === o._shape.__type ||
            "complex" === t._shape.__type ||
            "complex" === o._shape.__type)
        ) {
          const e = t._shape.get_aabb(),
            i = o._shape.get_aabb();
          if (!e.intersects(i)) return !1;
        }
        return !!SSCD.CollisionManager.test_collision(t._shape, o._shape);
      },
      occupied(t, e, o, n) {
        "number" != typeof o && ((n = e), (e = void 0), (o = void 0));
        const a = s(t, e, o, ct.place.grid, !1, i, n);
        return a || s(t, e, o, ct.place.tileGrid, !1, i, n);
      },
      occupiedMultiple(t, e, o, n) {
        "number" != typeof o && ((n = e), (e = void 0), (o = void 0));
        const a = s(t, e, o, ct.place.grid, !0, i, n),
          r = s(t, e, o, ct.place.tileGrid, !0, i, n);
        return a.concat(r);
      },
      free: (t, e, o, i) => !ct.place.occupied(t, e, o, i),
      meet: (t, e, i, n) => (
        "number" != typeof i && ((n = e), (e = void 0), (i = void 0)),
        s(t, e, i, ct.place.grid, !1, o, n)
      ),
      meetMultiple: (t, e, i, n) => (
        "number" != typeof i && ((n = e), (e = void 0), (i = void 0)),
        s(t, e, i, ct.place.grid, !0, o, n)
      ),
      copies: (t, e, o, n) => (
        "number" != typeof o && ((n = e), (e = void 0), (o = void 0)),
        s(t, e, o, ct.place.grid, !1, i, n)
      ),
      copiesMultiple: (t, e, o, n) => (
        "number" != typeof o && ((n = e), (e = void 0), (o = void 0)),
        s(t, e, o, ct.place.grid, !0, i, n)
      ),
      tiles: (t, e, o, n) => (
        "number" != typeof o && ((n = e), (e = void 0), (o = void 0)),
        s(t, e, o, ct.place.tileGrid, !1, i, n)
      ),
      tilesMultiple: (t, e, o, n) => (
        "number" != typeof o && ((n = e), (e = void 0), (o = void 0)),
        s(t, e, o, ct.place.tileGrid, !0, i, n)
      ),
      lastdist: null,
      nearest(t, e, o) {
        const i = ct.templates.list[o];
        if (i.length > 0) {
          var s = Math.hypot(t - i[0].x, e - i[0].y),
            n = i[0];
          for (const o of i)
            Math.hypot(t - o.x, e - o.y) < s &&
              ((s = Math.hypot(t - o.x, e - o.y)), (n = o));
          return (ct.place.lastdist = s), n;
        }
        return !1;
      },
      furthest(t, e, o) {
        const i = ct.templates.list[o];
        if (i.length > 0) {
          var s = Math.hypot(t - i[0].x, e - i[0].y),
            n = i[0];
          for (const o of i)
            Math.hypot(t - o.x, e - o.y) > s &&
              ((s = Math.hypot(t - o.x, e - o.y)), (n = o));
          return (ct.place.lastdist = s), n;
        }
        return !1;
      },
      enableTilemapCollisions(t, o) {
        const i = o || t.cgroup;
        if (t.addedCollisions)
          throw new Error(
            "[ct.place] The tilemap already has collisions enabled."
          );
        t.cgroup = i;
        for (const o of t.pixiTiles) {
          (o._shape = e(o)),
            (o.cgroup = i),
            (o.$chashes = ct.place.getHashes(o));
          for (const t of o.$chashes)
            t in ct.place.tileGrid
              ? ct.place.tileGrid[t].push(o)
              : (ct.place.tileGrid[t] = [o]);
          o.depth = t.depth;
        }
        t.addedCollisions = !0;
      },
      moveAlong(t, e, o, i, s) {
        if (!o) return !1;
        "number" == typeof i && ((s = i), (i = void 0)),
          (s = Math.abs(s || 1)),
          o < 0 && ((o *= -1), (e += 180));
        var n = Math.cos((e * Math.PI) / -180) * s,
          a = Math.sin((e * Math.PI) / -180) * s;
        for (let e = 0; e < o; e += s) {
          const e = ct.place.occupied(t, t.x + n, t.y + a, i);
          if (e) return e;
          (t.x += n), (t.y += a), delete t._shape;
        }
        return !1;
      },
      moveByAxes(t, e, o, i, s) {
        if ((e === o) === 0) return !1;
        "number" == typeof i && ((s = i), (i = void 0));
        const n = { x: !1, y: !1 };
        for (s = Math.abs(s || 1); Math.abs(e) > s; ) {
          const o = ct.place.occupied(t, t.x + Math.sign(e) * s, t.y, i);
          if (o) {
            n.x = o;
            break;
          }
          (t.x += Math.sign(e) * s), (e -= Math.sign(e) * s);
        }
        for (; Math.abs(o) > s; ) {
          const e = ct.place.occupied(t, t.x, t.y + Math.sign(o) * s, i);
          if (e) {
            n.y = e;
            break;
          }
          (t.y += Math.sign(o) * s), (o -= Math.sign(o) * s);
        }
        return (
          Math.abs(e) < s && ct.place.free(t, t.x + e, t.y, i) && (t.x += e),
          Math.abs(o) < s && ct.place.free(t, t.x, t.y + o, i) && (t.y += o),
          !(!n.x && !n.y) && n
        );
      },
      go(t, e, o, i, s) {
        if (ct.u.pdc(t.x, t.y, e, o) < i)
          return void (
            ct.place.free(t, e, o, s) && ((t.x = e), (t.y = o), delete t._shape)
          );
        var n = ct.u.pdn(t.x, t.y, e, o);
        let a = t.x + ct.u.ldx(i, n),
          r = t.y + ct.u.ldy(i, n);
        if (ct.place.free(t, a, r, s))
          (t.x = a), (t.y = r), delete t._shape, (t.dir = n);
        else
          for (var c = -1; c <= 1; c += 2)
            for (var l = 30; l < 150; l += 30)
              if (
                ((a = t.x + ct.u.ldx(i, n + l * ct.place.m * c)),
                (r = t.y + ct.u.ldy(i, n + l * ct.place.m * c)),
                ct.place.free(t, a, r, s))
              )
                return (
                  (t.x = a),
                  (t.y = r),
                  delete t._shape,
                  void (t.dir = n + l * ct.place.m * c)
                );
      },
      traceCustom(t, e, o, i) {
        const s = [];
        if (!e)
          return i ? ct.place.occupiedMultiple(t, o) : ct.place.occupied(t, o);
        for (const e of ct.stack)
          if ((!o || e.cgroup === o) && ct.place.collide(t, e)) {
            if (!i) return e;
            s.push(e);
          }
        for (const e of ct.templates.list.TILEMAP)
          if (e.addedCollisions && (!o || e.cgroup === o))
            for (const o of e.pixiTiles)
              if (ct.place.collide(t, o)) {
                if (!i) return o;
                s.push(o);
              }
        return !!i && s;
      },
      traceLine(t, e, o) {
        let i = !1;
        (Math.abs(t.x1 - t.x2) > ct.place.gridX ||
          Math.abs(t.y1 - t.y2) > ct.place.gridY) &&
          (i = !0);
        const s = {
            x: t.x1,
            y: t.y1,
            scale: { x: 1, y: 1 },
            rotation: 0,
            angle: 0,
            shape: {
              type: "line",
              x1: 0,
              y1: 0,
              x2: t.x2 - t.x1,
              y2: t.y2 - t.y1,
            },
          },
          n = ct.place.traceCustom(s, i, e, o);
        return (
          o &&
            n.sort(function (e, o) {
              return (
                ct.u.pdc(t.x1, t.y1, e.x, e.y) - ct.u.pdc(t.x1, t.y1, o.x, o.y)
              );
            }),
          n
        );
      },
      traceRect(t, e, o) {
        let i = !1;
        "x1" in (t = { ...t }) &&
          ((t.x = t.x1),
          (t.y = t.y1),
          (t.width = t.x2 - t.x1),
          (t.height = t.y2 - t.y1)),
          (Math.abs(t.width) > ct.place.gridX ||
            Math.abs(t.height) > ct.place.gridY) &&
            (i = !0);
        const s = {
          x: t.x,
          y: t.y,
          scale: { x: 1, y: 1 },
          rotation: 0,
          angle: 0,
          shape: {
            type: "rect",
            left: 0,
            top: 0,
            right: t.width,
            bottom: t.height,
          },
        };
        return ct.place.traceCustom(s, i, e, o);
      },
      traceCircle(t, e, o) {
        let i = !1;
        (2 * t.radius > ct.place.gridX || 2 * t.radius > ct.place.gridY) &&
          (i = !0);
        const s = {
          x: t.x,
          y: t.y,
          scale: { x: 1, y: 1 },
          rotation: 0,
          angle: 0,
          shape: { type: "circle", r: t.radius },
        };
        return ct.place.traceCustom(s, i, e, o);
      },
      tracePolyline(t, e, o) {
        const i = {
          x: 0,
          y: 0,
          scale: { x: 1, y: 1 },
          rotation: 0,
          angle: 0,
          shape: { type: "strip", points: t },
        };
        return ct.place.traceCustom(i, !0, e, o);
      },
      tracePoint(t, e, o) {
        const i = {
          x: t.x,
          y: t.y,
          scale: { x: 1, y: 1 },
          rotation: 0,
          angle: 0,
          shape: { type: "point" },
        };
        return ct.place.traceCustom(i, !1, e, o);
      },
    }),
      (ct.place.traceRectange = ct.place.traceRect),
      setInterval(function () {
        ct.place.m *= -1;
      }, 789);
  })(ct),
  (function (ct) {
    document.body.style.overflow = "hidden";
    var t = ct.pixiApp.view;
    var e = function () {
        const { mode: e } = ct.fittoscreen,
          o = (ct.highDensity && window.devicePixelRatio) || 1,
          i = window.innerWidth / ct.roomWidth,
          s = window.innerHeight / ct.roomHeight;
        let n = Math.min(i, s);
        var a, r, c, l;
        "fastScaleInteger" === e && (n = n < 1 ? n : Math.floor(n)),
          "expandViewport" === e || "expand" === e
            ? ((a = Math.ceil(window.innerWidth * o)),
              (r = Math.ceil(window.innerHeight * o)),
              (c = window.innerWidth),
              (l = window.innerHeight))
            : "fastScale" === e || "fastScaleInteger" === e
            ? ((a = Math.ceil(ct.roomWidth * o)),
              (r = Math.ceil(ct.roomHeight * o)),
              (c = ct.roomWidth),
              (l = ct.roomHeight))
            : ("scaleFit" !== e && "scaleFill" !== e) ||
              ("scaleFill" === e
                ? ((a = Math.ceil(ct.roomWidth * i * o)),
                  (r = Math.ceil(ct.roomHeight * s * o)),
                  (c = window.innerWidth / n),
                  (l = window.innerHeight / n))
                : ((a = Math.ceil(ct.roomWidth * n * o)),
                  (r = Math.ceil(ct.roomHeight * n * o)),
                  (c = ct.roomWidth),
                  (l = ct.roomHeight))),
          ct.pixiApp.renderer.resize(a, r),
          (ct.pixiApp.stage.scale.x = ct.pixiApp.stage.scale.y =
            "scaleFill" !== e && "scaleFit" !== e ? o : o * n),
          (t.style.width = Math.ceil(a / o) + "px"),
          (t.style.height = Math.ceil(r / o) + "px"),
          ct.camera && ((ct.camera.width = c), (ct.camera.height = l)),
          (function (e, o) {
            "fastScale" === e || "fastScaleInteger" === e
              ? ((t.style.transform = `translate(-50%, -50%) scale(${o})`),
                (t.style.position = "absolute"),
                (t.style.top = "50%"),
                (t.style.left = "50%"))
              : "expandViewport" === e || "expand" === e || "scaleFill" === e
              ? ((t.style.position = "static"),
                (t.style.top = "unset"),
                (t.style.left = "unset"))
              : "scaleFit" === e &&
                ((t.style.transform = "translate(-50%, -50%)"),
                (t.style.position = "absolute"),
                (t.style.top = "50%"),
                (t.style.left = "50%"));
          })(e, n);
      },
      o = function t() {
        !(function () {
          try {
            const t =
              require("electron").remote.BrowserWindow.getFocusedWindow();
            return void t.setFullScreen(!t.isFullScreen());
          } catch (t) {}
          var t =
              document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement,
            e = document.getElementById("ct"),
            o =
              e.requestFullscreen ||
              e.webkitRequestFullscreen ||
              e.mozRequestFullScreen ||
              e.msRequestFullscreen,
            i =
              document.exitFullscreen ||
              document.webkitExitFullscreen ||
              document.mozCancelFullScreen ||
              document.msExitFullscreen;
          if (t) i && i.call(document);
          else {
            var s = o.call(e);
            s &&
              s.catch(function (t) {
                console.error("[ct.fittoscreen]", t);
              });
          }
        })(),
          document.removeEventListener("mouseup", t),
          document.removeEventListener("keyup", t),
          document.removeEventListener("click", t);
      };
    window.addEventListener("resize", e),
      (ct.fittoscreen = e),
      (ct.fittoscreen.toggleFullscreen = function () {
        document.addEventListener("mouseup", o),
          document.addEventListener("keyup", o),
          document.addEventListener("click", o);
      });
    var i = "scaleFit";
    Object.defineProperty(ct.fittoscreen, "mode", {
      configurable: !1,
      enumerable: !0,
      set(t) {
        i = t;
      },
      get: () => i,
    }),
      (ct.fittoscreen.mode = i),
      (ct.fittoscreen.getIsFullscreen = function () {
        try {
          return require("electron").remote.BrowserWindow.getFocusedWindow
            .isFullScreen;
        } catch (t) {}
        return (
          document.fullscreen ||
          document.webkitIsFullScreen ||
          document.mozFullScreen
        );
      });
  })(ct),
  (function (ct) {
    const t = document.querySelector(".ct-aLoadingScreen"),
      e = t.querySelector(".ct-aLoadingBar"),
      o = window.dragonBones ? dragonBones.PixiFactory.factory : null;
    (ct.res = {
      sounds: {},
      textures: {},
      skeletons: {},
      loadScript(t = ct.u.required("url", "ct.res.loadScript")) {
        var e = document.createElement("script");
        e.src = t;
        const o = new Promise((t, o) => {
          (e.onload = () => {
            t();
          }),
            (e.onerror = () => {
              o();
            });
        });
        return document.getElementsByTagName("head")[0].appendChild(e), o;
      },
      loadTexture(
        t = ct.u.required("url", "ct.res.loadTexture"),
        e = ct.u.required("name", "ct.res.loadTexture"),
        o = {}
      ) {
        const i = new PIXI.Loader();
        return (
          i.add(t, t),
          new Promise((e, o) => {
            i.load((t, o) => {
              e(o);
            }),
              i.onError.add(() => {
                o(new Error("[ct.res] Could not load image " + t));
              });
          }).then((i) => {
            const s = [i[t].texture];
            return (
              (s.shape = s[0].shape = o.shape || {}),
              (s[0].defaultAnchor = new PIXI.Point(
                o.anchor.x || 0,
                o.anchor.x || 0
              )),
              (ct.res.textures[e] = s),
              s
            );
          })
        );
      },
      loadDragonBonesSkeleton(
        t,
        e,
        o,
        i = ct.u.required("name", "ct.res.loadDragonBonesSkeleton")
      ) {
        const s = dragonBones.PixiFactory.factory,
          n = new PIXI.Loader();
        return (
          n.add(t, t).add(e, e).add(o, o),
          new Promise((i, s) => {
            n.load(() => {
              i();
            }),
              n.onError.add(() => {
                s(
                  new Error(
                    `[ct.res] Could not load skeleton with _ske.json: ${t}, _tex.json: ${e}, _tex.png: ${o}.`
                  )
                );
              });
          }).then(() => {
            s.parseDragonBonesData(n.resources[t].data),
              s.parseTextureAtlasData(
                n.resources[e].data,
                n.resources[o].texture
              ),
              (ct.res.skeletons[i] = n.resources[t].data);
          })
        );
      },
      loadAtlas(t = ct.u.required("url", "ct.res.loadAtlas")) {
        const e = new PIXI.Loader();
        return (
          e.add(t, t),
          new Promise((o, i) => {
            e.load((t, e) => {
              o(e);
            }),
              e.onError.add(() => {
                i(new Error("[ct.res] Could not load atlas " + t));
              });
          }).then((e) => {
            const o = e[t].spritesheet;
            for (const t in o.animations) {
              const e = o.animations[t],
                i = o.data.animations;
              for (let s = 0, n = i[t].length; s < n; s++) {
                const n = i[t][s];
                e[s].shape = o.data.frames[n].shape;
              }
              (e.shape = e[0].shape || {}), (ct.res.textures[t] = e);
            }
            return Object.keys(o.animations);
          })
        );
      },
      loadBitmapFont(
        t = ct.u.required("url", "ct.res.loadBitmapFont"),
        e = ct.u.required("name", "ct.res.loadBitmapFont")
      ) {
        const o = new PIXI.Loader();
        return (
          o.add(e, t),
          new Promise((e, i) => {
            o.load((t, o) => {
              e(o);
            }),
              o.onError.add(() => {
                i(new Error("[ct.res] Could not load bitmap font " + t));
              });
          })
        );
      },
      loadGame() {
        const o = ["./img/a0.json"],
          i = {
            pausedbg: {
              source: "./img/t0.png",
              shape: { type: "rect", top: 0, bottom: 800, left: 0, right: 544 },
              anchor: { x: 0, y: 0 },
            },
            screen_intro2: {
              source: "./img/t1.png",
              shape: { type: "rect", top: 0, bottom: 960, left: 0, right: 544 },
              anchor: { x: 0, y: 0 },
            },
            screen_intro: {
              source: "./img/t2.png",
              shape: { type: "rect", top: 0, bottom: 960, left: 0, right: 544 },
              anchor: { x: 0, y: 0 },
            },
            screen_end: {
              source: "./img/t3.png",
              shape: { type: "rect", top: 0, bottom: 960, left: 0, right: 544 },
              anchor: { x: 0, y: 0 },
            },
            "linea-cubierta": {
              source: "./img/t4.png",
              shape: {
                type: "rect",
                top: 120,
                bottom: 120,
                left: 44,
                right: 0,
              },
              anchor: { x: 1, y: 0.5 },
            },
            bottom: {
              source: "./img/t5.png",
              shape: {
                type: "rect",
                top: 156,
                bottom: 0,
                left: 272,
                right: 272,
              },
              anchor: { x: 0.5, y: 1 },
            },
            Clouds: {
              source: "./img/t6.png",
              shape: { type: "rect", top: 0, bottom: 560, left: 0, right: 344 },
              anchor: { x: 0, y: 0 },
            },
            Floor: {
              source: "./img/t7.png",
              shape: { type: "rect", top: 0, bottom: 178, left: 0, right: 501 },
              anchor: { x: 0, y: 0 },
            },
            Inst: {
              source: "./img/t8.png",
              shape: { type: "rect", top: 0, bottom: 85, left: 0, right: 297 },
              anchor: { x: 0, y: 0 },
            },
            "1minuto": {
              source: "./img/t9.png",
              shape: { type: "rect", top: 0, bottom: 191, left: 0, right: 442 },
              anchor: { x: 0, y: 0 },
            },
          },
          s = [
            {
              name: "wave",
              wav: !1,
              mp3: "./snd/efe1e943-a521-4ffa-9341-067dd7e77d99.mp3",
              ogg: !1,
              poolSize: 5,
              isMusic: !1,
            },
            {
              name: "end",
              wav: !1,
              mp3: "./snd/4db9c70a-ee26-4848-96d6-91f8a462ab0a.mp3",
              ogg: !1,
              poolSize: 5,
              isMusic: !1,
            },
            {
              name: "sillokill",
              wav: !1,
              mp3: "./snd/3e2b2be2-fd47-468e-973d-f75dff920188.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "grab",
              wav: !1,
              mp3: "./snd/fb8310ff-fc9f-4987-a5de-06bfc44720f3.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "release",
              wav: !1,
              mp3: "./snd/eb7c55c9-0611-4676-a0e4-cc7f1f0e64cb.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "ok",
              wav: !1,
              mp3: "./snd/b955c811-ce69-4017-8cb2-51fc902aff7c.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "coin1",
              wav: !1,
              mp3: "./snd/coin1.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "coin2",
              wav: !1,
              mp3: "./snd/coin2.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "coin3",
              wav: !1,
              mp3: "./snd/coin3.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
            {
              name: "okgold",
              wav: !1,
              mp3: "./snd/0d7328de-bd1f-4bf6-86cc-3c0c978f3073.mp3",
              ogg: !1,
              poolSize: 2,
              isMusic: !1,
            },
          ],
          n = {},
          a = [];
        if (s.length && !ct.sound)
          throw new Error(
            "[ct.res] No sound system found. Make sure you enable one of the `sound` catmods. If you don't need sounds, remove them from your ct.js project."
          );
        const r = o.length;
        let c = 0;
        const l = [];
        l.push(
          ...o.map((o) =>
            ct.res.loadAtlas(o).then((o) => {
              var i;
              return (
                c++,
                (i = (c / r) * 100),
                t.setAttribute("data-progress", i),
                (e.style.width = i + "%"),
                o
              );
            })
          )
        );
        for (const t in i)
          l.push(
            ct.res.loadTexture(i[t].source, t, {
              anchor: i[t].anchor,
              shape: i[t].shape,
            })
          );
        for (const t in n) l.push(ct.res.loadBitmapFont(n[t], t));
        for (const t of a) ct.res.loadDragonBonesSkeleton(...t);
        for (const t of s)
          ct.sound.init(
            t.name,
            { wav: t.wav || !1, mp3: t.mp3 || !1, ogg: t.ogg || !1 },
            { poolSize: t.poolSize, music: t.isMusic }
          );
        Promise.all(l)
          .then(() => {
            ct.mouse.setupListeners(),
              ct.touch.setupListeners(),
              ct.touch.setupMouseListeners(),
              Object.defineProperty(ct.templates.Copy.prototype, "cgroup", {
                set: function (t) {
                  this.$cgroup = t;
                },
                get: function () {
                  return this.$cgroup;
                },
              }),
              Object.defineProperty(
                ct.templates.Copy.prototype,
                "moveContinuous",
                {
                  value: function (t, e) {
                    return (
                      this.gravity &&
                        ((this.hspeed +=
                          this.gravity *
                          ct.delta *
                          Math.cos((this.gravityDir * Math.PI) / 180)),
                        (this.vspeed +=
                          this.gravity *
                          ct.delta *
                          Math.sin((this.gravityDir * Math.PI) / 180))),
                      ct.place.moveAlong(
                        this,
                        this.direction,
                        this.speed * ct.delta,
                        t,
                        e
                      )
                    );
                  },
                }
              ),
              Object.defineProperty(
                ct.templates.Copy.prototype,
                "moveContinuousByAxes",
                {
                  value: function (t, e) {
                    return (
                      this.gravity &&
                        ((this.hspeed +=
                          this.gravity *
                          ct.delta *
                          Math.cos((this.gravityDir * Math.PI) / 180)),
                        (this.vspeed +=
                          this.gravity *
                          ct.delta *
                          Math.sin((this.gravityDir * Math.PI) / 180))),
                      ct.place.moveByAxes(
                        this,
                        this.hspeed * ct.delta,
                        this.vspeed * ct.delta,
                        t,
                        e
                      )
                    );
                  },
                }
              ),
              Object.defineProperty(
                ct.templates.Tilemap.prototype,
                "enableCollisions",
                {
                  value: function (t) {
                    ct.place.enableTilemapCollisions(this, t);
                  },
                }
              ),
              t.classList.add("hidden"),
              ct.pixiApp.ticker.add(ct.loop),
              ct.rooms.forceSwitch(ct.rooms.starting);
          })
          .catch(console.error);
      },
      getTexture(t, e) {
        if ((null === e && (e = void 0), -1 === t))
          return void 0 !== e ? PIXI.Texture.EMPTY : [PIXI.Texture.EMPTY];
        if (!(t in ct.res.textures))
          throw new Error("Attempt to get a non-existent texture " + t);
        const o = ct.res.textures[t];
        return void 0 !== e ? o[e] : o;
      },
      getTextureShape(t) {
        if (-1 === t) return {};
        if (!(t in ct.res.textures))
          throw new Error(
            "Attempt to get a shape of a non-existent texture " + t
          );
        return ct.res.textures[t].shape;
      },
      makeSkeleton(t, e) {
        const i = ct.res.skeletons[t],
          s = o.buildArmatureDisplay("Armature", i.name, e);
        return (
          (s.ctName = t),
          s.on(dragonBones.EventObject.SOUND_EVENT, function (t) {
            ct.sound.exists(t.name)
              ? ct.sound.spawn(t.name)
              : console.warn(
                  `Skeleton ${s.ctName} tries to play a non-existing sound ${t.name} at animation ${s.animation.lastAnimationName}`
                );
          }),
          s
        );
      },
    }),
      ct.res.loadGame();
  })(ct),
  (ct.content = JSON.parse("{}")),
  console.log("Loading Fonts");

{ // must be inside our own scope here so that when we are unloaded everything disappears
  // we also define functions using 'let fn = function() {..}' for the same reason. function decls are global

let settings = Object.assign(
  require("Storage").readJSON("slopeclockbig.default.json", true) || {},
  require("Storage").readJSON("slopeclockbig.json", true) || {}
);
// Actual height 71 (81 - 11)
//const fontBitmap = E.toString(require('heatshrink').decompress(atob('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')));
// Actual height 35 (37 - 3)
const fontBitmap = E.toString(require('heatshrink').decompress(atob('AAUD4AFDh/gAoc/BYn/AocB/+ADgf/CAcH/wiE/gFDj/4FAnwFxM/JhYFEnwKEFxJLBFwcf/5jD/5dDh4FBLoV/AoJbCAgJdCBQQoBNgIWDEwP/HIU/E4gWBIgYKBHARDBQgYiBIYYzBR4iDEj6mDgE4aJcBCQl/HQYpBGoZSCIwgFCMYZ/EAoQWCAoR6CEYJdBAoYcDGoKRCAoUfBwM/SQLnCAQV/RQM/O4KbCeAIoBGIWAgYxDFAIFBAQRLBFYIuBKIYuBKIYoBAoYxCLogFCbw4FDXoQRCT4QFBTArDDIIQATn4CBEYV+NIJdBAQUDIAICCg4vBTwZjLJgIECIIK7DR4S7ERhK+CFwh6CFwQoDPYSJCMAiBDLQYACLQQALjAFEPQLqCewTqCLoLtEFYLqDFYN/LoXgCwJdBv/AOIJdBEQJrB4AlCLoUD/yICFYTfDQwX9GIQFB/aME86MEx6MD/0fRgIFB/E/XYfgRgQ4CRgS5BRgd/+CMDjzqDAAsQAok8AQMPEQSvBFAICCgYoBRgN/R4UP+H+g5dC8P8BAI5B4f4SoIiBx5XBRgUf+BdBRgM/LoQoC4KMC/P/4aMEOwKGDXYQFDRgYABRgIECLQIFB/a1CHQP3EQQFB44cCgBcBTIJ8CfYQACgIQCABozCAAJlBAocfXQS8CXQQQBLgStCH4ZeCLgJMCIoZKBFwc//guD/6wBCAeDFwQ4BdIaMPwAzCF4RKBAAIvBHIX/dQS7EYIa7RUgbpBAAapFRgkDRgYAMiEAFwKdCn5dD8BdE8IFBLoXBGoJdC4Y1BLoWHGoJdB/0PMYJdB/kPMYJtCj/AJ4Mf8F/wBPBn/AFwXwFAIuCHAKSCj/DSQc/w6SDv5BCLoI4BXYYuBWoQuCEQQuBAoIcBh5TCDgLsCTwhcCABsfV4aTCDYbMEb4QFBCAQFCfgYFBfgYFBewYcBAgRGBDgYFBDgY7BDgJ8BQwMf/C1E8f4VYIiBw61DB4S1CXYS1CRgP3WoQPBWoYPBWofBAoIoBn7BCTAN/wZXEJoKHC/gFBDgMB4AFBV4cDV4gAJn6bCAAN/AQMCAQIaCjwoBGIICCdQJaBAQLqBDIIIC8EDeAR9Bj4FCFwJjDTgIFD/x6BKQK1FEAIABDgLYIGYIuBQobeCNwYnBDYLkDAgQuBDYQuCRQcHRQjhCABavCDIrfBj4FCj/8n4FCYoLHCHQP9AoRjDIQJdCeAZ1EQoSMBQwQpB4C1BBIKhBg/gAoLQBh/AMgN+FAOBAoI0Bn5wBwYuBFAWHFwItCXYQFDXYiUBXYbBFewX/z5RCgf+L4KgBgfwL4KMDQQIFEUxEPB4l/GQN4SQX+g72DF4JRBGQKABAoIyBQwRdC/F/wBdC+BdE8AqBGYN/4I2BEoN/w61CTALzCD4I0D/8DDAKGCg/z/+AFAOP76MFcg8PVIgFDKILwDQgQcDAoaMCAoQWBAoRcBSQQQDRoIKDAA0HwEPWgfAn+AVQWAHQRkBwYFCLwMHEgQDBYYYDBj5jBEQP4n47CAYN/NIIoB8BSDFwkAv0AcwgAD')));

Graphics.prototype.setFontPaytoneOne = function(scale) {
  //this.setFontCustom(fontBitmap,46, atob("HTBFLTQ0PzU/Lz8+HQ=="),100+(scale<<8)+(1<<16));
  this.setFontCustom(
      fontBitmap,
      46,
      atob("DRcgFhkZHhodGRwcDQ=="),
      47|65536
  );
  return this;
};

let drawTimeout;

//let g2 = Graphics.createArrayBuffer(g.getWidth(),90,1,{msb:true});
let g2 = Graphics.createArrayBuffer(g.getWidth() / 2,g.getHeight() / 2,1,{msb:true});
let g2img = {
  width:g2.getWidth(), height:g2.getHeight(), bpp:1,
  buffer:g2.buffer, transparent:0
};
const slope = 10;
const offsY = 10; // offset of numbers from middle
const fontBorder = 4; // offset from left/right
const slopeBorder = 5, slopeBorderUpper = 2; // fudge-factor to move minutes down from slope
let R,x,y; // middle of the clock face
let dateStr = "";
let bgColors = [];
if (g.theme.dark) {
   if (settings.colorYellow) bgColors.push("#ff0");
   if (settings.colorCyan) bgColors.push("#0ff");
   if (settings.colorMagenta) bgColors.push("#f0f");
   if (settings.colorWhite) bgColors.push("#fff");
} else {
   if (settings.colorRed) bgColors.push("#f00");
   if (settings.colorGreen) bgColors.push("#0f0");
   if (settings.colorBlue) bgColors.push("#00f");
   if (settings.colorBlack) bgColors.push("#000");
}
let bgColor = bgColors[(Math.random()*bgColors.length)|0]||"#000";


// Draw the hour, and the minute into an offscreen buffer
let draw = function() {
  // queue next draw
  if (drawTimeout) clearTimeout(drawTimeout);

  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    animate(false, function() {
      draw();
    });

  }, 60000 - (Date.now() % 60000));
  // Now draw this one
  const rRaw = Bangle.appRect;
  R = { x: rRaw.x, y: rRaw.y, w: rRaw.w / 2, h:rRaw.h / 2, x2: rRaw.x + rRaw.w / 2, y2: rRaw.y + rRaw.h / 2 };
  x = R.w / 2;
  y = R.y + R.h / 2 - 6;
  if (!settings.hideWidgets) y-= 6; // extra room for date
  const date = new Date();
  const local_time = require("locale").time(date, 1);
  const hourStr = local_time.split(":")[0].trim().padStart(2, '0');
  const minStr = local_time.split(":")[1].trim().padStart(2, '0');
  dateStr = require("locale").dow(date, 1).toUpperCase()+ " " + require("locale").date(date, 0).toUpperCase();

  // Draw hour
  g.reset().clearRect(rRaw); // clear whole background (w/o widgets)
  g.setFontAlign(-1, 0).setFont("PaytoneOne");
  g.drawString(hourStr, fontBorder, y-offsY).setFont("4x6"); // draw and unload custom font

  // add slope in background color
  g.setColor(g.theme.bg)
      .fillPoly([0,y+slope-slopeBorderUpper, R.w,y-slope-slopeBorderUpper, R.w,y-slope, 0,y+slope]);

  // Draw minute to offscreen buffer
  g2.setColor(0).fillRect(0,0,g2.getWidth(),g2.getHeight()).setFontAlign(1, 0).setFont("PaytoneOne");
  g2.setColor(1).drawString(minStr, g2.getWidth()-fontBorder, g2.getHeight()/2).setFont("4x6"); // draw and unload custom font
  g2.setColor(0).fillPoly([0,0, g2.getWidth(),0, 0,slope*2]);

  // redraw the top widget
  clockInfoMenu.redraw();
  // start the animation *in*
  animate(true);
};

let isAnimIn = true;
let animInterval;
let minuteX;
// Draw *just* the minute image
let drawMinute = function() {
  const yo = slopeBorder + offsY + y - 2 * slope * minuteX / R.w;
  // draw over the slanty bit
  g.setColor(bgColor).fillPoly([0,y+slope, R.w,y-slope, R.w,R.h+R.y, 0,R.h+R.y]);
  // draw the minutes
  g.setColor(g.theme.bg).drawImage(g2img, x+minuteX-(g2.getWidth()/2), yo-(g2.getHeight()/2));
};
let animate = function(isIn, callback) {
  if (animInterval) clearInterval(animInterval);
  isAnimIn = isIn;
  minuteX = isAnimIn ? -g2.getWidth() : 0;
  drawMinute();
  animInterval = setInterval(function() {
    minuteX += 8;
    let stop = false;
    if (isAnimIn && minuteX>=0) {
      minuteX=0;
      stop = true;
    } else if (!isAnimIn && minuteX>=R.w)
      stop = true;
    drawMinute();
    if (stop) {
      clearInterval(animInterval);
      animInterval=undefined;
      if (isAnimIn) {
        // draw the date
        g.setColor(g.theme.bg).setFontAlign(0, 0).setFont("6x15").drawString(dateStr, R.x + R.w/2, R.y+R.h-9);
        // draw the menu items
        clockInfoMenu.redraw();
        clockInfoMenu2.redraw();
      }
      if (callback) callback();
    }
  }, 20);
};

// clock info menus (scroll up/down for info)
let clockInfoDraw = (itm, info, options) => {
  let textY = options.y+41;
  // set a clip-rect to stop us drawing outside our box
  g.reset().setClipRect(options.x, options.y, options.x+options.w-1, options.y+options.h-1);
  g.setFont("6x15").setBgColor(options.bg).clearRect(options.x, textY-15, options.x+options.w-2, textY);

  g.setColor(options.focus ? options.hl : options.fg);
  if (options.x < g.getWidth()/2) { // left align
    let x = options.x+2;
    if (info.img) g.clearRect(x, options.y, x+23, options.y+23).drawImage(info.img, x, options.y);
    g.setFontAlign(-1,1).drawString(info.text, x,textY);
  } else { // right align
    let x = options.x+options.w-3;
    if (info.img) g.clearRect(x-23, options.y, x, options.y+23).drawImage(info.img, x-23, options.y);
    g.setFontAlign(1,1).drawString(info.text, x,textY);
  }
  // return ClipRect
  g.setClipRect(0,0,g.getWidth()-1, g.getHeight()-1);
};
//load first
let clockInfoItems = require("clock_info").load();
let clockInfoMenu = require("clock_info").addInteractive(clockInfoItems, {  // top right
  app:"slopeclockbig",x:132, y:settings.hideWidgets ? 12 : 24, w:44, h:40,
  draw : clockInfoDraw,
  bg : g.theme.bg, fg : g.theme.fg, hl : "#f00"/*red*/
});
let clockInfoMenu2 = require("clock_info").addInteractive(clockInfoItems, { // bottom left
  app:"slopeclockbig",
  x:0, y:92, w:85, h:80,
  draw : clockInfoDraw,
  bg : bgColor, fg : g.theme.bg, hl : (g.theme.fg===g.toColor(bgColor))?"#f00"/*red*/:g.theme.fg
});

// Show launcher when middle button pressed
Bangle.setUI({
  mode : "clock",
  remove : function() {
    // Called to unload all of clock app
    if (animInterval) clearInterval(animInterval);
    animInterval = undefined;
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
    delete Graphics.prototype.setFontPaytoneOne;
    // remove info menu
    clockInfoMenu.remove();
    delete clockInfoMenu;
    clockInfoMenu2.remove();
    delete clockInfoMenu2;
  }
});

// Load widgets
Bangle.loadWidgets();
if (settings.hideWidgets) require("widget_utils").swipeOn();
else setTimeout(Bangle.drawWidgets,0);
draw();
}

"use strict;"

let COLORS = {
  bg: "#007820",
  border: "#943f03",
  pits: ["black", "crimson"],
}

let SIZES = {
  border: 10,
  bar: 50,
  pit: 250,
}


function init_state() {
  let game_state = {
    board: [new Array(24), new Array(24)],
    bar: [0, 0],
  }

  for (let player = 0; player <= 1; player++) {
    game_state.board[player].fill(0)
    game_state.board[player][5] = 5;
    game_state.board[player][7] = 3;
    game_state.board[player][12] = 5;
    game_state.board[player][23] = 2;
  }
}


function draw(ctx) {
  let canvas = ctx.canvas;
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // outer border
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(canvas.width, 0);
  ctx.closePath();
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2 * SIZES.border;
  ctx.stroke();


  // the bar
  ctx.fillStyle = COLORS.border;
  ctx.fillRect(
    (canvas.width - SIZES.bar) / 2, 0,
    SIZES.bar, canvas.height
  );

  drawPits(ctx, SIZES.border);
  drawPits(ctx, canvas.width / 2 + SIZES.bar / 2);
}


function drawPits(ctx, offset) {
  let canvas = ctx.canvas;

  // calculate base of triangle
  let width = (canvas.width / 2 - SIZES.border - SIZES.bar / 2) / 6;

  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(offset + i * width, SIZES.border);
    ctx.lineTo(offset + (i + 0.5) * width, SIZES.pit);
    ctx.lineTo(offset + (i + 1) * width, SIZES.border);
    ctx.closePath();
    ctx.fillStyle = COLORS['pits'][i % 2]
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(offset + i * width, canvas.height - SIZES.border);
    ctx.lineTo(offset + (i + 0.5) * width, canvas.height - SIZES.pit);
    ctx.lineTo(offset + (i + 1) * width, canvas.height - SIZES.border);
    ctx.closePath();
    ctx.fillStyle = COLORS['pits'][(i + 1) % 2]
    ctx.fill();
  }
}

function drawpip(ctx, width, pipsrad, x, y){
  ctx.beginPath()
  ctx.arc(
    x*width, y*width, pipsrad, 0, 2 * Math.PI,
  )
  ctx.fillStyle = "black"
  ctx.fill()
}

function drawDice(ctx, pips){
  let canvas = ctx.canvas;
  ctx.fillStyle = "#f0ebd8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  width = canvas.width;
  pipsrad = width/10;
  switch(pips) {
    case 1: 
      drawpip(ctx, width, pipsrad*1.2, 0.5, 0.5)
      break;
    case 3:
      drawpip(ctx, width, pipsrad, 0.5, 0.5)
    case 2: 
      drawpip(ctx, width, pipsrad, 0.25, 0.25)
      drawpip(ctx, width, pipsrad, 0.75, 0.75)
      break;
    case 5:
      drawpip(ctx, width, pipsrad, 0.5, 0.5)
    case 4:
      drawpip(ctx, width, pipsrad, 0.25, 0.25)
      drawpip(ctx, width, pipsrad, 0.75, 0.75)
      drawpip(ctx, width, pipsrad, 0.75, 0.25)
      drawpip(ctx, width, pipsrad, 0.25, 0.75)
      break; 
    case 6:
      drawpip(ctx, width, pipsrad*0.85, 2/7, 2/5)
      drawpip(ctx, width, pipsrad*0.85, 2/7, 3/5)
      drawpip(ctx, width, pipsrad*0.85, 2/7, 4/5)
      drawpip(ctx, width, pipsrad*0.85, 5/7, 2/5)
      drawpip(ctx, width, pipsrad*0.85, 5/7, 3/5)
      drawpip(ctx, width, pipsrad*0.85, 5/7, 4/5)
      break;
    default:
  }
}

let sock


const addRolldiceListeners = () => {
  const button = document.getElementById("RollDice");
  button.addEventListener('click', () => {
    sock.emit('roll')
  })
}

window.onload = (dic) => {
  let canvas = document.getElementById("game");
  let ctx = canvas.getContext("2d");
  
  draw(ctx);

  if (dic){
    d = dic
  }else{
    d = [3, 0]
  }


  let canvasd1 = document.getElementById("diceA");
  let ctxd1 = canvasd1.getContext("2d");
  let canvasd2 = document.getElementById("diceB");
  let ctxd2 = canvasd2.getContext("2d");

  drawDice(ctxd1, d[0]);
  drawDice(ctxd2, d[1]);

}

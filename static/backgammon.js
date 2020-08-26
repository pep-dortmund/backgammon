"use strict;"


let COLORS = {
  bg: "#007820",
  border: "#943f03",
  pits: ["black", "crimson"],
  pieces: ["#6a5acd", "#ffd700"],
}

let SIZES = {
  border: 10,
  bar: 50,
  pit: 250,
  piece: 45,
}

let PITSPOS = new Array(24)

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
  return game_state
}

let GAME_STATE = init_state();

function drawPiece(ctx, color, x, y) {
  let canvas = ctx.canvas;
  ctx.beginPath();
  ctx.arc(x,y, SIZES.piece/2, 0, 2*Math.PI);
  ctx.fillStye = color;
  ctx.fill();
  ctx.closePath();
	console.log(color)
}
function drawPices(ctx, board) {
  let canvas =ctx.canvas;
  for (let pit = 0; pit <= 23; pit++){ // first player
    for (let count = 0; count < board[0][pit]; count++){
      if (pit <= 11){
        drawPiece(ctx, COLORS.pieces[0], PITSPOS[pit], canvas.height - SIZES.border - SIZES.piece/2 - count*SIZES.piece);
      }
      else {
        drawPiece(ctx, COLORS.pieces[0], PITSPOS[pit], SIZES.border + SIZES.piece/2 + count*SIZES.piece);
      }
    }
  }  
  for (let pit = 0; pit <= 23; pit++){ // second player, reversed board order
    for (let count = 0; count < board[1][pit]; count++){
      if (pit > 11){
        drawPiece(ctx, COLORS.pieces[1], PITSPOS[23-pit], canvas.height - SIZES.border - SIZES.piece/2 - count*SIZES.piece);
      }
      else {
        drawPiece(ctx, COLORS.pieces[1], PITSPOS[23-pit], SIZES.border + SIZES.piece/2 + count*SIZES.piece);
      }
    }
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


window.onload = () => {
  let canvas = document.getElementById("game");
  let ctx = canvas.getContext("2d");
  // width of pits
  let width = (canvas.width / 2 - SIZES.border - SIZES.bar / 2) / 6;
  for (let i=0; i <6; i++){
    PITSPOS[i] = (canvas.width - SIZES.border - width/2) - i* width;
    PITSPOS[i+12] = (canvas.width - SIZES.border - width/2) - i* width;
  }
  for (let i=0; i <6; i++){
    PITSPOS[i+6] = (canvas.width/2 - SIZES.bar/2  - width/2) - i* width;
    PITSPOS[i+18] = (canvas.width/2 - SIZES.bar/2  - width/2) - i* width;
  }
  draw(ctx);
  drawPices(ctx, GAME_STATE.board)
}

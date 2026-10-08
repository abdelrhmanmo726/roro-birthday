import Konva from "konva";
import { playPuzzleSnap } from "./SoundEffects.js";

let stage = null;
let layer = null;
let resizeHandler = null;
const ROWS = 3;
const COLS = 4;
const SNAP_THRESHOLD = 35;

export function initRealPuzzle(imagePath, onWinCallback) {
  const container = document.getElementById("real-puzzle-board");
  if (!container) return;

  if (stage) {
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    stage.destroy();
    stage = null;
  }

  container.innerHTML = "";

  const stageWidth = 800;
  const stageHeight = 600;

  stage = new Konva.Stage({
    container: "real-puzzle-board",
    width: stageWidth,
    height: stageHeight,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  function fitStageIntoParent() {
    if (!stage) return;
    const wrapper = document.querySelector(".real-puzzle-wrapper");
    if (!wrapper) return;
    const containerWidth = wrapper.clientWidth || stageWidth;
    const scale = Math.min(1, containerWidth / stageWidth);
    stage.width(stageWidth * scale);
    stage.height(stageHeight * scale);
    stage.scale({ x: scale, y: scale });
    stage.draw();
  }

  resizeHandler = fitStageIntoParent;
  window.addEventListener("resize", resizeHandler);

  const image = new Image();
  image.src = imagePath;

  image.onload = () => {
    const imageAspectRatio = image.width / image.height;
    
    let boardHeight = 450; 
    let boardWidth = boardHeight * imageAspectRatio;

    if (boardWidth > 580) {
      boardWidth = 580;
      boardHeight = boardWidth / imageAspectRatio;
    }

    const boardX = (stageWidth - boardWidth) / 2;
    const boardY = (stageHeight - boardHeight) / 2;

    const pieceWidth = boardWidth / COLS;
    const pieceHeight = boardHeight / ROWS;
    
    const tabSize = Math.min(pieceWidth, pieceHeight) * 0.18;

    let placedCount = 0;
    const totalPieces = ROWS * COLS;
    const piecesList = [];

    const verticalEdges = [];
    for (let r = 0; r < ROWS; r++) {
      verticalEdges[r] = [];
      for (let c = 0; c < COLS - 1; c++) {
        verticalEdges[r][c] = Math.random() > 0.5 ? 1 : -1;
      }
    }

    const horizontalEdges = [];
    for (let r = 0; r < ROWS - 1; r++) {
      horizontalEdges[r] = [];
      for (let c = 0; c < COLS; c++) {
        horizontalEdges[r][c] = Math.random() > 0.5 ? 1 : -1;
      }
    }

    const backgroundBoard = new Konva.Rect({
      x: boardX,
      y: boardY,
      width: boardWidth,
      height: boardHeight,
      fill: "rgba(255, 255, 255, 0.03)",
      stroke: "rgba(255, 255, 255, 0.18)",
      strokeWidth: 2,
      cornerRadius: 12,
    });
    layer.add(backgroundBoard);

    const fullImage = new Konva.Image({
      image: image,
      x: boardX,
      y: boardY,
      width: boardWidth,
      height: boardHeight,
      opacity: 0,
      cornerRadius: 8,
      shadowColor: "#ff74b5",
      shadowBlur: 35,
      shadowOpacity: 0,
    });
    layer.add(fullImage);

    function drawEdge(ctx, x1, y1, x2, y2, type) {
      if (type === 0) {
        ctx.lineTo(x2, y2);
        return;
      }

      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);

      const nx = dx / length;
      const ny = dy / length;

      const px = -ny;
      const py = nx;

      const size = tabSize;
      const start = 0.35;

      ctx.lineTo(x1 + dx * start, y1 + dy * start);

      ctx.bezierCurveTo(
        x1 + dx * 0.42 + px * size * type,
        y1 + dy * 0.42 + py * size * type,
        x1 + dx * 0.50 + px * size * 1.8 * type,
        y1 + dy * 0.50 + py * size * 1.8 * type,
        x1 + dx * 0.58 + px * size * type,
        y1 + dy * 0.58 + py * size * type
      );

      ctx.bezierCurveTo(
        x1 + dx * 0.70 + px * size * type,
        y1 + dy * 0.70 + py * size * type,
        x1 + dx * 0.75,
        y1 + dy * 0.75,
        x2,
        y2
      );
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const topDir = r === 0 ? 0 : -horizontalEdges[r - 1][c];
        const rightDir = c === COLS - 1 ? 0 : verticalEdges[r][c];
        const bottomDir = r === ROWS - 1 ? 0 : horizontalEdges[r][c];
        const leftDir = c === 0 ? 0 : -verticalEdges[r][c - 1];

        const targetX = boardX + c * pieceWidth;
        const targetY = boardY + r * pieceHeight;

        const randomX = Math.random() > 0.5 
          ? Math.random() * (boardX - pieceWidth - 20)
          : boardX + boardWidth + 20 + Math.random() * (stageWidth - (boardX + boardWidth) - pieceWidth - 20);
        const randomY = 40 + Math.random() * (stageHeight - pieceHeight - 80);

        const piece = new Konva.Shape({
          x: isNaN(randomX) ? 50 : randomX,
          y: isNaN(randomY) ? 50 : randomY,
          draggable: true,
          rotation: Math.random() * 8 - 4,

          fillPriority: 'pattern',
          fillPatternImage: image,
          fillPatternOffset: {
            x: (c * pieceWidth) * (image.width / boardWidth),
            y: (r * pieceHeight) * (image.height / boardHeight),
          },
          fillPatternScale: {
            x: boardWidth / image.width,
            y: boardHeight / image.height,
          },

          sceneFunc: (ctx, shape) => {
            ctx.beginPath();
            ctx.moveTo(0, 0);

            drawEdge(ctx, 0, 0, pieceWidth, 0, topDir);
            drawEdge(ctx, pieceWidth, 0, pieceWidth, pieceHeight, rightDir);
            drawEdge(ctx, pieceWidth, pieceHeight, 0, pieceHeight, bottomDir);
            drawEdge(ctx, 0, pieceHeight, 0, 0, leftDir);

            ctx.closePath();
            ctx.fillStrokeShape(shape);
          },

          stroke: "rgba(255, 255, 255, 0.4)",
          strokeWidth: 1.5,
          shadowColor: "black",
          shadowBlur: 8,
          shadowOffset: { x: 2, y: 4 },
          shadowOpacity: 0.35,
        });

        piece.targetX = targetX;
        piece.targetY = targetY;
        piece.isSnapped = false;
        piecesList.push(piece);

        piece.on("dragstart", () => {
          if (piece.isSnapped) return;
          piece.moveToTop();
          piece.shadowBlur(15);
          piece.shadowOpacity(0.6);
          layer.draw();
        });

        piece.on("dragend", () => {
          if (piece.isSnapped) return;

          const dx = Math.abs(piece.x() - piece.targetX);
          const dy = Math.abs(piece.y() - piece.targetY);

          if (dx < SNAP_THRESHOLD && dy < SNAP_THRESHOLD) {
            piece.position({ x: piece.targetX, y: piece.targetY });
            piece.rotation(0); 
            piece.draggable(false);
            piece.stroke("rgba(255, 255, 255, 0.15)");
            piece.shadowBlur(2);
            piece.shadowOpacity(0.1);
            piece.isSnapped = true;
            placedCount++;
            playPuzzleSnap();

            layer.draw();

            if (placedCount === totalPieces) {
              piecesList.forEach(p => {
                new Konva.Tween({
                  node: p,
                  duration: 0.3,
                  opacity: 0,
                }).play();
              });

              fullImage.moveToTop();
              new Konva.Tween({
                node: fullImage,
                duration: 0.5,
                opacity: 1,
                shadowOpacity: 0.6,
                shadowBlur: 35,
                onFinish: () => {
                  const card = document.querySelector(".real-card-success");
                  if (card) {
                    card.classList.add("active");
                  }

                  if (onWinCallback) {
                    onWinCallback();
                  }
                }
              }).play();
            }
          } else {
            piece.shadowBlur(8);
            piece.shadowOpacity(0.35);
            layer.draw();
          }
        });

        piece.on("mouseover", () => {
          if (!piece.isSnapped) document.body.style.cursor = "pointer";
        });
        piece.on("mouseout", () => {
          document.body.style.cursor = "default";
        });

        layer.add(piece);
      }
    }

    layer.draw();
    fitStageIntoParent();
  };
}
var canEnter = true;
var maxDistance;
var bars=10;
var colorVelocity=0.5;
var randomArray = [];
var myAnimation = "Grid";
var numberOfColors=3;
var keyframes={};
var actualAnimationData;
var colors = {
  'color-0': hex_to_RGB("#ff0000"),
  'color-1': hex_to_RGB("#00ff00"),
  'color-2': hex_to_RGB("#0000ff"),
};
var animations = {
  "Horizontal Lines": {
    execute(ctx, fArray, bars) {
      showHorizontalLines(ctx, fArray, bars);
    },
  },
  "Expand Horizontal Lines": {
    execute(ctx, fArray, bars) {
      showExpandHorizontalLines(ctx, fArray, bars);
    },
  },
  "Vertical Lines": {
    execute(ctx, fArray, bars) {
      showVerticalLines(ctx, fArray, bars);
    },
  },
  "Expand Vertical Lines": {
    execute(ctx, fArray, bars) {
      showExpandVerticalLines(ctx, fArray, bars);
    },
  },
  "Expand Circles": {
    execute(ctx, fArray, bars) {
      showExpandCircles(ctx, fArray, bars);
    },
  },
  Circles: {
    execute(ctx, fArray, bars) {
      showCircles(ctx, fArray, bars);
    },
  },
  Arcs: {
    execute(ctx, fArray, bars) {
      showArcs(ctx, fArray, bars);
    },
  },
  "Expand Square": {
    execute(ctx, fArray, bars) {
      showExpandSquare(ctx, fArray, bars);
    },
  },
  Square: {
    execute(ctx, fArray, bars) {
      showSquare(ctx, fArray, bars);
    },
  },
  Grid: {
    execute(ctx, fArray, bars) {
      bars=Math.floor(bars/10)*10+10;
      showGrid2(ctx, fArray, bars);
    },
  },
};
randomArray = getRandomNumbers(100);

function animate(ctx, fArray) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  moveColor(fArray, colorVelocity);
  animations[myAnimation].execute(ctx, fArray, bars);
}

function showHorizontalLines(ctx, fArray, bars) {
  for (var i = 0; i < 100; i++) {
    ctx.fillStyle = calculateColor(i, fArray[i] / 255, 1);
    ctx.fillRect(
      0,
      (canvas.height * i) / 100,
      canvas.width,
      canvas.height / 100
    );
  }
}
function showExpandHorizontalLines(ctx, fArray, bars) {
  for (var i = 0; i < 100; i++) {
    ctx.fillStyle = calculateColor(i, fArray[i] / 255, 1);
    ctx.fillRect(
      0,
      (canvas.height * i) / 100,
      (fArray[i] * canvas.width) / 255,
      canvas.height / 100
    );
  }
}
function showExpandVerticalLines(ctx, fArray, bars) {
  for (var i = 0; i < 100; i++) {
    ctx.fillStyle = calculateColor(i, fArray[i] / 255, 1);
    ctx.fillRect(
      (canvas.width * i) / 100,
      canvas.height,
      canvas.width / 100,
      (-1 * fArray[i] * canvas.height) / 255
    );
  }
}
function showVerticalLines(ctx, fArray, bars) {
  for (var i = 0; i < 100; i++) {
    ctx.fillStyle = calculateColor(i, fArray[i] / 255, 1);
    ctx.fillRect(
      (canvas.width * i) / 100,
      0,
      canvas.width / 100,
      canvas.height
    );
  }
}
function showExpandCircles(ctx, fArray, bars) {
  for (var i = 100 - 1; i >= 0; i--) {
    let expansion = calculateExpansion(fArray, i);
  

    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        ((expansion * bars + j) * maxDistance * incrementDiference(fArray[i])) /
          (2 * bars * 100),
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }
}
function showCircles(ctx, fArray, bars) {
  for (var i = 99; i > -1; i--) {
    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        ((i * bars + j) * maxDistance) / (2 * bars * 100),
        0, //2*expansion*Math.PI/255,
        2 * Math.PI //-2*expansion*Math.PI/255
      );
      //ctx.strokeStyle = color;
      //ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}
function showArcs(ctx, fArray, bars) {
  for (var i = 99; i > -1; i--) {
    let expansion = calculateExpansion(fArray, i);
    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        ((i * bars + j) * maxDistance) / (2 * bars * 100),
        2 * Math.PI - (2 * fArray[i] * Math.PI) / 255,
        (2 * fArray[i] * Math.PI) / 255
      );
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }
}
function showExpandSquare(ctx, fArray, bars) {
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.fillStyle = color;
      if (j % 2 == 0) {
        verticalLine();
        horizontalLine();
      } else {
        horizontalLine();
        verticalLine();
      }
      function verticalLine() {
        ctx.fillRect(
          canvas.width / 2 -
            (canvas.height * 5) / (100 * bars * 2) +
            ((i % 2 != 0
              ? (canvas.width * i * -1 * incrementDiference(fArray[i]) * 1.5) /
                2
              : (canvas.width * i) / 2) *
              incrementDiference(fArray[i]) *
              1.5) /
              100 +
            j * (canvas.width / (100 * bars)),
          0,
          (canvas.height * incrementDiference(fArray[i])) / (100 * bars * 2),
          canvas.height
        );
      }
      function horizontalLine() {
        ctx.fillRect(
          0,
          canvas.height / 2 +
            ((i % 2 != 0
              ? (canvas.height * i * -1 * incrementDiference(fArray[i]) * 1.5) /
                2
              : (canvas.height * i) / 2) *
              incrementDiference(fArray[i]) *
              1.5) /
              100 +
            j * (canvas.height / (100 * bars)),
          canvas.width,
          (canvas.height * incrementDiference(fArray[i])) / (100 * bars * 2)
        );
      }
    }
  }
}
function showSquare(ctx, fArray, bars) {
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.fillStyle = color;
      ctx.fillRect(
        canvas.width / 2 -
          canvas.width / (100 * bars) +
          (i % 2 != 0 ? (canvas.width * i * -1) / 2 : (canvas.width * i) / 2) /
            100 +
          j * (canvas.width / (100 * bars)),
        0,
        canvas.width / (100 * bars),
        canvas.height
      );
    }
    for (var j = 0; j < bars; j++) {
      color = calculateColor(
        i * bars + j,
        incrementDiference(incrementDiference(fArray[i]) * 255),
        bars
      );
      ctx.fillStyle = color;
      ctx.fillRect(
        0,
        canvas.height / 2 -
          canvas.height / (100 * bars) +
          (i % 2 != 0
            ? (canvas.height * i * -1) / 2
            : (canvas.height * i) / 2) /
            100 +
          j * (canvas.height / (100 * bars)),
        canvas.width,
        canvas.height / (100 * bars)
      );
    }
  }
}

function showGrid(ctx, fArray, bars) {
  for (var i = 0; i < 10; i++) {
    if (fArray[1] > 200 && canEnter && i == 1) {
      iteration += (fArray[1] - 200) / 5;
      canEnter = false;
    } else {
      canEnter = true;
    }
    for (var j = 0; j < 10; j++) {
      color = calculateColor(
        randomArray[i * 10 + j],
        incrementDiference(fArray[randomArray[i * 10 + j]]),
        1
      );
      ctx.fillStyle = color;
      ctx.fillRect(
        (j * canvas.width) / 10,
        (i * canvas.height) / 10,
        canvas.width / 10,
        canvas.height / 10
      );
    }
  }
}

function showGrid2(ctx, fArray, n) {
  let x = n/2-1,
    y = n/2-1;
  let i = 0;
  let mainIteration = 1;
  paintSquare();
  while (x != 0 || y != n-1) {
    while (x != y) {
      if (x < y) {
        y--;
      } else {
        y++;
      }
      paintSquare();
    }
    if (mainIteration % 2 == 0) {
      while (x > y - mainIteration && (x != 0 || y != n-1)) {
        x--;
        paintSquare();
      }
    } else {
      while (x < y + mainIteration && (x != 0 || y != n-1)) {
        x++;
        paintSquare();
      }
    }
    
    mainIteration++;
  }
  function paintSquare() {
    color = calculateColor(i, incrementDiference(fArray[randomArray[i/(n*n)*100]]), n*n/100);
    ctx.fillStyle = color;
    ctx.fillRect(
      (x * canvas.width) / n,
      (y * canvas.height) / n,
      canvas.width / n,
      canvas.height / n
    );
    i++;
  }
}

function incrementDiference(n) {
  n = n / 255;
  return 3 * n ** 2 - 2 * n ** 3;
}
function hex_to_RGB(hex) {
  var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function calculateColor(n, sat, bars) {
  let a = iteration % (100 * bars);
  n = ((bars * 100 + n - a) % (100 * bars)) / (100 * bars); // convert from 0-(100*bars) to 0-1 range and adding the movement.
  let colorValues=Object.values(colors);
  var r = 0, g = 0, b = 0, length = colorValues.length;
  colorValues.forEach((color, i) => {
    i = length - i - 1;
    
    if (n >= (i - 1) / (length - 1) && n <= (i + 1) / (length - 1)) {
      r +=colorFunction(i, color.r);
      g +=colorFunction(i, color.g);
      b +=colorFunction(i, color.b);
    }
    
  });
  let result="rgba(" + r * sat + "," + g * sat + "," + b * sat + "," + sat + ")"
  return result;

  function colorFunction(index, color){
    let numberOfColors=length - 1;
    let result=-1 * (numberOfColors) ** 2 * (n - (index - 1) / (numberOfColors)) * (n - (index + 1) / (numberOfColors)) * color;
    return result;
  }
}

function getRandomNumbers(n) {
  let numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(i);
  }
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  return numbers;
}

function calculateMaxDistance() {
  maxDistance = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
}

function calculateExpansion(fArray, pos) {
  let expansion = pos;
  expansion = (((-1 * pos) / 100) * (pos / 100 - 2) * 100 * fArray[pos]) / 200;
  return expansion;
}

function moveColor(fArray, velocity) {
  if (fArray[2] > 200 && canEnter) {
    iteration += (velocity * (fArray[1] - 200)) / 5;
    canEnter = false;
  } else {
    canEnter = true;
  }
}

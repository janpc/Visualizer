var canEnter = true;
var maxDistance;
wantAugment = true;
var randomArray = [];
var myAnimation = "Vertical Lines";
const myAnimations = [
  "Show squares",
  "Show Expand Square",
  "Show Circles",
  "Show Arcs",
  "Show Pad",
];
var colors = [
    hex_to_RGB("#ff0000"),
    hex_to_RGB("#00ff00"),
    hex_to_RGB("#0000ff"),
  ];
var animations = {
  "Horizontal Lines": {
    execute(ctx, fArray, bars) {
      showHorizontalLines(ctx, fArray, bars);
    },
  },
  "Vertical Lines":{
    execute(ctx, fArray, bars) {
        showVerticalLines(ctx, fArray, bars);
      },
  },
  "Expand Circles": {
    execute(ctx, fArray, bars) {
      showExpandCircles(ctx, fArray, bars);
    },
  },
};
randomArray = getRandomNumbers(100);

function animate(ctx, fArray, bars) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  moveColor(fArray, 0.1);
  animations[myAnimation].execute(ctx, fArray, 5);
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
function showVerticalLines(ctx, fArray, bars) {
    for (var i = 0; i < 100; i++) {
      ctx.fillStyle = calculateColor(i, fArray[i] / 255, 1);
      ctx.fillRect(
        (canvas.width * i) / 100,
        0,
        canvas.width/ 100,
        canvas.height 
      );
    }
  }

function showExpandCircles(ctx, fArray, bars) {
  for (var i = 100 - 1; i >= 0; i--) {
    let augm = 1;
    if (wantAugment) {
      augm = calculateAugment(fArray, i);
    }
    
    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        ((augm * bars + j) * maxDistance * incrementDiference(fArray[i])) /
          (2 * bars * 100),
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }
}
function showCircles(fArray, divs, bars) {
  var maxDistance = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);

  for (var i = 0; i < divs; i++) {
    if (fArray[1] > 200 && canEnter && i == 1) {
      iteration += (fArray[1] - 200) / 5;
      canEnter = false;
    } else {
      canEnter = true;
    }
    for (var j = 0; j < bars; j++) {
      color = calculateColor(
        i * bars + j,
        incrementDiference(incrementDiference(fArray[i]) * 255),
        bars
      );
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        ((i * bars + j) * maxDistance) / (2 * bars * divs),
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }
}
function showExpandSquare(fArray, divs, bars) {
  for (var i = 0; i < divs; i++) {
    if (fArray[1] > 200 && canEnter && i == 1) {
      iteration += bars;
      canEnter = false;
      console.log(canEnter);
    } else {
      canEnter = true;
    }
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
          canvas.width / 2 +
            ((i % 2 != 0
              ? (canvas.width * i * -1 * incrementDiference(fArray[i]) * 1.5) /
                2
              : (canvas.width * i) / 2) *
              incrementDiference(fArray[i]) *
              1.5) /
              100 +
            j * (canvas.width / (100 * bars)),
          0,
          (canvas.height * incrementDiference(fArray[i])) / (divs * bars * 2),
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
          (canvas.height * incrementDiference(fArray[i])) / (divs * bars * 2)
        );
      }
    }
  }
}
function showSquare(fArray, divs, bars) {
  for (var i = 0; i < divs; i++) {
    for (var j = 0; j < bars; j++) {
      color = calculateColor(i * bars + j, incrementDiference(fArray[i]), bars);
      ctx.fillStyle = color;
      ctx.fillRect(
        canvas.width / 2 +
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
        canvas.height / 2 +
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

function showPad(fArray, divs, bars) {
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
    let a = iteration % (100* bars);
    n = (bars * 100 +n -a) % (100 * bars) / (100 * bars);
  var r = 0,
    g = 0,
    b = 0,
    length = colors.length;
  colors.forEach((color, i) => {
    i = length - i - 1;
    if (n >= (i - 1) / (length - 1) && n <= (i + 1) / (length - 1)) {
      r +=
        -1 *
        (length - 1) ** 2 *
        (n - (i - 1) / (length - 1)) *
        (n - (i + 1) / (length - 1)) *
        color.r;
      g +=
        -1 *
        (length - 1) ** 2 *
        (n - (i - 1) / (length - 1)) *
        (n - (i + 1) / (length - 1)) *
        color.g;
      b +=
        -1 *
        (length - 1) ** 2 *
        (n - (i - 1) / (length - 1)) *
        (n - (i + 1) / (length - 1)) *
        color.b;
    }
  });
  return "rgb(" + r * sat + "," + g * sat + "," + b * sat + ")";
}
function randomArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
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
function calculateAugment(fArray, pos) {
  let augm = pos;
  let x = pos / 100;
  if (fArray[1] > 220) {
    augm = (((-1 * pos) / 100) * (pos / 100 - 2) * 100 * fArray[pos]) / 200;
  }
  return augm;
}

function moveColor(fArray, velocity){
    if (fArray[1] > 200 && canEnter) {
        iteration += velocity*(fArray[1] - 200) / 5;
        canEnter = false;
      } else {
        canEnter = true;
      }
}

// src: https://codepen.io/BangEqual/pen/VLNowO

function processHEX(val) {
  let hex = val.substr(1, val.length - 1);

  const r = hex.substr(0, 2);
  const g = hex.substr(2, 2);
  const b = hex.substr(4, 2);

  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}

function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default function(start, end, stepsInt) {
  //attach start value

  let val1RGB = processHEX(start);
  let val2RGB = processHEX(end);
  let colors = [];

  //the percentage representation of the step
  let stepsPerc = 100 / (stepsInt + 1);

  // diffs between two values
  let valClampRGB = [
    val2RGB[0] - val1RGB[0],
    val2RGB[1] - val1RGB[1],
    val2RGB[2] - val1RGB[2]
  ];

  // build the color array out with color steps
  for (let i = 0; i < stepsInt; i++) {
    let clampedR =
      valClampRGB[0] > 0
        ? pad(
            Math.round((valClampRGB[0] / 100) * (stepsPerc * (i + 1))).toString(
              16
            ),
            2
          )
        : pad(
            Math.round(
              val1RGB[0] + (valClampRGB[0] / 100) * (stepsPerc * (i + 1))
            ).toString(16),
            2
          );

    let clampedG =
      valClampRGB[1] > 0
        ? pad(
            Math.round((valClampRGB[1] / 100) * (stepsPerc * (i + 1))).toString(
              16
            ),
            2
          )
        : pad(
            Math.round(
              val1RGB[1] + (valClampRGB[1] / 100) * (stepsPerc * (i + 1))
            ).toString(16),
            2
          );

    let clampedB =
      valClampRGB[2] > 0
        ? pad(
            Math.round((valClampRGB[2] / 100) * (stepsPerc * (i + 1))).toString(
              16
            ),
            2
          )
        : pad(
            Math.round(
              val1RGB[2] + (valClampRGB[2] / 100) * (stepsPerc * (i + 1))
            ).toString(16),
            2
          );
    colors[i] = ["#", clampedR, clampedG, clampedB].join("");
  }

  return colors;
}

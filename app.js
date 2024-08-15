// //on start button clock starts ticking

// // as soon as cursor enters text area it's data
// // data -> x , y position and the time
// //
// var timeValue = 0; //mini seconds

// var updatedPosition = { x: 0, y: 0 };

// var setinterval;
// var isCursorInside = false;

// var cursorPositionEvery40MilliSeconds = [];
// document.getElementById("Start").addEventListener("click", () => {
//   document.addEventListener("mousemove", (e) => {
//     if (
//       e.clientX >= a.left &&
//       e.clientX <= a.right &&
//       e.clientY >= a.top &&
//       e.clientY <= a.bottom
//     ) {
//       isCursorInside = true;

//       updatedPosition.x = e.clientX;
//       updatedPosition.y = e.clientY;
//     } else {
//       isCursorInside = false;
//     } //   }
//   });

//   setinterval = setInterval(() => {
//     if (isCursorInside) {
//       cursorPositionEvery40MilliSeconds.push({
//         x: updatedPosition.x,
//         y: updatedPosition.y,
//       });
//     }
//   }, 40);
// });

// document.getElementById("Stop").addEventListener("click", () => {
//   document.removeEventListener("mousemove", () => {});
//   clearInterval(setinterval);
//   console.log(cursorPositionEvery40MilliSeconds);
//   clearInterval(play);
// });

// var play;
// document.getElementById("Play").addEventListener("click", () => {
//   var i = 0;
//   play = setInterval(() => {
//     if (i == cursorPositionEvery40MilliSeconds.length - 1) {
//       clearInterval();
//     }
//     document.getElementById("cursor").style.left =
//       cursorPositionEvery40MilliSeconds[i].x;  // yaha par px string append karni hai
//     document.getElementById("cursor").style.top =
//       cursorPositionEvery40MilliSeconds[i++].y; // yaha par bhi
//   }, 40);
// });

// var a = document.getElementById("textbox").getBoundingClientRect();
// console.log(a.left, a.right, a.top, a.bottom);

// // har 40 ms  par position record karna agar box ke andar hai to .. nahi hai to picchhli waali hi copy karni hai

//---------------------------

var updatedPosition = { x: 0, y: 0 };
var setinterval;
var isCursorInside = false;
var cursorPositionEvery40MilliSeconds = [];
var play;

// Function to handle mouse movements
function onMouseMove(e) {
  var boundingRect = document.getElementById("textbox").getBoundingClientRect();
  if (
    e.clientX >= boundingRect.left &&
    e.clientX <= boundingRect.right &&
    e.clientY >= boundingRect.top &&
    e.clientY <= boundingRect.bottom
  ) {
    isCursorInside = true;
    updatedPosition.x = e.clientX;
    updatedPosition.y = e.clientY;
  } else {
    isCursorInside = false;
  }
}

document.getElementById("Start").addEventListener("click", () => {
  // Update bounding box
  var boundingRect = document.getElementById("textbox").getBoundingClientRect();

  // Add mousemove listener
  document.addEventListener("mousemove", onMouseMove);

  setinterval = setInterval(() => {
    if (isCursorInside) {
      cursorPositionEvery40MilliSeconds.push({
        x: updatedPosition.x,
        y: updatedPosition.y,
      });
    } else if (cursorPositionEvery40MilliSeconds.length > 0) {
      // Duplicate the last recorded position if cursor is not inside
      cursorPositionEvery40MilliSeconds.push(
        cursorPositionEvery40MilliSeconds[
          cursorPositionEvery40MilliSeconds.length - 1
        ]
      );
    }
    console.log("Cursor Positions:", cursorPositionEvery40MilliSeconds);
  }, 40);
});

document.getElementById("Stop").addEventListener("click", () => {
  // Remove mousemove listener
  document.removeEventListener("mousemove", onMouseMove);
  clearInterval(setinterval);
  console.log(
    "Stopped Recording. Final Positions:",
    cursorPositionEvery40MilliSeconds
  );

  // Stop playback if it's running
  if (play) {
    clearInterval(play);
  }
});

document.getElementById("Play").addEventListener("click", () => {
  var i = 0;

  if (cursorPositionEvery40MilliSeconds.length === 0) {
    console.log("No data to play.");
    return; // Ensure there's data to play
  }

  // Ensure cursor position is set relative to viewport
  document.getElementById("cursor").style.position = "absolute";

  play = setInterval(() => {
    if (i >= cursorPositionEvery40MilliSeconds.length) {
      clearInterval(play); // Stop playback when finished
      return;
    }
    document.getElementById("cursor").style.left =
      cursorPositionEvery40MilliSeconds[i].x + "px";
    document.getElementById("cursor").style.top =
      cursorPositionEvery40MilliSeconds[i].y + "px";
    console.log("Playing:", cursorPositionEvery40MilliSeconds[i]);
    i++;
  }, 40);
});

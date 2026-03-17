<script>
let time = 1500;
let timer = null;
let running = false;
let cycles = 0;
let isWork = true;

function updateDisplay() {
  let min = Math.floor(time / 60);
  let sec = time % 60;

  document.getElementById("time").innerText =
    (min < 10 ? "0" : "") + min + ":" +
    (sec < 10 ? "0" : "") + sec;
}

function startTimer() {
  if (running) return;

  running = true;

  let workInput = document.getElementById("work").value;
  if (workInput) {
    time = workInput * 60;
  }

  timer = setInterval(function () {
    time--;
    updateDisplay();

    if (time <= 0) {
      if (isWork) {
        cycles++;
        document.getElementById("cycles").innerText =
          "Completed: " + cycles;

        let breakVal = document.getElementById("break").value || 5;
        time = breakVal * 60;
      } else {
        let workVal = document.getElementById("work").value || 25;
        time = workVal * 60;
      }

      isWork = !isWork;
    }

  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  time = 1500;
  running = false;
  updateDisplay();
}

function addTask() {
  let text = document.getElementById("taskInput").value;

  if (!text) return;

  let taskDiv = document.createElement("div");
  taskDiv.className = "task";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  let span = document.createElement("span");
  span.innerText = text;

  let comment = document.createElement("input");
  comment.placeholder = "note";

  checkbox.onchange = function () {
    if (checkbox.checked) {
      span.classList.add("done");
    } else {
      span.classList.remove("done");
    }
  };

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(span);
  taskDiv.appendChild(comment);

  document.getElementById("taskList").appendChild(taskDiv);

  document.getElementById("taskInput").value = "";
}

updateDisplay();
</script>

!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FocusFlow</title>

<style>
body{
margin:0;
font-family:'Segoe UI';
background:#0f172a;
color:rgb(27, 187, 227);
display:flex;
justify-content:center;
align-items:center;
height:100vh;
gap:40px;
}

.app{
text-align:center;
}

.timer{
font-size:60px;
margin:20px;
color:#38bdf8;
}

button{
margin:5px;
padding:10px;
border:none;
border-radius:8px;
background:#1e293b;
color:rgb(21, 211, 217);
cursor:pointer;
}

button:hover{
background:#38bdf8;
}

input{
padding:8px;
margin:5px;
border-radius:5px;
border:none;
}

.tasks{
background:#1e293b;
padding:20px;
border-radius:10px;
width:250px;
}

.task{
display:flex;
align-items:center;
justify-content:space-between;
margin-top:10px;
}

.task input[type="text"]{
width:100px;
}

.done{
text-decoration:line-through;
opacity:0.6;
}
</style>

</head>

<body>

<div class="app">

<h1>FocusFlow</h1>

<div class="timer" id="time">25:00</div>

<button onclick="startTimer()">Start</button>
<button onclick="pauseTimer()">Pause</button>
<button onclick="resetTimer()">Reset</button>

<br>

<input id="work" placeholder="Work (min)">
<input id="break" placeholder="Break (min)">

<p id="cycles">Completed: 0</p>

</div>

<div class="tasks">

<h3>Tasks</h3>

<input id="taskInput" placeholder="New task">
<button onclick="addTask()">Add</button>

<div id="taskList"></div>

</div>

<script>
let time = 1500;
let timer;
let running = false;
let cycles = 0;
let isWork = true;

function updateDisplay(){
let min = Math.floor(time/60);
let sec = time%60;
document.getElementById("time").innerText =
(min<10?"0":"")+min+":"+(sec<10?"0":"")+sec;
}

function startTimer(){
if(running) return;
running = true;


let workInput = document.getElementById("work").value;
if(workInput){
time = workInput * 60;
}

timer = setInterval(()=>{
time--;

updateDisplay();

if(time <= 0){
if(isWork){
cycles++;
document.getElementById("cycles").innerText = "Completed: " + cycles;
time = (document.getElementById("break").value || 5) * 60;
} else {
time = (document.getElementById("work").value || 25) * 60;
}
isWork = !isWork;
}

},1000);
}

function pauseTimer(){
clearInterval(timer);
running = false;
}

function resetTimer(){
clearInterval(timer);
time = 1500;
running = false;
updateDisplay();
}



function addTask(){
let text = document.getElementById("taskInput").value;

if(!text) return;

let taskDiv = document.createElement("div");
taskDiv.className = "task";

let checkbox = document.createElement("input");
checkbox.type = "checkbox";

let span = document.createElement("span");
span.innerText = text;

let comment = document.createElement("input");
comment.placeholder = "note";

checkbox.onchange = ()=>{
if(checkbox.checked){
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

</body>
</html>

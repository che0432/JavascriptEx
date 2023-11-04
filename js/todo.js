const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

// todo localStorage에 저장
function saveToDos(){
    // localStorage에 JSON을 사용하여 배열 그대로 string형으로 저장
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// todo 삭제
function deleteToDo(event){
    // 해당 li의 정보값
    const li = event.target.parentElement;
    li.remove();
    // toDo의 id와 li의 id가 다른 것만 toDos 배열에 저장
    toDos = toDos.filter(toDo => toDo.id != parseInt(li.id));
    saveToDos();
}

// todo 출력
function paintToDo(newTodo){
    const li = document.createElement("li");
    // li의 id를 설정
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click", deleteToDo)
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

// todo 저장
function onToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    // Object로 만들어서 저장
    const newToDoObj = {
        id: Date.now(),
        text: newTodo
    };
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", onToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos != null){
    // string 형태로 저장한 배열을 JSON을 사용하여 다시 배열로 저장
    const parsedToDos = JSON.parse(savedToDos);
    // 이전 todo 복원
    toDos = parsedToDos;
    // parsedToDos 배열의 모든 값(element)에 대해 paintToDo 함수 실행
    // parsedToDos.forEach(element => paintToDo(element));
    parsedToDos.forEach(paintToDo);
}
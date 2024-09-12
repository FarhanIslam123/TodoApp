//finding elements
const container =document.querySelector('.container');
const todoForm =document.querySelector('.todo-form');
const todoInput =document.querySelector('#input-todo');
const todoAddButton =document.querySelector('.btn');
const todoLists =document.getElementById('lists') ;
const messageElement=document.getElementById('message') ;

//create todos
const createTodo =(todoId,todoValue)=>{
  const todoElement =document.createElement('li');
  todoElement.id=todoId;
  todoElement.classList.add('li-style');
  todoElement.innerHTML=`<spain> ${todoValue}</spain><spain>
  <button class='btn' id='deleteButton'> <i class="fa fa-trash" aria-hidden="true"></i> </button>
  </spain>`;
  todoLists.appendChild(todoElement);
  // select button
  const deleteButton=todoElement.querySelector('#deleteButton');
  deleteButton.addEventListener('click',deleteTodo)
}   

//delete todos
const deleteTodo=(e)=>{
  const selectedTodo=e.target.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage('todo is deleted','danger');
  
  let todos =getTodosFromLocalStorage();
   todos=todos.filter((todo)=>todo.todoId!==selectedTodo.id);
   localStorage.setItem('myTodos',JSON.stringify(todos));
  }

//showMassege
const showMessage =(text,status)=>{
  messageElement.textContent=text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(()=>{
    messageElement.textContent='';
    messageElement.classList.remove(`bg-${status}`)
  },1000)
};

//get todos from localStorage
const getTodosFromLocalStorage=()=>{
  return localStorage.getItem('myTodos')? JSON.parse(localStorage.getItem('myTodos')):[];
} 

//add todos
const addTodo=(e)=>{
  e.preventDefault();
  const todoValue =todoInput.value; 
  
    //create uniqe id
  const todoId =Date.now().toString();
  createTodo(todoId,todoValue);
  showMessage('todo is added','success');
  
  //adding todos to localStorage
  const todos=getTodosFromLocalStorage();
  todos.push({todoId,todoValue});
  localStorage.setItem('myTodos',JSON.stringify(todos));
  todoInput.value="";
  };
  
  //load todosList
  const loadTodo =()=>{
    const todos =getTodosFromLocalStorage();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValue))
      } 

//adding listener
todoForm.addEventListener('submit',addTodo);

//for reload
window.addEventListener('DOMContentLoaded',loadTodo)

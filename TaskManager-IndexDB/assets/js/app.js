const taskinput = document.querySelector('#task');
const  form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const desBtn = document.querySelector('#order');
const reloadIcon = document.querySelector('.fa');

let DB;
document.addEventListener('DOMContentLoaded',()=>{
    let TasksDB = indexedDB.open('tasks',1);
    TasksDB.onerror = function(){
        console.log("There was an error.");
    }
    TasksDB.onsuccess = function(){
        console.log("Database Ready");
        DB = TasksDB.result;
        displayTaskList();
    }
    TasksDB.onupgradeneeded = function(e){
        let db = e.target.result;
        let objectStore = db.createObjectStore('tasks',{keyPath:'id', autoIncrement:true});
        objectStore.createIndex('taskname','taskname',{unique:false});
        console.log('Database ready and fields created!');
    }
    function addNewTask(e){
        let newTask = {
            taskname: taskinput.value
        }
        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');
        let request = objectStore.add(newTask);
        request.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('new task added');
            displayTaskList();
        }
        transaction.onerror = () => {
            console.log('there was an error, try again!');
        }
    }
})


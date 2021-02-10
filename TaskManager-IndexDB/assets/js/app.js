const taskinput = document.querySelector('#task');
const  form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const desBtn = document.querySelector('#decs');
const ascBtn = document.querySelector('#asc');
const reloadIcon = document.querySelector('.fa');

let DB;
document.addEventListener('DOMContentLoaded',()=>{
    form.addEventListener('submit',addNewTask);
    clearBtn.addEventListener('click', clearAllTasks);
    filter.addEventListener('keyup', filterTasks);
    taskList.addEventListener('click', removeTask);
    desBtn.addEventListener('click',reverse);
    ascBtn.addEventListener('click',ascreverse);
    reloadIcon.addEventListener('click', reloadPage);
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
    form.addEventListener('submit',addNewTask);
    function addNewTask(e){
        e.preventDefault(); 
    let newTask = {
        taskname: taskinput.value,
        date: Date.now()
    }
    let transaction = DB.transaction(['tasks'], 'readwrite');
     let objectStore = transaction.objectStore('tasks');

    let request = objectStore.add(newTask);
    request.onsuccess = () => {
        form.reset();
    }
    transaction.oncomplete = () => {
        console.log('New Task added');
        displayTaskList();
    }
    transaction.onerror = () => { console.log('There was an error, try again!'); }

    // Check empty entry
    if (taskinput.value === '') {
        taskinput.style.borderColor = "red";

        return;
    }
    }
    /*function displayTaskList(){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        let objectStore = DB.transaction('tasks').objectStore('tasks');
        objectStore.openCursor().onsuccess = function(e){
            let cursor = e.target.result;
            if(cursor){
                li.setAttribute('data-task-id', cursor.value.id);
                li.appendChild(document.createTextNode(cursor.value.taskname));
                cursor.continue();
            }
        }
    }*/
    function displayTaskList() {
        while (taskList.firstChild) {   taskList.removeChild(taskList.firstChild);}
        let objectStore = DB.transaction('tasks').objectStore('tasks');
        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if (cursor) {
                const li = document.createElement('li');
                li.setAttribute('data-task-id', cursor.value.id);
                li.className = 'collection-item';
                li.appendChild(document.createTextNode(cursor.value.taskname));
                const link = document.createElement('a');
                link.className = 'delete-item secondary-content';
                link.innerHTML = `<i class="fa fa-remove"></i>  &nbsp;
                <a href="./edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a> `;
                li.appendChild(link);
                taskList.appendChild(li);     
                cursor.continue();
            }
        }
    }
    function clearAllTasks(){
        let transaction = DB.transaction("tasks", "readwrite");
        let tasks = transaction.objectStore("tasks");
        tasks.clear();
        displayTaskList();
        console.log("Tasks Cleared!");
    }
    function removeTask(e){
        if(confirm("Are You Sure About That?")){
            let taskID = Number(e.target.parentElement.parentElement.getAttribute('data-task-id'));
            let transaction = DB.transaction(['tasks'], 'readwrite');
            let objectStore = transaction.objectStore('tasks');
            objectStore.delete(taskID);
            transaction.oncomplete = () =>{
                e.target.parentElement.parentElement.remove();
            }
        }
    }
    function createTaskElement(id, task, date) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.setAttribute('data-task-id', id)
        const p = document.createElement("span")
        p.innerHTML = task
        li.appendChild(p);
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>  &nbsp; <a href="edit.html?id=${id}"><i class="fa fa-edit"></i> </a>`;
        li.appendChild(link);
        taskList.appendChild(li);
        const addDate = document.createElement("em")
        addDate.className = "align-right"
        addDate.innerHTML = date
        li.appendChild(addDate)
    }
    function clearAllTasks() {
        if (confirm("Are you sure you want to clear all tasks?")) {
            //Create the transaction and object store
            let transaction = DB.transaction("tasks", "readwrite");
            let tasks = transaction.objectStore("tasks");

            // clear the the table
            tasks.clear();
            //repaint the UI
            displayTaskList();

            console.log("Tasks Cleared !!!");
        }
    }
    function reverse() {

        while (taskList.firstChild) {   taskList.removeChild(taskList.firstChild);}
    let objectStore = DB.transaction('tasks').objectStore('tasks');
    objectStore.openCursor(null,'prev').onsuccess = function(e) {
        let cursor = e.target.result;
        if (cursor) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(taskinput.value));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = `<i class="fa fa-remove"></i>  &nbsp;
            <a href="/edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a> `;
            li.appendChild(link);
            taskList.appendChild(li);     
            li.setAttribute('data-task-id', cursor.value.id);
            li.appendChild(document.createTextNode(cursor.value.taskname));
            cursor.continue();
        }
    }


    }function ascreverse(){
        while (taskList.firstChild) {   taskList.removeChild(taskList.firstChild);}
            let objectStore = DB.transaction('tasks').objectStore('tasks');
            objectStore.openCursor().onsuccess = function(e) {
                let cursor = e.target.result;
                if (cursor) {
                    const li = document.createElement('li');
                    li.className = 'collection-item';
                    li.appendChild(document.createTextNode(taskinput.value));
                    const link = document.createElement('a');
                    link.className = 'delete-item secondary-content';
                    link.innerHTML = `<i class="fa fa-remove"></i>  &nbsp;
                    <a href="/edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a> `;
                    li.appendChild(link);
                    taskList.appendChild(li);     
                    li.setAttribute('data-task-id', cursor.value.id);
                    li.appendChild(document.createTextNode(cursor.value.taskname));
                    cursor.continue();
                }
            }
    }    
    function filterTasks(e) {
            let filter = (e.target.value).toUpperCase();
            const li = taskList.querySelectorAll('li');
            li.forEach(item => {
                let txtValue = (item.textContent).toUpperCase();
                if (txtValue.indexOf(filter) > -1) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            })
        
    }
    function reloadPage(){
        location.reload();
    }

    });

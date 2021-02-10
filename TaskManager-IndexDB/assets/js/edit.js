const form = document.querySelector('#task-form'); 
const taskInput = document.querySelector('#task'); 

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
var DB;

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', updateTask);

    let TasksDB = indexedDB.open('tasks', 1);
    TasksDB.onerror = function() {
            console.log('There was an error');
        }
    TasksDB.onsuccess = function() {
        console.log('Database Ready');
        DB = TasksDB.result;
        displayTask();
    }
    function displayTask() {
        var transaction = DB.transaction(['tasks']);
        var objectStore = transaction.objectStore('tasks');
        var request = objectStore.get(id);

        request.onsuccess = function(event) {
            if (request.result) {
                taskInput.value = request.result.taskname;
            } else {
                console.log('No data record');
            }
        };
        request.onerror = function(event) {
            console.log('Transaction failed');
        };
    }
    function updateTask(e) {
        e.preventDefault();
        if (taskInput.value === '') {
            taskInput.style.borderColor = "red";
            return;
        }
        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');
        let request = objectStore.openCursor()
        request.onerror = function (e) {
            console.log("There was an error, try again!");
        };
        request.onsuccess = function (e) {
            let cursor = e.target.result;
            let newTask = {
                taskname: taskInput.value,
                date: Date.now(),
                id: id
            }
            if (cursor) {
                if(cursor.value.id == id){
                var res = cursor.update(newTask);
                res.onsuccess = function (e) {
                    console.log("Updated Successfully!!");
                }
                res.onerror = function (e) {
                    console.log("Update Unsuccessfull!!");
                }
            }
            cursor.continue();
        }
        else {
            console.log("Done!");
        }
        history.back();
    }
}
});
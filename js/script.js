function prepareFormTag(tag) {
    $(`#tagFormTitle`).text(`Create tag in task: ${tag}`)
    $('#createTag').attr('onclick', `addTag('${tag}')`)
}
function prepareFormTask(board) {
    $(`#taskFormTitle`).text(`Create task ${board}`)
    $('#createTask').attr('onclick', `addTask('${board}')`)
}
function addTask(board) {
    let id = $('#taskTitle').val().replace(/\s/g, '');
    $(`#${board} > .card-body`).append(`
    <div class="card mb-2 task" id="${id}" draggable="true">
        <div class="card-body py-1 d-flex flex-column align-items-end">
            <button class="btn btn-sm shadow-none" onclick="prepareFormTag('${id}')">
                <i class="fas fa-tag" data-bs-toggle="modal" data-bs-target="#tagForm"></i>
            </button>
            <h3 class="align-self-start">${$('#taskTitle').val()}</h3>
            <p class="align-self-start">${$('#taskDescription').val()}</p>
            <button class="btn btn-sm shadow-none" onclick="deleteTask('${id}')">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </div>`)
    $('#taskTitle').val('')
    $('#taskDescription').val('')
}
function addTag(card) {
    $(`#${card} > .card-body`).prepend(`<span class="badge rounded-pill bg-warning text-dark align-self-start">${$('#tag').val()}</span>`)
    $('#tag').val('')
}
function addBoard() {
    let id = $('#board').val().replace(/\s/g, '');
    $('#mainRow').append(`
    <div class="col-md-4">
        <div class="card mb-3" id="${id}">
            <div class="card-header">
                <h2 class="card-title">${$('#board').val()}</h2>
                <button class="btn btn-sm shadow-none" onclick="prepareFormTask('${id}')">
                    <i class="fas fa-plus-square" data-bs-toggle="modal" data-bs-target="#taskForm"></i>
                </button>
            </div>
            <div class="card-body dropArea">
                <div class="dropTop"></div>
            </div>
        </div>
    </div>`)
}
function deleteTask(id){
    $(`#${id}`).remove()
}
setInterval(function(){
    $('.card').on('dragstart', function(e) {
        $(e.target).closest('.dropArea').addClass('over')
        $(e.target).addClass('dragging')
        $('.dropArea').addClass('highlight')
    })
    $('.card').click(function(e) {
    
    })
    $('.card').on('dragend', function() {
        $('.dropArea').removeClass('highlight over')
        $('.dragging').removeClass('dragging')
    })
    $('.dropArea').on('dragenter', function(e) {
        $('.dropArea').removeClass('over')
        let dropArea = $(e.target).hasClass('dropArea') ? $(e.target) : $(e.target).closest('.dropArea')
        dropArea.addClass('over')
        $(dropArea).append($('.dragging'))
        
    })
}, 2000);


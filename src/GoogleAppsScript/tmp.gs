function getTaskLists() {
    var taskLists = Tasks.Tasklists.list().getItems();
    if (!taskLists) {
        return [];
    }
    return taskLists.map(function(taskList) {
        return {
        id: taskList.getId(),
        name: taskList.getTitle()
        };
    });
}

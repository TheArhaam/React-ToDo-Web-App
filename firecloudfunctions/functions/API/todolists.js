
exports.getToDoLists = (request, response) => {
    todolists = [
        { 'id': '1', 'name': 'College work' },
        { 'id': '2', 'name': 'House work' },
        { 'id': '3', 'name': 'Workout' },
    ]
    return response.json(todolists);
}
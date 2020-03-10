module.exports = (app) => {
    const accounts = require('../controllers/account.controller.js');

    // Create a new Note
    app.post('/accounts', accounts.create);

    // Retrieve all Notes
    app.get('/controller', accounts.findAll);

    // Retrieve a single Note with noteId
    app.get('/controller/:accountId', accounts.findOne);

    // Update a Note with noteId
    app.put('/controller/:accountId', accounts.update);

    // Delete a Note with noteId
    app.delete('/controller/:accountId', accounts.delete);
}
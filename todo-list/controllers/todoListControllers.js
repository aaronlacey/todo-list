const ListItem = require('../models/TodoList');

//-----------Creates Single Task----------------
async function createTask(req, res, next) {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const newListItem = new ListItem({
            name,
            description
        });
        const savedData = await newListItem.save();

        res.json({
            success: true,
            listItem: savedData
        });

    } catch (e) {
        console.log(typeof e);
        console.log(e);
        res.json({
            error: e.toString(),
        });
    }
}


//----------------Updates One Task--------------------//
async function updateOneTask(req, res) {
    try {
        const updates = {
            status: req.body.status

        }
        if (req.body.status === "complete") {
            updates.dateCompleted = Date.now();
            updates.completed = true;
        }

        await ListItem.updateOne({ name: req.params.name }, updates);
        res.json({ success: true, updates: res.body });

    } catch (e) {
        console.log(e);

    }
}

//----------------Deletes One Task--------------------//
async function deleteOneTask(req, res) {
    try {
        await ListItem.deleteOne({ name: req.params.name });
    } catch (err) {
        console.log(err);
        throw err;
    }

    res.json({
        success: true,
        message: `List item deleted.`
    })
}


//----------------Deletes Multiple Tasks--------------------//
async function deleteMultipleTasks(req, res) {
    try {
        const namesToDelete = req.body
        if (namesToDelete.length < 1) {
            throw Error("names to delete empty!");
        }
        await ListItem.deleteMany({
            name: {
                $in: namesToDelete
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }

    res.json({
        success: true,
        message: 'List items deleted'
    })

}


//-----------Creates Multiple Tasks----------------//
async function createMultipleTasks(req, res) {
    try {
        const multipleListItems = req.body;
        const savedData = await ListItem.create(multipleListItems);

        res.json({
            success: true,
            listItem: savedData
        });
    } catch (e) {
        console.log(typeof e);
        console.log(e);
        res.json({
            error: e.toString(),
        });
    }
}

//----------------Displays All Tasks--------------------//
async function getAllTasks(req, res) {
    //query todo list
    try {
        const listItems = await ListItem.find({});
        res.json({ listItems: listItems });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    createTask,
    updateOneTask,
    deleteOneTask,
    deleteMultipleTasks,
    createMultipleTasks,
    getAllTasks,
};
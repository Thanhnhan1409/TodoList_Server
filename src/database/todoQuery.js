const knex = require('./connection');

const getTodos = async () => {
    try {
        const todos = await knex('Tasks').select('*');

        return todos;
    } catch (error) {
        console.log(error);
    }
};

const getTodoByData= async (type, data) => {
    try {
        const todos = await knex('Tasks').select('*').where(type, data);

        if (!todos) {
            return;
        }
        return todos;
    } catch (error) {
        console.log(error);
    }
};

const getTodoByDateAndStatus= async (date, status) => {
    try {
        const todos = await knex('Tasks')
        .select('*')
        .where('due_date',date)
        .where('status',status);

        if (!todos) {
            return;
        }
        return todos;
    } catch (error) {
        console.log(error);
    }
};

const addTodo = async (todo) => {
    const { task_name, description, due_date } = todo;
    const created_at = new Date();
    try {
        const todo = await knex('Tasks').
        insert({
            task_name,
            description,
            due_date,
            created_at
        })
        return todo;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding todo');
    }
};

const updateTodo = async (id, newTodo) =>{
    const { task_name, description, due_date} = newTodo;
    try {
        const result = await knex('Tasks')
        .where('task_id',id)
        .update({
            task_name, 
            description, 
            due_date
        })

        if(result === 0){
            throw new Error('Todo with id ${id} not found')
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error updating todo');
    }
}

const deleteTodo = async (id) =>{
    try {
        const todo = await knex('Tasks').where('task_id',id).del();

        if(todo === 0){
            throw new Error('Todo not found')
        }
        
        return todo;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating status');
    }
}

const updateTodoStatus = async (id,todo) =>{
    const {status} = todo;
    try {
        const result = await knex('Tasks').where('task_id',id)
        .update({status})
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating status');
    }
}

module.exports = {
    deleteTodo,
    addTodo,
    getTodoByData,
    getTodos,
    updateTodo,
    updateTodoStatus,
    getTodoByDateAndStatus
}
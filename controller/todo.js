const pool = require('../config/database')

module.exports = {
    getTodo: async (req,res)=>{
        try{
            const [rows] = await pool.query('SELECT * FROM daily_tasks');
            return res.status(200).json({
                success: true,
                data: rows
            })
        } catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    },

    getOne: async (req,res)=> {
        try{
            const one = req.params.one


            const [only] = await pool.query('SELECT * FROM daily_tasks WHERE id  = ?', [one] )

            if(only.length === 0){
                return res.status(404).json({
                    success: false,
                    message: "task not found",
                })
            }

            return res.status(200).json({success: true, data: only})

        } catch(err){
            console.log(err)
            return res.status(500).json({success: false, error: err.message})
        }
    },

    create: async (req,res)=> {
        try{
            const {task} = req.body
            if(!task){
                return res.status(400).json({success: false, error: "tasks can't be empty"})
            }
            const [result]  = await pool.query('INSERT INTO daily_tasks (tasks) VALUES (?)',
                [task]
            )

            return res.status(200).json({
                success: true,
                message: "task created successfully",
                taskId: result.insertId,
            })

        } catch(err){
            console.log(err)
            return res.status(500).json({
                success: false, 
                error: err.message
            })
        }
    }, 

    remove : async(req,res)=> {
        try{
            const cancel =req.params.id

            const [del] = await pool.query('DELETE FROM daily_tasks WHERE id = ?', [cancel] )
            if(del.affectedRows === 0 ){
                return res.status(404).json({
                    success: false,
                    message: "Task not found to delete"
                })
            }

            return res.status(200).json({
                success: true,
                message: `Task with id ${cancel} deleted successfully`
            })

        }catch (err){
            console.log(err)
            return res.status(500).json({ success: false, err: err.message})
        }
    },

    update: async (req,res)=> {
        try{
            const taskId = req.params.id
            const updateTask = req.body.task
            if (!updateTask){
                return res.status(404).json({
                    success: false,
                    error: "Updated task content is required"
                })
            }
            const [result] = await pool.query('UPDATE daily_tasks SET tasks = ? WHERE id = ?',[updateTask, taskId])

            if(result.affectedRows === 0 ){
                return res.status(404).json({
                    success: false,
                    error: `task with id ${taskId} not found to update`
                })
            }

            return res.status(200).json({
                success: true,
                message: ` Task with Id ${taskId} updated successfully`
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }
}
const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) =>{
        pool.query(
            'insert into registration(firstName, lastName, email, password, number) value(?,?,?,?,?)',
            [
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.number
            ],
            (error,results,fields) =>{
                if(error) {
                   return callBack(error)
                }
                return callBack(null, results)
            }
        )

    },
    getUsers: callBack => {
        pool.query(
            'select firstName, lastName, email, password, number from registration',
            [],
            (error,results,fields) => {
                if(error) {
                    return callBack(error)
                 }
                 return callBack(null, results)
            }
        )
    },
    getUsersByUserId: (id, callBack) => {
        pool.query(
            'select id, firstName, lastName, email, password, number from registration where id = ?',
            [id],
            (error,results,fields) => {
                if(error) {
                    return callBack(error)
                 }
                 return callBack(null, results[0])
            }
        )
    },
    updateUsers: (data, callBack) => {
        pool.query(
            'update registration set firstName=?, lastName=?, email=?, password=?, number=? where id = ?',
            [
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error,results,fields) => {
                if(error) {
                    return callBack(error)
                 }
                 return callBack(null, results)
            }
        )
    },
    deleteUsers: (id, callBack) => {
        pool.query(
            'delete from registration where id = ?',
            [
                data.id
            ],
            (error,results,fields) => {
                if(error) {
                    return callBack(error)
                 }
                 return callBack(null, results[0])
            }
        )
    },
    getUserByUserEmail: (email, callBack) =>{
        pool.query(
            'select * from registration where email = ?',
            [email],
            (error,results,fields) => {
                if(error) {
                    return callBack(error)
                 }
                 return callBack(null, results[0])
            }
        )
    }
}
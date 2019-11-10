const resolvers = {
    Query: {
        //Args se puede deconstruir por modelos individuales (parametros)
        async allUsers(root, args, {
            models
        }) {
            return models.User.findAll()
        }
    },
    Mutation: {
        //Aqui si se construye el parametro
        async createUser(root, {
            name,
            latitude,
            longitude
        }, {
            models
        }) {
            return models.User.create({
                //Si tienen el mismo nombre me puedo saltar el definir la variable
                name,
                latitude,
                longitude
            })
        }
    }
}

module.exports = resolvers
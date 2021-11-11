const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        date: {type: GraphQLString},
        status: {type: GraphQLBoolean}
    })
});



module.exports = { UserType }
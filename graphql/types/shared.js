const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt } = require("graphql");


// Types that are similar in many responses of the API

// type para mensaje genérico que puede venir de un result o de un error en mongoose
const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        msg: {type: GraphQLString}
    })
});

// type de response genérica para agrupar el success o error de un GET by id de cualquier modelo
const ReadOneResponseType = new GraphQLObjectType({
    name: 'ReadOneResponse',
    fields: () => ({
        ok:     {type: GraphQLBoolean},
        msg:    {type: GraphQLString},
        errors: {
            type: new GraphQLList(MessageType)
        },
        course:     { type: require('./course').CourseType},
        professor:  { type: require('./professor').ProfessorType},
        user:       { type: require('./user').UserType},
    })
});

// type de response genérica para agrupar el success o error de un GET all de cualquier modelo
const ReadAllResponseType = new GraphQLObjectType({
    name: 'ReadAllResponse',
    fields: () => ({
        ok:     {type: GraphQLBoolean},
        msg:    {type: GraphQLString},
        total:  {type: GraphQLInt},
        errors: {
            type: new GraphQLList(MessageType)
        },
        courses:    { type: new GraphQLList(require('./course').CourseType)},
        professors: { type: new GraphQLList(require('./professor').ProfessorType)},
        users:      { type: new GraphQLList(require('./user').UserType)},
    })
});

// type de response genérica para agrupar el success o error de un CREATE de cualquier modelo
const CreatedUpdatedResponseType = new GraphQLObjectType({
    name: 'CreatedResponse',
    fields: () => ({
        ok: {type: GraphQLBoolean},
        msg: {type: GraphQLString},
        token: {type: GraphQLString},
        errors: {
            type: new GraphQLList(MessageType)
        },
        course: { type: require('./course').CourseType},
        professor: { type: require('./professor').ProfessorType},
        user: { type: require('./user').UserType},
    })
});

// type de registros modificados por un update many
const UpdatedDataType = new GraphQLObjectType({
    name: 'UpdatedData',
    fields: () => ({
        acknowledged:   {type: GraphQLBoolean},
        modifiedCount:  {type: GraphQLInt},
        upsertedId: {type: GraphQLString},
        upsertedCount:  {type: GraphQLInt},
        matchedCount:   {type: GraphQLInt}
    })
});

module.exports = { 
    MessageType,
    ReadOneResponseType,
    ReadAllResponseType,
    CreatedUpdatedResponseType,
    UpdatedDataType
}
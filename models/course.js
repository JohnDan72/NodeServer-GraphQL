const { GraphQLObjectType , GraphQLString, GraphQLSchema } = require('graphql');

// static data
let courses = [
    {id: '1', name: 'Patrones diseño Java' , language: 'Java', date: '2021'},
    {id: '2', name: 'Angular desde cero' , language: 'Javascript', date: '2016'},
    {id: '3', name: 'React con Hooks' , language: 'Javascript', date: '2011'},
    {id: '4', name: 'Raby on rails' , language: 'Ruby', date: '2008'},
    {id: '5', name: 'Django' , language: 'Python', date: '2008'},
];

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        language: {type: GraphQLString},
        date: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        course: {
            type: CourseType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return courses.find( curso => curso.id === args.id );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
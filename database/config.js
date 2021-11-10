const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql");
const { CourseType } = require("../models/course");
const { ProfessorType } = require("../models/professor");
const { UserType } = require("../models/user");

// mongoose schema
const Course = require("../models/mongoSchemas/course");
const Professor = require("../models/mongoSchemas/professor");

// static data
const { courses, professors , users } = require("./data");


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // courses
        course: {
            type: CourseType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                // return courses.find( curso => curso.id === args.id );
                return Course.findById(args.id);
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent, args){
                // return courses
                return Course.find({status: true});
            }
        },
        // professors
        professor: {
            type: ProfessorType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                // return professors.find( profe => profe.id === args.id );
                return Professor.findById(args.id);
            }
        },
        professors: {
            type: new GraphQLList(ProfessorType),
            resolve(parent , args){
                // return professors;
                return Professor.find({status: true});
            }
        },
        // users
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return users.find( user => user.id === args.id );
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent , args){
                return users
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCourse: {
            type: CourseType,
            args:{
                name: { type: GraphQLString },
                language: { type: GraphQLString },
                professorId: { type: GraphQLID },
            },
            resolve(parent , args){
                const { name , language ,  professorId} = args;
                const newCourse = new Course({name , language , professorId});

                return newCourse.save();
                 
            }
        },
        addProfessor: {
            type: ProfessorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent , args){
                const { name , age } = args;
                const newProf = new Professor({ name , age });

                return newProf.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
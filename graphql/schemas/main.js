const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = require("graphql");

// models
const { Course } = require("../../models/course");
const { Professor } = require("../../models/professor");
const { User } = require("../../models/user");

// types
const { ReadOneResponseType, ReadAllResponseType, CreatedUpdatedResponseType, UpdatedDataType } = require("../types/shared");

// controller functions
const { getCourseById, getAllCourses, createCourse, updateCourse, deleteCourse } = require("../../controllers/course.controller");
const { getProfessorById, getAllProfessors, createProfessor, updateProfessor, deleteProfessor } = require("../../controllers/profesores.controller");
const { getUserById, getAllUsers, createUser, updateUser, deleteUser } = require("../../controllers/users.controller");


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // courses
        course: {
            type: ReadOneResponseType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return getCourseById( parent , args );
            }
        },
        courses: {
            type: ReadAllResponseType,
            resolve(parent, args){
                return getAllCourses( parent , args );
            }
        },
        // professors
        professor: {
            type: ReadOneResponseType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return getProfessorById(parent , args);
            }
        },
        professors: {
            type: ReadAllResponseType,
            resolve(parent , args){
                return getAllProfessors(parent , args);
            }
        },
        // users
        user: {
            type: ReadOneResponseType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return getUserById(parent,args);
            }
        },
        users: {
            type: ReadAllResponseType,
            resolve(parent , args){
                return getAllUsers(parent,args);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // COURSES OPERATIONS
        addCourse: {
            type: CreatedUpdatedResponseType,
            args:{
                name: { type: GraphQLString },
                language: { type: GraphQLString },
                professorId: { type: GraphQLID },
            },
            resolve(parent , args){
                return createCourse(parent,args);                 
            }
        },
        updateCourse: {
            type: CreatedUpdatedResponseType,
            args: {
                id: {type: GraphQLID},
                name: { type: GraphQLString },
                language: { type: GraphQLString }
            },
            resolve(parent , args){
                return updateCourse(parent,args);
            }
        },
        deleteCourse: {
            type: CreatedUpdatedResponseType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent , args){
                return deleteCourse(parent,args);
            }
        },
        deleteAllCourses: {
            type: UpdatedDataType,
            resolve(parent , args){
                return Course.updateMany({status: true},{status: false});
            }
        },
        restoreAllCourses: {
            type: UpdatedDataType,
            resolve(parent , args){
                return Course.updateMany({status: false},{status: true});
            }
        },
        // PROFESSORS OPERATIONS
        addProfessor: {
            type: CreatedUpdatedResponseType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent , args){
                return createProfessor(parent,args);
            }
        },
        updateProfessor: {
            type: CreatedUpdatedResponseType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent , args){
                return updateProfessor(parent,args);
            }
        },
        deleteProfessor: {
            type: CreatedUpdatedResponseType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return deleteProfessor(parent,args);
            }
        },
        deleteAllProfessors: {
            type: UpdatedDataType,
            resolve(parent , args){
                return Professor.updateMany({status: true}, {status: false});
            }
        },
        restoreAllProfessors: {
            type: UpdatedDataType,
            resolve(parent , args){
                return Professor.updateMany({status: false}, {status: true});
            }
        },
        // USERS OPERATIONS
        addUser: {
            type: CreatedUpdatedResponseType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent , args){
                return createUser(parent , args);
            }
        },
        updateUser: {
            type: CreatedUpdatedResponseType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent , args){
                return updateUser(parent,args);
            }
        },
        deleteUser: {
            type: CreatedUpdatedResponseType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return deleteUser(parent,args);
            }
        },
        deleteAllUsers: {
            type: UpdatedDataType,
            resolve(parent , args){
                return User.updateMany({status: true}, {status: false});
            }
        },
        restoreAllUsers: {
            type: UpdatedDataType,
            resolve(parent , args){
                return User.updateMany({status: false}, {status: true});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
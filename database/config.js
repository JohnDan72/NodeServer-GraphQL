const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql");
const { CourseType } = require("../models/course");
const { ProfessorType } = require("../models/professor");
const { UserType } = require("../models/user");

// mongoose schema
const Course = require("../models/mongoSchemas/course");
const Professor = require("../models/mongoSchemas/professor");
const { User } = require("../models/mongoSchemas/user");

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
                // return users.find( user => user.id === args.id );
                return User.findOne({status: true, _id: args.id});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent , args){
                // return users
                return User.find({status: true});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // COURSES OPERATIONS
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
        updateCourse: {
            type: CourseType,
            args: {
                id: {type: GraphQLID},
                name: { type: GraphQLString },
                language: { type: GraphQLString }
            },
            resolve(parent , args){
                const { id , name , language } = args;
                return Course.findByIdAndUpdate(id,{name , language},{ new: true });
            }
        },
        deleteCourse: {
            type: CourseType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent , args){
                return Course.findByIdAndUpdate(args.id,{status: false},{new: true});
            }
        },
        deleteAllCourses: {
            type: CourseType,
            resolve(parent , args){
                return Course.updateMany({status: true},{status: false},{new: true});
            }
        },
        restoreAllCourses: {
            type: CourseType,
            resolve(parent , args){
                return Course.updateMany({status: false},{status: true},{new: true});
            }
        },
        // PROFESSORS OPERATIONS
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
        },
        updateProfessor: {
            type: ProfessorType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent , args){
                const { id , name , age } = args;
                return Professor.findByIdAndUpdate(id,{name , age},{new: true});
            }
        },
        deleteProfessor: {
            type: ProfessorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return Professor.findByIdAndUpdate(args.id , {status: false} , {new: true});
            }
        },
        deleteAllProfessors: {
            type: ProfessorType,
            resolve(parent , args){
                return Professor.updateMany({status: true}, {status: false});
            }
        },
        restoreAllProfessors: {
            type: ProfessorType,
            resolve(parent , args){
                return Professor.updateMany({status: false}, {status: true});
            }
        },
        // USERS OPERATIONS
        addUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent , args){
                const { name , email , password } = args;
                const newUser = new User({ name , email , password });

                return newUser.save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent , args){
                const { id , name , email , password} = args;
                return User.findByIdAndUpdate(id,{ name , email , password},{new: true});
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return User.findByIdAndUpdate(args.id , {status: false} , {new: true});
            }
        },
        deleteAllUsers: {
            type: UserType,
            resolve(parent , args){
                return User.updateMany({status: true}, {status: false});
            }
        },
        restoreAllUsers: {
            type: UserType,
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
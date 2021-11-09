// courses static data
let courses = [
    {id: '1', name: 'Patrones diseño Java' , language: 'Java', date: '2021', professorId: "2"},
    {id: '2', name: 'Angular desde cero' , language: 'Javascript', date: '2016', professorId: "2"},
    {id: '3', name: 'React con Hooks' , language: 'Javascript', date: '2011', professorId: "4"},
    {id: '4', name: 'Raby on rails' , language: 'Ruby', date: '2008', professorId: "1"},
    {id: '5', name: 'Django' , language: 'Python', date: '2008', professorId: "1"},
];

// professors static data
let professors = [
    {id: '1', name: 'Juan Daniel García' ,    age: 24, status: true  ,   date: '2021'},
    {id: '2', name: 'Fernando Herrera' ,      age: 34, status: true  ,   date: '2016'},
    {id: '3', name: 'Lidia Amaro Mena' ,      age: 41, status: false  ,   date: '2011'},
    {id: '4', name: 'Mario Anzures' ,         age: 33, status: false  ,   date: '2008'},
    {id: '5', name: 'Luis Hernandez Pintro' , age: 24, status: true  ,   date: '2008'},
];

// users static data
let users = [
    {id: '1', name: 'Juan Daniel García' ,    email: 'email1@gmail.com', password: 'xdlol123'  ,   date: '2021'},
    {id: '2', name: 'Fernando Herrera' ,      email: 'email1@gmail.com', password: 'xdlol123'  ,   date: '2016'},
    {id: '3', name: 'Lidia Amaro Mena' ,      email: 'email1@gmail.com', password: 'xdlol123'  ,   date: '2011'},
    {id: '4', name: 'User 4' ,                email: 'email1@gmail.com', password: 'xdlol123'  ,   date: '2008'},
    {id: '5', name: 'Luis Hernandez Pintro' , email: 'email1@gmail.com', password: 'xdlol123'  ,   date: '2008'},
];

module.exports = {
    courses,
professors,
users,
}

import api from "./api"


const list =() => {
    return api.get(api.url.students);
};

const get = id => api.get(`${api.url.students}/${id}`);

const add=data => api.post(api.url.students,data);

const update = (id,data) =>api.put(`${api.url.students}/${id}`,data);

const remove = id =>api.delete(`${api.url.students}/${id}`);

export default {

    list:list,
    get: get,
    add:add,
    update:update,
    delete:remove
};


// const post=()=>{
//     return api.post(api.url.majors)};
import axios from '../../../axios-instances/axios-firebase'

let blogsArray = [];

export const getBlogs = () => {
    if (blogsArray.length > 0) {
        return Promise.resolve(blogsArray);
    } else {
        return Promise.resolve(
            axios.get('/blogs.json')
                .then(response => {
                    const entries = Object.entries(response.data);
                    blogsArray = entries.map(entry => {
                        return { id: entry[0], ...entry[1], date: new Date(entry[1].date) }
                    })
                    blogsArray.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });

                   return blogsArray;
                })
                .catch(error => {
                    return error;
                }))
    }
}

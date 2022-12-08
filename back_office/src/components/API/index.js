import axios from './http';

/*
export async function getOrganization() {
    try {
        const response = axios.get('/organization/cercleIESN@gmail.com')
            .then(function (response) {
                console.log(response.data);
            });
        return response;
    } catch (error) {
        console.log(error)
        return [];
    }
}
*/

export async function getOrganizations() {
    try {
        const res = await axios.get('organization/organizations');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// toutes les requêtes vers l'API
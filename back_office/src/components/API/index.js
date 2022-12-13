import axios from './http';

export async function getOrganization(id) {
    try {
        const res = await axios.get(`organization/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getOrganizations() {
    try {
        const res = await axios.get('organization/organizations');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postOrganization(organization) {
    try {
        console.log("Post organization");
        const res = await axios.post('organization', organization);
    } catch (error) {
        console.error(error);
    }
}

export async function updateOrganization(organization) {
    try {
        console.log("Update organization");
        const res = await axios.patch('organization', organization);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteOrganization(id) {
    try {
        const res = await axios.delete(`organization/${id}`);
    } catch (error) {
        console.error(error);
    }
}

// toutes les requêtes vers l'API
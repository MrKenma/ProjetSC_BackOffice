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
    } catch (error) {
        console.error(error);
    }
}

export async function updateOrganization() {
    try {
        console.log("Update organization");
    } catch (error) {
        console.error(error);
    }
}

// toutes les requêtes vers l'API
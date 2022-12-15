import axios from './http';

/*-------------------------------------
ORGANIZATIONS
-------------------------------------*/
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
        await axios.post('organization', organization);
    } catch (error) {
        throw new Error("Un problème est survenu lors de l'ajout de l'organisation, réessayez plus tard");
    }
}

export async function updateOrganization(organization) {
    try {
        await axios.patch('organization', organization);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la modification de l'organisation, réessayez plus tard");
    }
}

export async function deleteOrganization(id) {
    try {
        await axios.delete(`organization/${id}`);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la suppression de l'organisation, réessayez plus tard");
    }
}

export async function organizationNameAlreadyExists(id, name) {
    try {
        const res = await axios.get(`organization/organizationByName/${name}`);
        console.log(res.status);
    } catch (error) {
        throw new Error("Un problème est survenu, veuillez réessayer plus tard");
    }
}

/*-------------------------------------
PARTIERS
-------------------------------------*/
export async function getPartier(id) {
    try {
        const res = await axios.get(`partier/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getPartiers() {
    try {
        const res = await axios.get('partier/partiers');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postPartier(partier) {
    try {
        console.log("Post partier");
        const res = await axios.post('partier', partier);
    } catch (error) {
        console.error(error);
    }
}

export async function updatePartier(partier) {
    try {
        console.log("Update partier");
        const res = await axios.patch('partier', partier);
    } catch (error) {
        console.error(error);
    }
}

export async function deletePartier(id) {
    try {
        const res = await axios.delete(`partier/${id}`);
    } catch (error) {
        console.error(error);
    }
}

/*-------------------------------------
EVENTS
-------------------------------------*/

export async function getEvent(id) {
    try {
        const res = await axios.get(`event/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getEvents() {
    try {
        const res = await axios.get('event/events');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postEvent(event) {
    try {
        console.log("Post event");
        const res = await axios.post('event', event);
    } catch (error) {
        console.error(error);
    }
}

export async function updateEvent(event) {
    try {
        console.log("Update event");
        const res = await axios.patch('event', event);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEvent(id) {
    try {
        const res = await axios.delete(`event/${id}`);
    } catch (error) {
        console.error(error);
    }
}

// toutes les requêtes vers l'API

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
        throw new Error("A problem occurred when adding the organisation, try again later");
    }
}

export async function updateOrganization(organization) {
    try {
        await axios.patch('organization', organization);
    } catch (error) {
        throw new Error("A problem occurred while editing the organisation, try again later");
    }
}

export async function deleteOrganization(id) {
    try {
        await axios.delete(`organization/${id}`);
    } catch (error) {
        throw new Error("A problem occurred when deleting the organisation, try again later");
    }
}

export async function organizationNameAlreadyExists(id, name) {
    try {
        const res = await axios.post(`organization/nameExists`, {id, name});
        return res.data;
    } catch (error) {
        throw new Error("A problem has occurred, please try again later");
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
        await axios.post('partier', partier);
    } catch (error) {
        throw new Error("Un problème est survenu lors de l'ajout de l'utilisateur, réessayez plus tard");
    }
}

export async function updatePartier(partier) {
    try {
        await axios.patch('partier', partier);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la modification de l'utilisateur, réessayez plus tard");
    }
}

export async function deletePartier(id) {
    try {
        await axios.delete(`partier/${id}`);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la suppression de l'utilisateur, réessayez plus tard");
    }
}

export async function emailAlreadyExists(id, name) {
    try {
        const res = await axios.get(`partier/partierByName/${name}`);
        console.log(res.status);
    } catch (error) {
        throw new Error("Un problème est survenu, veuillez réessayer plus tard");
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
        await axios.post('event', event);
    } catch (error) {
        throw new Error("Un problème est survenu lors de l'ajout de l'événement, réessayez plus tard");
    }
}

export async function updateEvent(event) {
    try {
        await axios.patch('event', event);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la modification de l'événement, réessayez plus tard");
    }
}

export async function deleteEvent(id) {
    try {
        await axios.delete(`event/${id}`);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la suppression de l'événement, réessayez plus tard");
    }
}


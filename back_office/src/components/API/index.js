import axios from './http';

/*-------------------------------------
FILES
-------------------------------------*/
export async function getProfilePicture(email) {
    try {
        const res = await axios.get(`/image/${email}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error.response.data);
        return undefined;
    }
}

/*-------------------------------------
USERS
-------------------------------------*/
export async function userEmailExists(email) {
    try {
        const res = await axios.get(`user/emailExists/${email}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function userPseudoExists(pseudo) {
    try {
        const res = await axios.get(`user/pseudoExists/${pseudo}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function login(email, password) {
    try {
        const res = await axios.get(`user/login?email=${email}&password=${password}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return error.response.status;
    }
}

export async function getUser(id) {
    try {
        const res = await axios.get(`user/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function updateUser(user) {
    try {
        const res = await axios.patch("user", user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw new Error("A problem occurred when updating the user, try again later");
    }
}

/*-------------------------------------
ORGANIZATIONS
-------------------------------------*/
export async function getOrganizations() {
    try {
        const res = await axios.get('organization', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getOrganization(id) {
    try {
        const res = await axios.get(`organization/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export async function postOrganization(organization) {
    try {
        await axios.post('organization', organization, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
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
        const res = await axios.get(`organization/nameExists`, {params: {id, name}});
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
        const res = await axios.get(`partier/getPartier/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getPartiers() {
    try {
        const res = await axios.get('partier/all');
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

export async function emailAlreadyExists(id, email) {
    try {
        const res = await axios.get(`partier/emailExists`, {params: {id, email}});
        return res.data;
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
        const res = await axios.get('1.0/event/all');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postEvent(event) {
    try {
        await axios.post('1.0/event', event);
    } catch (error) {
        throw new Error("Un problème est survenu lors de l'ajout de l'événement, réessayez plus tard");
    }
}

export async function updateEvent(event) {
    try {
        await axios.patch('1.0/event', event);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la modification de l'événement, réessayez plus tard");
    }
}

export async function deleteEvent(id) {
    try {
        await axios.delete(`1.0/event/${id}`);
    } catch (error) {
        throw new Error("Un problème est survenu lors de la suppression de l'événement, réessayez plus tard");
    }
}


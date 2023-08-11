import axios from './http';

/*-------------------------------------
FILES
-------------------------------------*/
export async function getProfilePicture(email) {
    try {
        const res = await axios.get(`image/${email}`, {
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

export async function register(user) {
    try {
        await axios.post('user/register', user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
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
        throw new Error("A problem occurred. Please, try again later");
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

export async function deleteOrganization(id) {
    try {
        await axios.delete(`organization/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
    }
}

/*-------------------------------------
PARTIERS
-------------------------------------*/
export async function getPartiers() {
    try {
        const res = await axios.get('partier/', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPartier(id) {
    try {
        const res = await axios.get(`partier/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export async function deletePartier(id) {
    try {
        await axios.delete(`partier/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
    }
}


/*-------------------------------------
EVENTS
-------------------------------------*/
export async function getEvents() {
    try {
        const res = await axios.get('event', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getEvent(id) {
    try {
        const res = await axios.get(`event/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export async function eventNameExists(name) {
    try {
        const res = await axios.get(`event/nameExists/${name}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function postEvent(event) {
    try {
        await axios.post('event', event, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
    }
}

export async function updateEvent(event) {
    try {
        await axios.patch('event', event, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
    }
}

export async function deleteEvent(id) {
    try {
        await axios.delete(`event/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
    }
}

/*-------------------------------------
TOWN
-------------------------------------*/
export async function townExists(name, zipCode) {
    try {
        const res = await axios.get(`town/exists?name=${name}&zipCode=${zipCode}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function postTown(name, zipCode) {
    try {
        await axios.post("town", {name, zipCode}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
    } catch (error) {
        throw new Error("A problem occurred. Please, try again later");
    }
}
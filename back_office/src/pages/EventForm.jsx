import React from 'react';
import {useParams} from 'react-router-dom';
import {
    getEvent,
    postEvent,
    updateEvent,
    deleteEvent, eventNameExists, townExists, postTown, getOrganizations
} from "../components/API";
import FormModal from '../components/FormModal';
import Moment from 'moment';
import DeleteButton from "../components/DeleteButton";
import {validZipCode} from "../validation/RegExp";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            name: "",
            nameInit: "",
            description: "", 
            nameAndNumStreet: "", 
            departingPoint: "", 
            startDateTime: "",
            endDateTime: "",
            organizationId: "",
            addressTown: "", 
            addressZipCode: "",
            organizations: [],
            nameError: "",
            descriptionError: "",
            nameAndNumStreetError: "",
            departingPointError: "",
            startDateTimeError: "",
            endDateTimeError: "",
            organizationIdError: "",
            addressTownError: "",
            addressZipCodeError: "",
            loading: true,
            error: false,
            errorMessage: "",
            modalMessage: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("isAdmin")) {
            this.searchOrganizations();

            if (this.state.id !== 0) {
                this.searchEvent();
            } else {
                this.setState({
                    loaded: true,
                    loading: false
                });
            }
        }
    }

    searchOrganizations() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const organizations = await getOrganizations();

                this.setState({
                    organizations: organizations
                });
            } catch (error) {
                this.setState({
                    error: true,
                    loading: false,
                    loaded: true,
                    errorMessage: error.message
                });
            }
        });
    }

    searchEvent() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const event = await getEvent(this.state.id);

                this.setState({
                    loaded: true,
                    loading: false,
                    name: event.name,
                    nameInit: event.name,
                    description: event.description, 
                    nameAndNumStreet: event.nameandnumstreet, 
                    departingPoint: event.departingpoint, 
                    startDateTime: Moment(event.startdatetime).format('yyyy-MM-DDThh:mm'),
                    endDateTime: Moment(event.enddatetime).format('yyyy-MM-DDThh:mm'),
                    organizationId: event.organizationid, 
                    addressTown: event.addresstown, 
                    addressZipCode: event.addresszipcode
                });
            } catch (error) {
                this.setState({
                    error: true,
                    loading: false,
                    loaded: true,
                    errorMessage: error.message
                });
            }
        });
    }

    handleInputChange(action) {
        const target = action.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    async validate() {
        let nameError= ""; 
        let descriptionError= "";  
        let nameAndNumStreetError= "";  
        let departingPointError= "";  
        let startDateTimeError= "";
        let endDateTimeError= "";
        let organizationIdError= "";  
        let addressTownError= "";  
        let addressZipCodeError= ""; 

        if (!this.state.name) {
            nameError = "Name field is required";
        } else if (this.state.name !== this.state.nameInit && await eventNameExists(this.state.name)) {
            nameError = "This name is already used";
        }

        if (!this.state.description) {
            descriptionError = "Description field is required";
        }

        if (!this.state.nameAndNumStreet) {
            nameAndNumStreetError = "Name and num of street field is required";
        }

        if (!this.state.departingPoint) {
            departingPointError = "Departing point field is required";
        }

        if (!this.state.startDateTime) {
            startDateTimeError = "Start date and time field is required";
        }

        if (!this.state.endDateTime) {
            endDateTimeError = "End date and time is required";
        }

        if (!this.state.organizationId) {
            organizationIdError = "Organisation is required";
        }

        if (!this.state.addressTown) {
            addressTownError = "Town is required";
        }

        if (!this.state.addressZipCode) {
            addressZipCodeError = "Zip code is required";
        } else if (!validZipCode.test(this.state.addressZipCode)) {
            addressZipCodeError = "Invalid format";
        }

        this.setState({ nameError, descriptionError, nameAndNumStreetError, departingPointError, startDateTimeError, endDateTimeError,organizationIdError,addressTownError,addressZipCodeError });
        return !(nameError || descriptionError || nameAndNumStreetError || departingPointError || startDateTimeError || endDateTimeError || organizationIdError || addressTownError || addressZipCodeError);
    }

    async submitEvent(action) {
        action.preventDefault();

        if (await this.validate()) {
            if (!(await townExists(this.state.addressTown, this.state.addressZipCode))) {
                await postTown(this.state.addressTown, this.state.addressZipCode);
            }

            let event = {
                name: this.state.name, 
                description: this.state.description, 
                nameAndNumStreet: this.state.nameAndNumStreet, 
                departingPoint: this.state.departingPoint, 
                startDateTime: this.state.startDateTime,
                endDateTime: this.state.endDateTime,
                organizationId: this.state.organizationId, 
                addressTown: this.state.addressTown, 
                addressZipCode: this.state.addressZipCode
             }

             if (this.state.id === 0) {
                this.setState({}, async () => {
                    try {
                        await postEvent(event);
                        this.setState({
                            modalMessage: "Event added"
                        });
                    } catch (error) {
                        this.setState({
                            modalMessage: error.message
                        });
                    }
                });
            } else {
                this.setState({}, async () => {
                    try {
                        event.id = this.state.id;
                        await updateEvent(event);
                        this.setState({
                            modalMessage: "Event modified"
                        });
                    } catch (error) {
                        this.setState({
                            modalMessage: error.message
                        });
                    }
                });
            }

            document.getElementById("submitModal").click();
        }
    }

    async deleteEvent() {
        await deleteEvent(this.state.id);
        window.location.replace("/events");
    }

    render() {
        if (!sessionStorage.getItem("isAdmin")) {
            return (
                <div className="flex justify-center items-center h-4/5">
                    <div className="text-6xl">You must be admin to access this data</div>
                </div>
            );
        } else if (this.state.loading) {
            return (
                <p>Chargement en cours</p>
            );
        } else if (this.state.error) {
            return (
                <p>{this.state.errorMessage}</p>
            );
        } else {
            return (
                <div className="flex justify-center items-center">
                    <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.submitEvent}>
                        <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Event form</div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Event's name</span>
                            </label>
                            <input id="name" type="text" placeholder="ex: Rock Werchter 2022" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.name} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.nameError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="description">
                                <span className="label-text">Description</span>
                            </label>
                            <input id="description" type="text" placeholder="description of the event" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.description} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.descriptionError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="nameAndNumStreet">
                                <span className="label-text">Name and street number</span>
                            </label>
                            <input id="nameAndNumStreet" type="text" placeholder="ex: 18, rue des pommiers" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.nameAndNumStreet} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.nameAndNumStreetError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="addressTown">
                                <span className="label-text">Town's name</span>
                            </label>
                            <input id="addressTown" type="text" placeholder="ex: Namur" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.addressTown} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressTownError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="addressZipCode">
                                <span className="label-text">Zip code</span>
                            </label>
                            <input id="addressZipCode" type="text" placeholder="ex: 5000" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.addressZipCode} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressZipCodeError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="departingPoint">
                                <span className="label-text">Departing point</span>
                            </label>
                            <input id="departingPoint" type="text" placeholder="ex: In front of the station" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.departingPoint} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.departingPointError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="startDateAndTime">
                                <span className="label-text">Start date and time</span>
                            </label>
                            <input id="startDateTime" type="datetime-local" placeholder="**/**/**-**:**" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.startDateTime} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.startDateTimeError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="endDateAndTime">
                                <span className="label-text">End date and time</span>
                            </label>
                            <input id="endDateTime" type="datetime-local" placeholder="**/**/**-**:**" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.endDateTime} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.endDateTimeError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="organizationId">
                                <span className="label-text">Organization name</span>
                            </label>
                            <select id="organizationId" className="select select-bordered w-full max-w-xs" onChange={this.handleInputChange}>
                                {this.state.organizations.map(organization => {
                                    return (
                                        <option selected={organization.userid === this.state.organizationId} value={organization.userid}>{organization.user.pseudo}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="join mt-8 mb-6">
                            <div className="join-item mx-4">
                                <button type="submit" className="btn">Save changes</button>
                            </div>
                            <DeleteButton deleteObject={this.deleteEvent} name="/event" />
                        </div>
                    </form>
                    <FormModal modalMessage={this.state.modalMessage} path="/events" />
                </div>
            );
        }
    }
}

export default withParams(EventForm);

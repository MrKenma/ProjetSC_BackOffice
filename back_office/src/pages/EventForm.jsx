import React from 'react';
import {useParams} from 'react-router-dom';
import {getEvent} from "../components/API";
import {postEvent} from "../components/API";
import {updateEvent} from "../components/API";

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
            description: "", 
            nameAndNumStreet: "", 
            departingPoint: "", 
            startDateAndTime: "", 
            endDateAndTime: "", 
            organizationId: "", 
            addressTown: "", 
            addressZipCode: "", 
            loading: true,
            error: false,
            errorMessage: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postEvent = this.postEvent.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 0) {
            this.searchEvent();
        }
    }

    searchEvent() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const event = await getEvent(this.state.id);
                this.setState({
                    loaded: true,
                    loading: false,
                    name: event.name, 
                    description: event.description, 
                    nameAndNumStreet: event.nameAndNumStreet, 
                    departingPoint: event.departingPoint, 
                    startDateAndTime: event.startDateAndTime, 
                    endDateAndTime: event.endDateAndTime, 
                    organizationId: event.organizationId, 
                    addressTown: event.addressTown, 
                    addressZipCode: event.addressZipCode, 
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.value; // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    validate() {
        let nameError= ""; 
        let descriptionError= "";  
        let nameAndNumStreetError= "";  
        let departingPointError= "";  
        let startDateAndTimeError= "";  
        let endDateAndTimeError= ""; 
        let organizationIdError= "";  
        let addressTownError= "";  
        let addressZipCodeError= ""; 

        if (!this.state.name) {
            nameError = "Name field is required";
        } // else (existe déjà)
        if (!this.state.description) {
            descriptionError = "Description field is required";
        }
        if (!this.state.nameAndNumStreet) {
            nameAndNumStreetError = "Name and num of street field is required";
        }
        if (!this.state.departingPoint) {
            departingPointError = "Departing point field is required";
        }
        if (!this.state.startDateAndTime) {
            startDateAndTimeError = "Start date and time field is required";
        }
        if (!this.state.endDateAndTime) {
            endDateAndTimeError = "End date and time is required";
        }
        if (!this.state.organizationId) {
            organizationIdError = "Organisation is required";
        }
        if (!this.state.addressTown) {
            addressTownError = "Town is required";
        }
        if (!this.state.addressZipCode) {
            addressZipCodeError = "Zip code is required";
        }

        if (nameError || descriptionError || nameAndNumStreetError || startDateAndTimeError || endDateAndTimeError || organizationIdError || addressTownError || addressZipCodeError) {
            this.setState({nameError, descriptionError, nameAndNumStreetError, startDateAndTimeError, endDateAndTimeError,organizationIdError,addressTownError,addressZipCodeError});
            return false;
        }

        return true;
    }

    postEvent(event) {
        event.preventDefault();

        if (this.validate()) {
            let event = {
                name: this.state.name, 
                description: this.state.description, 
                nameAndNumStreet: this.state.nameAndNumStreet, 
                departingPoint: this.state.departingPoint, 
                startDateAndTime: this.state.startDateAndTime, 
                endDateAndTime: this.state.endDateAndTime, 
                organizationId: this.state.organizationId, 
                addressTown: this.state.addressTown, 
                addressZipCode: this.state.addressZipCode
             }
            if (this.state.id === 0) {
                const res = postEvent(event);
            } else {
                event.id = this.state.id;
                const res = updateEvent(event);
            }
        }
    }

    render() {
        return (
            <div className="flex justify-center items-center">
                <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.postevent}>
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
                        <input id="nameAndNumStreet" type="text" placeholder="ex; 18, rue des pommiers" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.nameAndNumStreet} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.nameAndNumStreetError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="addressTown">
                            <span className="label-text">Town's name</span>
                        </label>
                        <input id="addressTown" type="text" placeholder="ex:Paris" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.addressTown} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressTownError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="addressZipCode">
                            <span className="label-text">Zip code</span>
                        </label>
                        <input id="addressZipCode" type="text" placeholder="e: in front of the station" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.addressZipCode} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressZipCodeError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="departingPoint">
                            <span className="label-text">Departing point</span>
                        </label>
                        <input id="departingPoint" type="text" placeholder="****" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.departingPoint} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.departingPointError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="startDateAndTime">
                            <span className="label-text">Start date and time</span>
                        </label>
                        <input id="startDateAndTime" type="text" placeholder="**/**/**-**:**" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.startDateAndTime} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.startDateAndTimeError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="endDateAndTime">
                            <span className="label-text">End date and time</span>
                        </label>
                        <input id="endDateAndTime" type="text" placeholder="**/**/**-**:**" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.endDateAndTime} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.endDateAndTimeError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="organizationId">
                            <span className="label-text">Organization id</span>
                        </label>
                        <input id="organizationId" type="text" placeholder="id" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.organizationId} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.organizationIdError}</span>
                    </div>
                    <button type="submit" className="btn my-4">Save changes</button>
                </form>
            </div>
        );
    }
}

export default withParams(EventForm);

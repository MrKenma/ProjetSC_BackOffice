import React from 'react';
import {useParams} from 'react-router-dom';
import {getEvent} from "../components/API";
import DeleteButton from "../components/DeleteButton";
import Moment from 'moment';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class EventInfos extends React.Component {

    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            event: {},
            loading: true,
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        this.searchEvent();
    }

    searchEvent() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const event = await getEvent(this.state.id);
                this.setState({
                    loaded: true,
                    loading: false,
                    event: event
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

    render() {
        let Content;

        if (this.state.loading) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.event) {
            Content = (
                <div className="pb-4">
                    <div>Event's name : {this.state.event.name}</div>
                    <div>description : {this.state.event.description}</div>
                    <div>Street's name and number: {this.state.event.nameandnumstreet}</div>
                    <div>Town's name : {this.state.event.addresstown}</div>
                    <div>Zip code : {this.state.event.addresszipcode}</div>
                    <div>Start date and time : {Moment(this.state.event.startdateandtime).format('DD/MM/yy hh:mm')}</div>
                    <div>End date and time: {Moment(this.state.event.startdateandtime).format('DD/MM/yy hh:mm')}</div>
                    <div>Organization: {this.state.event.organizationid}</div>
                    <DeleteButton id={this.state.id} />
                </div>
            );
        }

        return (
            <div className="bg-base-200 max-w-4xl mx-auto mt-2 rounded">
                <div className="text-2xl mb-4 bg-neutral pb-1 rounded-t">Event's Informations</div>
                {Content}
            </div>
        );
    }
}

export default withParams(EventInfos);
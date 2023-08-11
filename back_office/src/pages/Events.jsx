import React from 'react';
import EventsTab from "../components/EventsTab";
import {getEvents} from "../components/API";
import AddButton from "../components/AddButton";
import {Navigate} from "react-router-dom";

class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventsToShow: [],
            loading: true,
            error: false,
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.searchEvents();
    }

    searchEvents() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const events = await getEvents();
                this.setState({
                    loaded: true,
                    loading: false,
                    events: events,
                    eventsToShow: events
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

    changeValuesToShow (string) {
        const eventsToShow = this.state.events;
        const afterFiltering = eventsToShow.filter(event => {
            return event.startdateandtime.includes(string);
        });

        this.setState({eventsToShow: afterFiltering});
    }

    render() {
        let Content;

        if (this.state.loading) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.events[0]) {
            Content = <EventsTab
                events={this.state.eventsToShow}
            />
        }

        if (!localStorage.getItem("isAdmin")) {
            return (
                <Navigate to="/" />
            );
        } else {
            return (
                <div className="flex">
                    <div className="flex-none w-56 bg-neutral">
                        <AddButton path="/eventForm/0"/>
                    </div>
                    <div className="flex-auto overflow-x-auto">
                        {Content}
                    </div>
                </div>
            );
        }
    }
}

export default Events;
import React from 'react';
import ModifyButton from "./ModifyButton";
import Moment from "moment";

const EventsTab = (props) => {
    const events = props.events;

    return (
        <table className="table w-full">
            <thead>
            <tr>
                <th>Name</th>
                <th>Date and time</th>
                <th>Town</th>
                <th>Street name and number</th>
                <th>Modify</th>
            </tr>
            </thead>
            <tbody>
            {events.map(event => {
                return (
                    <tr key={event.id}>
                        <td>{event.name}</td>
                        <td>{Moment(event.startdatetime).format('DD/MM/yy hh:mm')}</td>
                        <td>{event.addresstown}</td>
                        <td>{event.nameandnumstreet}</td>
                        <td className="flex">
                            <ModifyButton path={`/eventForm/${event.id}`} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default EventsTab;

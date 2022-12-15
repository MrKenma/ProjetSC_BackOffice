import React from 'react';
import InfosButton from "./InfosButton";
import ModifyButton from "./ModifyButton";


const EventsTab = (props) => {
    const events = props.events;

    return (
        <table className="table w-full">
            <thead>
            <tr>
                <th>Name</th>
                <th>Date and time</th>
                <th>Adress</th>
                <th>Organizer</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {events.map(event => {
                return (
                    <tr key={event.id}>
                        <td>{event.name}</td>
                        <td>{Moment(event.startdateandtime).format('DD/MM/yy hh:mm')}</td>
                        <td>{event.addresstown+", "+event.nameandnumstreet}</td>
                        <td>{event.organizationid}</td>
                        <td className="flex">
                            <InfosButton id={event.id} />
                            <ModifyButton id={event.id} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default EventsTab;

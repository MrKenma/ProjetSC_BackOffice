import React from 'react';
import AddButton from "./AddButton";

const partiers=[
    {index:1,name: "Wangi Weber",login:"RaoulLeLardon",email:"wapiti.wasquawas@gmail.com",town:"5032 Floreffe"},
    {index:2,name: "Simon Rollus",login:"simrol06",email:"etu44732@henallux.be",town:"5000 Namur"},
    {index:3,name: "Julien Hanquet",login:"mrKenma",email:"julien.h@hotmail.com",town:"5002 Salzinnes"}
]

class Partiers extends React.Component {
    render() {
            return (
                <div className="flex">
                    <div className="flex-none w-28 bg-base-content">
                        <AddButton />
                    </div>
                    <div className="flex-auto overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Login</th>
                                <th>E-mail</th>
                                <th>Town</th>
                            </tr>
                            </thead>
                            <tbody>
                                {partiers.map(p=>{
                                    return(
                                        <tr>
                                            <th>{p.index}</th>
                                            <td>{p.name}</td>
                                            <td>{p.login}</td>
                                            <td>{p.email}</td>
                                            <td>{p.town}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
    }
}

export default Partiers;

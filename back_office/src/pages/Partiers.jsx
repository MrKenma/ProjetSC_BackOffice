import React from 'react';
import PartiersTab from "../components/PartiersTab";
import {getPartiers, getProfilePicture} from "../components/API";
import AddButton from "../components/AddButton";
import FilterBox from "../components/FilterBox";
import {API_PROFILE_PICTURE} from "../components/API/http";
import DefaultPicture from "../images/defaultPartierPicture.png";

class Partiers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            partiers: [],
            partiersToShow: [],
            loading: true,
            error: false,
            errorMessage: ""
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem("isAdmin")) {
            this.searchPartiers();
        }
    }

    searchPartiers() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const partiers = await getPartiers();

                for (const partier of partiers) {
                    if (partier.user.hasuploadedprofilepicture) {
                        const uuid = await getProfilePicture(partier.user.email);

                        partier.profilePictureUri = `${API_PROFILE_PICTURE}/${uuid}.jpeg`;
                    } else {
                        partier.profilePictureUri = DefaultPicture;
                    }
                }

                this.setState({
                    loaded: true,
                    loading: false,
                    partiers: partiers,
                    partiersToShow: partiers
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
        const partiersToShow = this.state.partiers;
        const afterFiltering = partiersToShow.filter(part => {
            return part.addresstown.includes(string);
        });

        this.setState({partiersToShow: afterFiltering});
    }

    render() {
        let Content;

        if (this.state.loading) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.partiers[0]) {
            Content = <PartiersTab
                partiers={this.state.partiersToShow}
            />
        }

        if (!sessionStorage.getItem("isAdmin")) {
            return (
                <div className="flex justify-center items-center h-4/5">
                    <div className="text-6xl">You must be admin to access this data</div>
                </div>
            );
        } else {
            return (
                <div className="flex">
                    <div className="flex-none w-56 bg-neutral">
                        <AddButton path="/partierForm/0"/>
                        <FilterBox placeholder="Filter by town" callback={(searchValue) => this.changeValuesToShow(searchValue)} />
                    </div>
                    <div className="flex-auto overflow-x-auto">
                        {Content}
                    </div>
                </div>
            );
        }
    }
}

export default Partiers;

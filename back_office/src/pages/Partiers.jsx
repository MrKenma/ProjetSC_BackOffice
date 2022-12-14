import React from 'react';
import PartierPanel from "../components/PartiersTab";
import {getPartiers} from "../components/API";
import AddButton from "../components/AddButton";
import FilterBox from "../components/FilterBox";

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
        this.searchPartiers();
    }

    searchPartiers() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const partiers = await getPartiers();
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
        const afterFiltering = partiersToShow.filter(org => {
            return org.name.includes(string);
        });
        this.setState({partiersToShow: afterFiltering});
    }

    render() {
        let Content;
        if (this.state.loading) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.partiers[0].id) {
            Content = <PartierPanel
            partiers={this.state.partiersToShow}
            />
        }

        return (
            <div className="flex">
                <div className="flex-none w-56 bg-neutral">
                    <AddButton />
                    <FilterBox callback={(searchValue) => this.changeValuesToShow(searchValue)} />
                </div>
                <div className="flex-auto overflow-x-auto">
                    {Content}
                </div>
            </div>
        );
    }
}

export default Partiers;

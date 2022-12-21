import React from 'react';

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            callback: props.callback
        };
    }

    changeSearchValue(action) {
        this.setState({searchValue: action.target.value}, () => {
            this.state.callback(this.state.searchValue);
        })
    }

    render() {
        return (
            <input
                type="text"
                placeholder="Filter by responsible name"
                className="input input-bordered w-5/6 mt-12 mb-12"
                onChange={
                    (action) => this.changeSearchValue(action)
                }
            />
        );
    }
}

export default FilterBox;
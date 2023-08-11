import React from 'react';

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            callback: props.callback,
            placeholder: props.placeholder
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
                placeholder={this.state.placeholder}
                className="input input-bordered w-5/6 mt-8 mb-8"
                onChange={
                    (action) => this.changeSearchValue(action)
                }
            />
        );
    }
}

export default FilterBox;
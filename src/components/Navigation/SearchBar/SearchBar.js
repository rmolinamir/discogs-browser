import React, { Component } from 'react';
// redux-saga & react-router-dom
import { Link, withRouter } from 'react-router-dom';
import  { connect } from 'react-redux';
// Parse location data
import { parseLocationData } from '../../../shared/parseLocationData';
// CSS
import classes from './SearchBar.module.css'
// JSX
import SearchResult, { NullResult } from './SearchResult/SearchResult';
import Separator from '../../UI/Separator/Separator';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.mySearchBar = React.createRef();
        this.myList = React.createRef();
    }

    state = {
        bIsFocused: false,
        // bIsTouched is here to improve user experience, if true and filteredServices
        // is an empty array, then it will render a NullResults component to let users 
        // now there are no matches.
        bIsTouched: false,
        filteredServices: [],
        myList: {
            width: null,
            top: null,
            right: null
        },
        searchBar: {
            inputId: 'SearchBar_Input',
            description: 'SearchBar_Description',
            listId: 'SearchBar_List',
            value: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { nearServices, topServices } = props;
        let services = [];
        if (nearServices) {
            services = services.concat([...nearServices]);
        }
        if (topServices) {
            services = services.concat([...topServices]);
        }
        const query = state.searchBar.value;
        // If there are no services or query is an empty string then return
        if (!services || !query.length) {
            return state;
        }
        // Search word array declaration. Splits each word into an array element. We will 
        // be looping through each word and see if the questions have these words
        const searchWords = query.toLowerCase().split(/\s+/g)
            .map(string => {
                return string.trim();
            });
            const filteredServices = services.filter(service => {
                const title = service.title.toLowerCase();
                const category = service.category.replace('_', ' ').toLowerCase();
                let bIsMatch;
                // For loop for every word in the searchWords array
                for (let i = 0; i < searchWords.length; i++) {
                    const searchWord = searchWords[i].toLowerCase();
                    /**
                     * If the title of the answer of the question include the searched [i] word,
                     * bIsMatch is true, otherwise if it's not included then bIsMatch is false and
                     * the loop is broken.
                     */
                    if (title.includes(searchWord) || category.includes(searchWord)) {
                        bIsMatch = true;
                        continue;
                    } else {
                        bIsMatch = false;
                        break;
                    }
                }
                return bIsMatch;
            });
        const newState = {
            ...state,
            filteredServices,
            bIsTouched: true
        }
        return newState;
    }

    applyFocusWithin () {
        this.setState(() => {
            return { bIsFocused: true }
        });
    }

    removeFocusWithin () {
        this.setState(() => {
            return { bIsFocused: false, bIsTouched: false, filteredServices: [] }
        });
    }

    onLinkMouseDownHandler = (id) => {
        // Since event is prevented, programmatically go to different route.
        this.props.history.push(['/services',id].join('/'));
        this.mySearchBar.current.blur(); // Triggers remove focus within function and blurs the input.
        // Sets the value back to an empty string.
        const updatedSearchBar = {
            ...this.state.searchBar,
            value: ''
        };
        this.setState({
            searchBar: updatedSearchBar
        });
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        const updatedSearchBar = {
            ...this.state.searchBar,
            value: event.target.value
        };
        this.setState({
            searchBar: updatedSearchBar
        });
    }

    render () {
        const searchBarContainerClasses = [classes.SearchBarContainer];
        const ListClasses = [classes.List];
        const RecentSearchesWrapperClasses = [classes.RecentSearchesWrapper];
        if (this.state.bIsFocused) {
            searchBarContainerClasses.push(classes.FocusWithin);
            ListClasses.push(classes.Show);
            RecentSearchesWrapperClasses.push(classes.Show);
        }
        // hashTable that handles filtered service rendering logic
        let hashTable = [];
        return (
            <div>
                <div className={classes.SearchBarAnchor}>
                    <div
                        className={classes.SearchBarWrapper}>
                        <div className={searchBarContainerClasses.join(' ')}>
                            <div className={classes.Bar}>
                                <form action="/services/all" method="GET">
                                    <div 
                                        // dir means direction of text for languages (ltr = left to right)
                                        dir="ltr">
                                        <div className={classes.WidescreenContainer}>
                                            <label htmlFor={this.state.searchBar.inputId} className={classes.LabelWrapper}>
                                                <span className={classes.SearchBarSpan}>Search</span>
                                                <div className={classes.QuestionMark}>
                                                    <svg
                                                        viewBox="0 0 16 16" 
                                                        role="presentation" 
                                                        aria-hidden="true" 
                                                        focusable="false" 
                                                        style={{height: '18px',width: '18px',display: 'block',fill: 'currentColor'}}>
                                                        <path d="m2.5 7c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5m13.1 6.9-2.8-2.9c.7-1.1 1.2-2.5 1.2-4 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.5 0 2.9-.5 4-1.2l2.9 2.8c.2.3.5.4.9.4.3 0 .6-.1.8-.4.5-.5.5-1.2 0-1.7"></path>
                                                    </svg>
                                                </div>
                                                <div className={classes.InputWrapper}>
                                                    <div className={classes.InputContainer}>
                                                        <input
                                                            onFocus={() => this.applyFocusWithin()}
                                                            onBlur={() => this.removeFocusWithin()}
                                                            onChange={(event) => this.inputChangeHandler(event)}
                                                            ref={this.mySearchBar}
                                                            id={this.state.searchBar.inputId} 
                                                            type="text" 
                                                            className={classes.Input}
                                                            role="combobox"
                                                            aria-autocomplete="list" 
                                                            aria-describedby={this.state.searchBar.description}
                                                            aria-controls={this.state.searchBar.listId}
                                                            aria-expanded="false" 
                                                            autoComplete="off" 
                                                            autoCorrect="off" 
                                                            spellCheck="false" 
                                                            name="services_query" 
                                                            placeholder="Search" 
                                                            value={this.state.searchBar.value}  />
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={classes.Cancel}>
                                <button className={classes.CancelButton} type="button" aria-busy="false">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.bIsFocused ? 
                    <ul ref={this.myList}
                        id={this.state.searchBar.listId}
                        role="listbox" 
                        style={{
                            maxWidth: '100vw',
                            width: this.state.myList.width,
                            top: this.state.myList.top, 
                            right: this.state.myList.right
                        }}
                        className={ListClasses.join(' ')}>
                        <div className={RecentSearchesWrapperClasses.join(' ')}>
                            <li className={classes.RecentSearchesContainer}>
                                <div className={classes.RecentSearches}>
                                    <small>
                                        <span>Search Results</span>
                                    </small>
                                </div>
                                <Separator />
                                <ul className={classes.SearchResultsWrapper}>
                                    {this.state.filteredServices.length ? 
                                        this.state.filteredServices.map((service, index) => {
                                            // Hash Table to avoid duplicated services
                                            if (hashTable.includes(service.id)) {
                                                return null;
                                            } else {
                                                hashTable.push(service.id);
                                            }
                                            // Max of 8 services
                                            if (hashTable.length > 8) { return null; }
                                            /**
                                             * In case the user is browsing services in the serviceId route, 
                                             * filter out the loaded service from the filteredServices array.
                                             */
                                            const pathname = this.props.location.pathname.split('/');
                                            const origin = pathname[1];
                                            if (origin === 'services') {
                                                const serviceId = pathname[2];
                                                if (serviceId === service.id) {
                                                    return null;
                                                };
                                            }
                                            return (
                                                <Link 
                                                    key={index}
                                                    to={['/services',service.id].join('/')}
                                                    /**
                                                    * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
                                                    * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
                                                    * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
                                                    * or any other hack.
                                                        */
                                                    onMouseDown={event => {
                                                        event.preventDefault();
                                                        this.onLinkMouseDownHandler(service.id);
                                                    }}>
                                                    <SearchResult 
                                                        id={service.id}
                                                        service={service.title}
                                                        location={parseLocationData(service.locationData)} />
                                                </Link>
                                            )
                                        })
                                        :  this.state.bIsTouched ? 
                                            <NullResult />
                                            : <NullResult text='Try searching for a category or a service.' />
                                    }
                                </ul>
                            </li>
                        </div>
                    </ul>
                    : null}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
	return {
        nearServices: state.servicesReducer.services.nearServices,
        topServices: state.servicesReducer.services.topServices
	};
};

export default withRouter(connect(mapStateToProps)(SearchBar));
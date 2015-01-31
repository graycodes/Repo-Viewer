'use strict';

var $ = require('jquery');
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Repo = require('../../components/repo/Repo');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var ReactApp = React.createClass({

    getInitialState: function() {
        return {
            repos: [{name:'thing', key: 1}]
        };
    },

    componentDidMount: function() {
        var reactApp = this;
        $.get('https://api.github.com/users/xinumbralis/repos')
            .then(function(res) {
                reactApp.setState({
                    repos: res
                });
            });
    },

    render: function() {
        return (
            <div className='main'>
              <ReactTransitionGroup transitionName="fade">
                {this.state.repos.map(function(repo) {
                        return (
                                <Repo name={repo.name} description={repo.description}/>
                        );
                })}
              </ReactTransitionGroup>
            </div>
        );
    }
});

module.exports = ReactApp;

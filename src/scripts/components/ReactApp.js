'use strict';

var $ = require('jquery');
var _ = require('lodash');
var React = require('react/addons');

var Repo = require('../../components/repo/Repo');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('./reactApp.css');

var ReactApp = React.createClass({

    getInitialState: function() {
        return {
            repos: [{name:'thing', key: 1}]
        };
    },

    componentDidMount: function() {
        this.getRepos('xinumbralis');
    },

    getRepos: _.debounce(function(user) {
        console.log('user', user);
        var reactApp = this;
        $.get('https://api.github.com/users/' + user + '/repos')
            .then(function(res) {
                reactApp.setState({
                    repos: res
                });
            });
    }, 300),

    handleUserChange: function(event) {
        console.log('chaneeeee', event.target.value);
        this.getRepos(event.target.value);
    },

    render: function() {
        var self = this;
        return (
          <div>
            <form>
              <input type='text' onChange={this.handleUserChange} className='owner'  />
            </form>
            <div className='main'>
                  {this.state.repos.map(function(repo) {
                      return (
                          <Repo name={repo.name} description={repo.description}/>
                      );
                  })}
            </div>
          </div>
        );
    }
});

module.exports = ReactApp;

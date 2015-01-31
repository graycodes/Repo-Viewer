'use strict';

var React = require('react/addons');
require('./repo.css');

var Repo = React.createClass({
    
    render: function() {
        return (
            <article className="repo">
              <h2 className="repo__title">{this.props.name}</h2>
              <p className="repo__description">{this.props.description}</p>
            </article>
        );
    }
});

module.exports = Repo;

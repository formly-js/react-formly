/** @jsx React.DOM */
'use strict';

var React = require('react');

var BuildBadge = React.createClass({
  propTypes: {
    owner: React.PropTypes.string.isRequired,
    repo: React.PropTypes.string.isRequired,
    branch: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      branch: 'master'
    };
  },
  render: function() {
    var owner = this.props.owner;
    var repo = this.props.repo;
    var link = 'https://travis-ci.org/' + owner + '/' + repo;

    var branch = encodeURIComponent(this.props.branch);
    var url = link + '.svg?branch=' + branch;
    return <a href={link}><img src={url} /></a>;
  }
});

module.exports = BuildBadge;
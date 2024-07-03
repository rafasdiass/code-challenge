// server/publications.js
import { Meteor } from 'meteor/meteor';
import { Communities } from '/imports/api/communities/collections';
import { People } from '/imports/api/people/collections';

Meteor.publish('communities', function () {
  return Communities.find();
});

Meteor.publish('peopleByCommunity', function (communityId) {
  return People.find({ communityId });
});

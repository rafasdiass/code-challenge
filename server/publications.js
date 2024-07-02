// server/publications.js
import { Meteor } from 'meteor/meteor';
import { Communities, People } from './collections.js';

Meteor.publish('communities', function() {
  return Communities.find();
});

Meteor.publish('peopleByCommunity', function(communityId) {
  return People.find({ communityId });
});

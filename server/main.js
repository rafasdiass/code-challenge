import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data.js';
import { Communities } from '../communities/communities.js';
import { People } from '../people/people.js';
import { logger } from '../infra/logger.js';

const listData = async () => {
  const communities = await Communities.find().fetchAsync();
  const people = await People.find().fetchAsync();

  logger.info('Communities:');
  communities.forEach((community) => logger.info(JSON.stringify(community)));

  logger.info('People:');
  people.forEach((person) => logger.info(JSON.stringify(person)));
};

Meteor.startup(async () => {
  await loadInitialData();
  await listData();

  // Publicações
  Meteor.publish('communities', function () {
    return Communities.find();
  });

  Meteor.publish('peopleByCommunity', function (communityId) {
    return People.find({ communityId });
  });

  // Métodos
  Meteor.methods({
    async checkInPerson(personId) {
      try {
        const result = await People.updateAsync(personId, {
          $set: { checkInDate: new Date() },
        });
        if (result) {
          logger.info(`Person checked in: ${personId}`);
        } else {
          throw new Meteor.Error(
            'update-failed',
            'Failed to update check-in date'
          );
        }
      } catch (error) {
        logger.error('Error in checkInPerson:', error);
        throw new Meteor.Error('500', 'Internal server error', error);
      }
    },
    async checkOutPerson(personId) {
      try {
        const result = await People.updateAsync(personId, {
          $set: { checkOutDate: new Date() },
        });
        if (result) {
          logger.info(`Person checked out: ${personId}`);
        } else {
          throw new Meteor.Error(
            'update-failed',
            'Failed to update check-out date'
          );
        }
      } catch (error) {
        logger.error('Error in checkOutPerson:', error);
        throw new Meteor.Error('500', 'Internal server error', error);
      }
    },
  });
});

import { Meteor } from 'meteor/meteor';
import { People } from '../people/people.js';
import { logger } from '../infra/logger.js';


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
      throw new Meteor.Error('internal-server-error', 'Internal server error');
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
      throw new Meteor.Error('internal-server-error', 'Internal server error');
    }
  },
});

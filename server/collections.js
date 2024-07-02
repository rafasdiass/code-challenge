// server/collections.js
import { Mongo } from 'meteor/mongo';

export const Communities = new Mongo.Collection('communities');
export const People = new Mongo.Collection('people');

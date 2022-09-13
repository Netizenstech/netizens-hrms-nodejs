const _ = require('lodash');

const logger = require('../logger');
const { sequelize } = require('../models');

const { pubSub, pubSubTopics } = require('../pubsub');

const textMessage = require('./send-message');
const sendPush = require('./send-push');

const generateNotification = async data => {
  try {
    const {
      Notification: NotificationModel
    } = sequelize.models;

    const createNotificationForCommentAdded = async () => {
      const notificationObj = {
        title: 'Comment Added!',
        description: `${_.startCase(_.capitalize(data.user.firstName))} ${data.user.lastName} commented on your post`,
        url: `/posts/${data.postId}`,
        refData: {
          postId: data.postId,
          user: {
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName
          }
        },
        senderId: data.user.id,
        receiverId: data.receiverId
      };

      pubSub.publish(`${pubSubTopics.NOTIFICATION}/${data.receiverId}`, { notification: notificationObj });

      const messageData = {
        body: `${notificationObj.title} - ${notificationObj.description}`,
        to: data.creatorNumber
      };

      await textMessage(messageData);

      const pushData = {
        title: notificationObj.title,
        content: notificationObj.description,
        filters: [{
          field: 'tag', key: 'userId', relation: '=', value: data.receiverId
        }],
        additionalData: {
          postId: data.postId
        }
      };

      await sendPush(pushData);

      return notificationObj;
    };

    const createNotification = async (obj, dataObj) => {
      if (!_.isArray(dataObj)) {
        // eslint-disable-next-line no-param-reassign
        dataObj = [dataObj];
      }
      try {
        const notifications = _.map(dataObj, _notificationObj => {
          _.merge({ ...obj }, _notificationObj);
        });
        await NotificationModel.bulkCreate(notifications);
      } catch (error) {
        logger.error('ERROR FROM createNotification >>>', error);
        throw error;
      }
    };

    const createNotificationByType = async () => {
      const notificationObj = {
        type: data.type
      };

      let notificationInstance;

      switch (data.type) {
        case 'COMMENT_ADDED':
          notificationInstance = await createNotificationForCommentAdded();
          break;
        default: {
          return false;
        }
      }
      if (notificationInstance) {
        createNotification(notificationObj, notificationInstance);
      }

      return true;
    };

    // CREATE NOTIFICATION BY TYPE
    await createNotificationByType();
    return true;
  } catch (error) {
    logger.error('ERROR FROM generateNotification>>> ', error);
    return error;
  }
};

module.exports = generateNotification;

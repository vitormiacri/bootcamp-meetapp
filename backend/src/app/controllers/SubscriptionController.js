import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          attributes: ['id', 'title', 'description', 'localization', 'date'],
          required: true,
          include: [
            {
              model: File,
              attributes: ['path', 'url'],
            },
          ],
        },
      ],

      order: [[Meetup, 'date']],
    });
    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const { meetupId } = req.params;

    const meetup = await Meetup.findByPk(meetupId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      attributes: ['id', 'title', 'description', 'localization', 'date'],
    });

    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found!' });
    }

    if (meetup.user_id === user.id) {
      return res
        .status(401)
        .json({ error: "Can't subscribe for your own meetup" });
    }

    if (meetup.past) {
      return res.status(401).json({ error: "Can't subscribe past meetups" });
    }

    const subscriptionExists = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (subscriptionExists) {
      return res
        .status(401)
        .json({ error: "Can't subscribe for the meetup twice" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      user,
      meetup,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();

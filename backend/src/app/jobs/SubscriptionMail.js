import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { user, meetup } = data;
    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `[${meetup.title}] - Nova Inscrição no seu Meetup`,
      template: 'subscription',
      context: {
        meetup,
        user,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às ' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();

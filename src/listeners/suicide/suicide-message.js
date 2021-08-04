const { TextHelpers } = require('sensum');
const { MessageButton } = require('discord-buttons');

const MSG = TextHelpers.lines(
  'If you are feeling suicidal, please call the number in your area listed below.',
  'If you are uncomfortable calling, please reach out to someone you trust and/or find a safe place.',
  'You are worth *more*, __**you matter**__. Now matter how you are feeling, you are **valid and strong**.',
  '1-800-273-8255 **United States**',
  '0845 790 9090 **United Kingdom**',
  '1833 456 4566 **Canada**',
  '0145 394 000 **France**',
  '0800 181 0771 **Germany**',
  '13 11 14 **Australia**',
  '888 8817 666 **India**',
  '525 510 2550 **Mexico**',
  '+810 352 869 090 **Japan**',
  '914 590 050 **Spain**',
  '051 444 5691 **South Africa**',
  '0800 543 354 **New Zealand**',
);

const URL = 'https://www.opencounseling.com/suicide-hotlines';

module.exports = [
  MSG,
  {
    buttons: new MessageButton()
      .setLabel('See More Hotlines')
      .setStyle('url')
      .setEmoji('🈳')
      .setURL(URL),
  },
];

// Test: Sending a chat message

const Notifications = require('../notifications/notifications');
const e = require('./elements');
const { checkElementLengthEqualTo } = require('../core/util');
const { ELEMENT_WAIT_TIME } = require('../core/constants');

class Poll extends Notifications {
  constructor() {
    super('poll-result-message');
  }

  async test(testName) {
    try {
      // 0 messages
      const chat0 = await this.page3.page.evaluate(checkElementLengthEqualTo, e.chatPollMessageText, 0);
      await this.page3.screenshot(`${testName}`, `01-before-chat-message-send-[${this.page3.meetingId}]`);

      await this.publishPollResults(testName);

      await this.page3.waitForSelector(e.chatButton, ELEMENT_WAIT_TIME);
      await this.page3.click(e.chatButton, true);
      await this.page3.waitForSelector(e.chatPollMessageText, ELEMENT_WAIT_TIME);

      // 1 message
      const chat1 = await this.page3.page.evaluate(checkElementLengthEqualTo, e.chatPollMessageText, 1);
      return chat0 === chat1;
    } catch (err) {
      await this.page3.logger(err);
      return false;
    }
  }
}

module.exports = exports = Poll;

import moment from "moment";

class Session {
  constructor(
    sessionId,
    date,
    startTime,
    sessionDuration,
    slotDuration,
    slotNumber,
    eid
  ) {
    if (sessionId) this.sessionId = sessionId;

    this.date = date;
    this.startTime = startTime;
    this.sessionDuration = sessionDuration;
    this.slotDuration = slotDuration;
    this.slotNumber = slotNumber;
    this.eid = eid;
  }
  /**
   * Construct a Session from a plain object
   * @param {{}} json
   * @return {Session} the newly created Session object
   */
  static from(json) {
    const t = Object.assign(new Session(), json);
    if (t.deadline) {
      t.deadline = moment(new Date(t.deadline));
    }
    return t;
  }
}

export default Session;

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
}

module.exports = Session;

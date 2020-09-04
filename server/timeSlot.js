class TimeSlot {
  constructor(slotId, state, date, slotDuration, startTime, eid, cid) {
    if (slotId) this.slotId = slotId;
    this.state = state;
    this.date = date;
    this.slotDuration = slotDuration;
    this.startTime = startTime;
    this.eid = eid;
    this.cid = cid;
  }
}

module.exports = TimeSlot;

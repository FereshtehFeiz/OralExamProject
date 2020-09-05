class TimeSlot {
  constructor(slotId, state, date, slotDuration, startTime, eid, cid) {
    if (slotId) {
      this.slotId = slotId;
    }

    this.state = state;
    this.date = date;
    this.slotDuration = slotDuration;
    this.startTime = startTime;
    this.eid = eid;
    this.cid = cid;
  }

  /**
   * Construct a Task from a plain object
   * @param {{}} json
   * @return {TimeSlot} the newly created Task object
   */
  static from(json) {
    const t = Object.assign(new TimeSlot(), json);
    return t;
  }
}

export default TimeSlot;

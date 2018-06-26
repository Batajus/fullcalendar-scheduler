import { EventResizing } from 'cgm_de_fullcalendar'

/*
TODO: use pubsub instead?
*/
export default class TimelineEventResizing extends EventResizing {


  segResizeStart(seg, ev) {
    super.segResizeStart(seg, ev)

    if (this.component.eventTitleFollower) {
      return this.component.eventTitleFollower.forceRelative()
    }
  }


  segResizeStop(seg, ev) {
    super.segResizeStop(seg, ev)

    if (this.component.eventTitleFollower) {
      return this.component.eventTitleFollower.clearForce()
    }
  }

}

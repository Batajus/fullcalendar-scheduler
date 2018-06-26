import { EventSource } from 'cgm_de_fullcalendar'

// defineStandardProps won't work :(
// TODO: find a better way
(EventSource.prototype as any).standardPropMap.resourceEditable = true // automatically transfer

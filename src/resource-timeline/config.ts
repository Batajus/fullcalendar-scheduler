import { Calendar, getViewConfig } from '@medical-cloud/cgm_de_fullcalendar'
import ResourceTimelineView from './ResourceTimelineView'

getViewConfig('timeline').resourceClass = ResourceTimelineView

Calendar.defaults.resourcesInitiallyExpanded = true

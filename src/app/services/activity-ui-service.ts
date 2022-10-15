import { Injectable } from '@angular/core';

/**
 * Activity UI service.
 */
@Injectable({
  providedIn: 'root',
})
export class ActivityUiService {

  /**
   * Returns CSS class to display an activity as according to its state.
   * 
   * @param activity Activity to check
   * @returns CSS class to display activity row with
   */
  getRowCssClass(activity: any) {

    // Checking if activity is closed, at which we display it silently.
    if (activity.closed) {
      return 'silent';
    }

    // Checking due date of activity, which might display it as important if it is due soon.
    if (activity.due) {
      let dueStr = activity.due;
      if (dueStr.indexOf && dueStr.indexOf('+') === -1 && !dueStr.endsWith('Z')) {
        dueStr += '+00:00';
      }
      const now = new Date().getTime();
      const due = new Date(dueStr + '+00:00').getTime();
      let deltaSeconds = Math.round((due - now) / 1000);
      if (deltaSeconds < 0) {
        return 'very-important';
      }
      if (deltaSeconds < 60 * 60 * 24) {
        return 'important';
      }
    }
    return '';
  }
}

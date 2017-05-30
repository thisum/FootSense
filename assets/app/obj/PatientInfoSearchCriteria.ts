/**
 * Created by thisum on 2/13/2017.
 */

export class PatientInfoSearchCriteria{

    constructor(
        public patientName?: string,
        public fromDate?: number,
        public toDate?: number
    ){}

}
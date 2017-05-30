/**
 * Created by thisum on 5/28/2017.
 */

export class PatientRecord{

    constructor(
        public recordId: string,
        public leftLeg: string,
        public rightLeg: string,
        public recordTime: string,
        public patientName: string
    ) {}
}
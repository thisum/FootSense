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

    public getLeftLeg(){
        return this.getIntArray(this.leftLeg);
    }

    public getRightLeg(){
        return this.getIntArray(this.rightLeg);
    }

    private getIntArray(str: string): number[]{
        let objs: number[] = [];
        let s = str.split(",");
        var num:number = 0

        for( num=0;num < s.length; num++ ) {
            objs.push(+s[num]);
        }
        return objs;
    }
}
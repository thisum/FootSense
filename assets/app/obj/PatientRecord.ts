/**
 * Created by thisum on 5/28/2017.
 */

export class PatientRecord{

    private leftLegValues: number[];
    private rightLegValues: number[];

    constructor(
        public recordId: string,
        public leftLeg: string,
        public rightLeg: string,
        public recordTime: string,
        public patientName: string
    ) {

        this.setTemperatureArray(leftLeg, true);
        this.setTemperatureArray(rightLeg, false);
    }

    public setTemperatureArray(array: string, leftLeg: boolean){
        if( leftLeg ){
            this.leftLegValues = this.getNumberArray(array);
        }
        else{
            this.rightLegValues = this.getNumberArray(array);
        }
    }

    public getLeftLeg(){
        return this.leftLegValues;
    }

    public getRightLeg(){
        return this.rightLegValues;
    }

    private getNumberArray(str: string): number[]{
        let objs: number[] = [];
        let s = str.split(",");
        var num:number = 0

        for( num=0;num < s.length; num++ ) {
            objs.push(+s[num]/100);
        }
        return objs;
    }
}
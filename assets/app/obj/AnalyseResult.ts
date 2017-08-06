/**
 * Created by thisum on 6/6/2017.
 */

export class AnalyseResult{

    private difFingers: number[] = [0,0,0,0,0,0,0,0];
    private difference: boolean;
    private fingerDifferences: string[][] = [];

    constructor(
        public leftLeg: number[],
        public rightLeg: number[]
    ) {
        this.calculateDifferences();
    }

    private calculateDifferences(){

        let i:number = 0;
        for(i=0; i<this.difFingers.length; i++ ){
            if( Math.abs(this.rightLeg[i] - this.leftLeg[i]) >= 2 ){
                var diff: string[] = [String(i+1), String(this.leftLeg[i]), String(this.rightLeg[i]), String(this.leftLeg[i] - this.rightLeg[i])];
                this.fingerDifferences.push(diff);
                this.difFingers[i] = 1;
                this.difference = true;
            }
        }
    }

    public getDifFingers():number[]{
        return this.difFingers;
    }

    public hasDifferences():boolean{
        return this.difference;
    }

    public getFingerDifferences(): string[][]{
        return this.fingerDifferences;
    }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PatientInfoService} from "../services/request.service";
import {PatientInfoSearchCriteria} from "../obj/PatientInfoSearchCriteria";
import {IMyOptions} from "../../../public/js/vendor/mydatepicker/dist/interfaces/my-options.interface";
import {IMyDateModel} from "../../../public/js/vendor/mydatepicker/dist/interfaces/my-date-model.interface";
import {PatientRecord} from "../obj/PatientRecord";
import {AnalyseResult} from "../obj/AnalyseResult";
import {Constants} from "../util/constants";


@Component({
    moduleId: module.id,
    selector: 'fs-patient_records',
    templateUrl: 'html/patientinfo.component.html'
})
export class PatientInfoComponent{

    patientName: string = "";
    diffColour: string = "#98FB98";
    diffColourBorder: string = "#006400";
    dialogVisibility: string = "hidden";
    chartVisibility: string = "hidden";
    leftLegColours: string[] = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
    rightLegColours: string[] = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
    leftLegTempValues: string[] = ["","","","","","", "", ""];
    rightLegTempValues: string[] = ["","","","","","", "", ""];
    t: number = 1000*60*60*24 - 1;
    criteria = new PatientInfoSearchCriteria();
    patientRecords: PatientRecord[] = [];
    analyseResult: AnalyseResult = new AnalyseResult([0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]);

    options = {
        title : { text : 'Last 5 records of the patient' },
        yAxis: {
            title: {
                text: 'Temperature'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                pointStart: 2010
            }
        },

        series: [{
            name: '1',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: '2',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: '3',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: '4',
            data: [7988, 7988, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: '5',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        },{
            name: '6',
            data: [7988, 7988, 7988, 0, 88, 22452, 34400, 34227]
        },{
            name: '7',
            data: [7988, 7988, 7988, 89, 15112, 12, 34400, 34227]
        },{
            name: '8',
            data: [100, 7988, 7988, 444, 15112, 22452, 34400, 34227]
        }]
    };

    private timeOptions = {
        day : 'numeric',
        month : 'short',
        year : 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    private datePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'yyyy-mmm-dd',
        markCurrentDay: true,
        inline: false,
        height: '22px',
        width: '100%',
        selectionTxtFontSize: '12px'
    };

    constructor(private patientInfoService: PatientInfoService){}

    onSearch():void {
        this.patientInfoService.searchPatientRecords(this.criteria).then(
            records =>{
                this.patientRecords = records;
                this.patientName = "";
            },
            error => {
                console.error(error);
                this.patientName = "";
            }
        )
    }

    public onDateChangedFrom(event: IMyDateModel) {
        this.criteria.fromDate = event.jsdate ? event.jsdate.getTime() : -1;
    }

    public onDateChangedTo(event: IMyDateModel) {
        this.criteria.toDate = event.jsdate ? (event.jsdate.getTime() + this.t): -1;
    }

    public onShowDiffDialog(){
        if(this.dialogVisibility == "visible"){
            this.dialogVisibility = "hidden";
        }
        else{
            this.dialogVisibility = "visible";
        }
    }

    public showHistoryChart(){
        if(this.chartVisibility == "visible"){
            this.chartVisibility = "hidden";
        }
        else{
            this.chartVisibility = "visible";
        }
    }

    public onPatientRecordClicked(patientRecord: PatientRecord) {
        let leftLeg: number[] = patientRecord.getLeftLeg();
        let rightLeg: number[] = patientRecord.getRightLeg();
        this.analyseResult = new AnalyseResult(leftLeg, rightLeg);

        Constants.getColourNTooltip(this.leftLegColours, this.leftLegTempValues, leftLeg);
        Constants.getColourNTooltip(this.rightLegColours, this.rightLegTempValues, rightLeg);

        this.patientName = patientRecord.patientName;
        this.diffColour = this.analyseResult.hasDifferences() ? "#8b2300" : "#98FB98";
        this.diffColourBorder = this.analyseResult.hasDifferences() ? "#8b0000" : "#006400";
    }

    public hidePopup(event){
        if(event.target.id !== "show_diff"){
            this.dialogVisibility = "hidden";
        }
    }

}
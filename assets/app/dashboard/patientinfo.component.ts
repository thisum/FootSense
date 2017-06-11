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
    leftLegColours: string[] = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
    rightLegColours: string[] = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
    leftLegToolTips: string[] = ["","","","","","", "", ""];
    rightLegToolTips: string[] = ["","","","","","", "", ""];
    t: number = 1000*60*60*24 - 1;
    criteria = new PatientInfoSearchCriteria();
    patientRecords: PatientRecord[] = [];
    analyseResult: AnalyseResult = new AnalyseResult([0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]);

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

    public onPatientRecordClicked(patientRecord: PatientRecord) {
        let leftLeg: number[] = patientRecord.getLeftLeg();
        let rightLeg: number[] = patientRecord.getRightLeg();
        this.analyseResult = new AnalyseResult(leftLeg, rightLeg);

        Constants.getColourNTooltip(this.leftLegColours, this.leftLegToolTips, leftLeg);
        Constants.getColourNTooltip(this.rightLegColours, this.rightLegToolTips, rightLeg);

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
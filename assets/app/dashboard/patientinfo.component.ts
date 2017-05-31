import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PatientInfoService} from "../services/request.service";
import {PatientInfoSearchCriteria} from "../obj/PatientInfoSearchCriteria";
import {IMyOptions} from "../../../public/js/vendor/mydatepicker/dist/interfaces/my-options.interface";
import {IMyDateModel} from "../../../public/js/vendor/mydatepicker/dist/interfaces/my-date-model.interface";
import {PatientRecord} from "../obj/PatientRecord";


@Component({
    moduleId: module.id,
    selector: 'fs-patient_records',
    templateUrl: 'html/patientinfo.component.html'
})
export class PatientInfoComponent implements OnInit{

    t: number = 1000*60*60*24 - 1;
    criteria = new PatientInfoSearchCriteria();
    patientRecords: PatientRecord[] = [];
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
            results =>{

            },
            error => {
                console.error(error);
            }
        )
    }

    ngOnInit(){

        this.patientRecords.push(new PatientRecord("1234", "asdf", "wer", "sdgs", "werwe"));
    }

    onDateChangedFrom(event: IMyDateModel) {
        this.criteria.fromDate = event.jsdate ? event.jsdate.getTime() : -1;
    }

    onDateChangedTo(event: IMyDateModel) {

        this.criteria.toDate = event.jsdate ? (event.jsdate.getTime() + this.t): -1;
    }

    onPatientRecordClicked(patientRecord: PatientRecord) {

    }

}
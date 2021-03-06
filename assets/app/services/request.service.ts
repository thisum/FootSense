/**
 * Created by Thisum on 8/17/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";

import {SERVER_RESPONSE_STATUS, BASE_URL} from "../util/constants";
import {getHeader} from "../util/request-builder.util";
import {PatientInfoSearchCriteria} from "../obj/PatientInfoSearchCriteria";
import {PatientRecord} from "../obj/PatientRecord";


@Injectable()
export class PatientInfoService{

    private baseUrl = BASE_URL + '/patient';
    private timeOptions = {
        day : 'numeric',
        month : 'short',
        year : 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    constructor (private _http: Http) {}

    public searchPatientRecords( searchCriteria: PatientInfoSearchCriteria ): Promise<PatientRecord[]>{

        const headers = getHeader();
        var url = this.baseUrl + '/search';
        let params = new URLSearchParams();
        params.set("patient_name", searchCriteria.patientName);
        params.set("from_date", String(searchCriteria.fromDate));
        params.set("to_date", String(searchCriteria.toDate));

        return this._http.get( url , {headers : headers, body : {}, search: params}).toPromise()
            .then(response => {
                const status = response.json().status;
                if(status == SERVER_RESPONSE_STATUS.SUCCESS)
                {
                    const data = response.json().result;
                    let patientRecords: any[] = [];

                    for(let obj of data){
                        let reqTime = new Date(obj.recordTime).toLocaleString('en-GB', this.timeOptions);
                        patientRecords.push( new PatientRecord(obj._id, obj.leftLeg, obj.rightLeg, reqTime, obj.patientName));
                    }
                    return patientRecords;
                }
                else if( status == SERVER_RESPONSE_STATUS.FAILED)
                {
                    throw new Error(response.json().message);
                }
            })
            .catch(this.handleError);
    }
    
    private handleError(error: any){
        console.error('Error occurred : ' +error );
        return Promise.reject(error.message || error);
    }

}
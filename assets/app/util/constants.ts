/**
 * Created by Thisum on 8/16/2016.
 */

export const BASE_URL = 'http://localhost:3333';

/**
 * Defines response statuses. Should be used to determine status of the server communication
 * @type {number}
 */
export enum SERVER_RESPONSE_STATUS{
    SUCCESS = 1000,
    FAILED = 2000,
    WARNING = 3000
};

export class Constants{

    public static getColourNTooltip(legColours: string[], legTooltips: string[], leg: number[] ){

        let i:number = 0;
        let colour:string = "#FFFFFF";
        let tooltip:number = 0;
        for(i=0; i<leg.length; i++)
        {
            let temperature:number = leg[i] / 100;
            if( temperature <= 15 )
            {
                colour = "#FFFFFF";
                tooltip = temperature;
            }
            else if( 15 < temperature && temperature <= 20 )
            {
                colour = "#00EAFF";
                tooltip = temperature;
            }
            else if( 20 < temperature && temperature <= 24 )
            {
                colour = "#007EFF";
                tooltip = temperature;
            }
            else if( 24 < temperature && temperature <= 25 )
            {
                colour = "#002AFF";
                tooltip = temperature;
            }
            else if( 25 < temperature && temperature <= 26 )
            {
                colour = "#4800FF";
                tooltip = temperature;
            }
            else if( 26 < temperature && temperature <= 27 )
            {
                colour = "#BA00FF";
                tooltip = temperature;
            }
            else if( 27 < temperature && temperature <= 29 )
            {
                colour = "#FF00B4";
                tooltip = temperature;
            }
            else
            {
                colour = "#FF0000";
                tooltip = temperature;
            }
            legColours[i] = colour;
            legTooltips[i] = String(tooltip);
        }
    }
}

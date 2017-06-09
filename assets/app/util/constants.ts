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
        let tooltip:string = "0 <= T < 15";
        for(i=0; i<leg.length; i++)
        {
            switch(leg[i])
            {
                case 1:
                    colour = "#FFFFFF";
                    tooltip = "0 ≤ T < 15";
                    break;
                case 2:
                    colour = "#0000FF";
                    tooltip = "15 ≤ T ≤ 20";
                    break;
                case 3:
                    colour = "#D4002B";
                    tooltip = "20 < T ≤ 24";
                    break;
                case 4:
                    colour = "#A80057";
                    tooltip = "24 < T ≤ 25";
                    break;
                case 5:
                    colour = "#7E007E";
                    tooltip = "25 < T ≤ 26";
                    break;
                case 6:
                    colour = "#5300AA";
                    tooltip = "26 < T ≤ 27";
                    break;
                case 7:
                    colour = "#2A00D7";
                    tooltip = "27 < T ≤ 28";
                    break;
                case 8:
                    colour = "#FF0000";
                    tooltip = "28 < T ≤ 29";
                    break;
                default:
                    colour = "#FFFFFF";
                    tooltip = "T > 29";
                    break;
            }
            legColours[i] = colour;
            legTooltips[i] = tooltip;
        }
    }
}

import React from 'react';

/**
 * Static functions that can be accessed from anywhere from the project
 */
export class HelperFunctions {
    /**
     * Returns the date from the ISO format datetime
     * @param {any} dateText
     */
    static takeDateFromDateTime(dateText) {
        let result = dateText.match('[^T]*');
        return result[0];
    }


    /**
     * Return the Time from ISO format datetime
     * @param {any} dateText
     */
    static takeTimeFromDateTime(dateText) {
        let result = dateText.match('(^T)*T[^Z]*');
        //Getting the T out with regex proved a bit annoying to accomplish compared to the importance
        return result[0].replace('T', '');
    }


    /**
     * Converts http to https from an url. No checks whether the new url is valid or not
     * @param {any} url
     */
    static convertUrlFromHTTPtoHTTPS(url) {
        //Tested to work with example material
        return url.replace('http://', 'https://');
    }


    /**
     * Renders a logo image from the url if the url given is valid.
     * Http will be converted to https
     * @param {any} url place for the url
     * @param {any} width
     * @param {any} height
     * @param {any} classes
     */
    static renderLogoIfValidUrl(url, width = "5%", height = "5%", classes = 'min-width-20') {
        //TODO Closing on threshold for creating a component
        return url !== null ? <img src={HelperFunctions.convertUrlFromHTTPtoHTTPS(url)} alt="" className={classes} width={width} height={height} /> : null;
    }
}
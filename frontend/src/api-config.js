let backendHost;
if (window.location.href.includes('localhost')) {
    backendHost = 'http://localhost:8000'
} else {
    backendHost = 'https://social-media-api2.herokuapp.com'
}
console.log(backendHost)
export const API_URL = `${backendHost}/api/v1/`;
export const IMAGES_URL = `${backendHost}/images/`;
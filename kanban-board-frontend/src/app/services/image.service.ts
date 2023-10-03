import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	URL: string = "https://api.cloudinary.com/v1_1/dduwkdctl/image/upload"

	constructor(private httpClient: HttpClient) {
	}

	uploadProfilePicture(image: File) {
		let formData = new FormData()
		formData.append("file", image);
		formData.append("upload_preset", "hgcofj4x");
		formData.append("api_key", "539122916287427");
		return this.httpClient.post(this.URL, formData);
	}
}

import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  URL: string = " ";

  constructor( private storage: Storage) { }

  public uploadImage($event: any, name: string){
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, `imagen/`+ name)
    uploadBytes(imgRef, file)
    .then(response => {this.getImages()})
    .catch(error => console.log(error))
  }

  getImages(){
    const imageRef = ref(this.storage, 'imagen')
    list(imageRef)
    .then(async response => {
      for(let item of response.items){
        this.URL = await getDownloadURL(item);
      }
    })
    .catch(error => console.log(error))
  }
}

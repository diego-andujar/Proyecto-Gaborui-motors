import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { AngularFireStorage } from '@angular/fire/storage'
import  firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

interface FeaturedPhotosUrls{
  url1?: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  featuredPhotoStream: AngularFireObject<FeaturedPhotosUrls>
  
  constructor(
    private db: AngularFireDatabase,
    private dataService: DataService,
    private storage: AngularFireStorage,
    
  ) { 
    this.featuredPhotoStream = this.db.object('/photos/imagen');
  } 

  config: any;
  collection = {count:0, data:[] as any []}

  ngOnInit(): void {
    this.dataService.getUser().subscribe(resp=>{
      this.collection.data = resp.map((e:any) =>{
        return{
          nombre: e.payload.doc.data().nombre,
        }
      })
    },
    error=>{
      console.log(error)
    }
    )
  }

  name = 'Angular 4';
  url = '';
  onSelectFile(event: any) {
    const file: File = event.target.files[0];
    const metaData = {'contentType': file.type};
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url1');
    const uploadTask: firebase.storage.UploadTask =  storageRef.put(file, metaData);
    console.log("uploading: ", file.name)

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log("Upload is complete")
      firebase.database().ref('/photos/featured/url1').set(uploadSnapshot.downloadURL);
    })


    // const id = Math.random().toString(36).substring(2);
    // const file = event.target.files[0];
    // const filePath = `uploads/profile_${id}`;
    // const ref = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file);
    
    // if (event.target.files && event.target.files[0]) {

    //   var reader = new FileReader();

    //   const id = Math.random().toString(36).substring(2);

    //   reader.readAsDataURL(event.target.files[0]); // read file as data url

    //   const filePath = `uploads/profile_${id}`;
    //   const ref = this.storage.ref(filePath);
    //   const task = this.storage.upload(filePath, reader);

    //   reader.onload = (event: any) => { // called once readAsDataURL is completed
    //       this.url = event.target.result;
    //   }
      
    // }
  }

  // readImages(event: any){
  //   const file = event.target.files[0];
  //   const imagesRef = firebase.storage().ref('images');
  //   imagesRef.put(file);
  //   imagesRef.getDownloadURL().then((url)=>{
  //     url
  //   });
  // }

  public delete(){
    // this.url = null;
  }

}

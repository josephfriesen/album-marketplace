import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { ALBUMS } from './mock-albums';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
  }

  getAlbums() {
    return this.albums;
  }

  getAlbumById(albumId: string) {
    return this.database.object('albums/' + albumId);
  }

  albums: FirebaseListObservable<any[]>;

  addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }

  updateAlbum(localUpdatedAlbum){
    var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({
      title: localUpdatedAlbum.title,
      artist: localUpdatedAlbum.artist,
      description: localUpdatedAlbum.description
    })
  }

  deleteAlbum(localAlbumToDelete) {
    var albumEntryInFirebase = this.getAlbumById(localAlbumToDelete.$key);
    albumEntryInFirebase.remove();
  }
}

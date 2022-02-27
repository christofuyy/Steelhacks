import path from "path";
import { storage, db } from "constants/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";

export default class ImageStorageRef {
  imageFile: File;
  uid: string;

  constructor(imageFile: File, uid: string) {
    this.imageFile = imageFile;
    this.uid = uid;
  }

  async upload() {
    const objectStorageFilePath = this.generateStorageFilePath(this.uid);
    const downloadUrl = await this.uploadToStorage(
      objectStorageFilePath,
      this.imageFile
    );
    await this.writeToDB(objectStorageFilePath, downloadUrl);
    return downloadUrl;
  }

  private generateStorageFilePath(uid: string) {
    const objectStorageFilePath = `users/${uid}/images/${uuidv4()}`;
    return objectStorageFilePath;
  }

  private async uploadToStorage(
    objectStorageFilePath: string,
    imageFile: File
  ) {
    const objectRef = ref(storage, objectStorageFilePath);
    await uploadBytes(objectRef, imageFile);
    return getDownloadURL(objectRef);
  }

  private async writeToDB(objectStorageFilePath: string, downloadUrl: string) {
    const fileName = path.basename(objectStorageFilePath);

    const imageCollectionRef = collection(db, "users");
    const imageDocRef = doc(imageCollectionRef, this.uid, "images", fileName);
    return setDoc(imageDocRef, {
      downloadUrl,
    });
  }
}

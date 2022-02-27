import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as tf from "@tensorflow/tfjs-node";
import * as tfCore from "@tensorflow/tfjs";
import fs from "fs";
import path from "path";
import os from "os";

admin.initializeApp();

export const inferImage = functions.storage
  .object()
  .onFinalize(async (object: functions.storage.ObjectMetadata) => {
    const handler = tf.io.fileSystem(path.resolve("./src/model.json"));
    const model = await tf.loadLayersModel(handler);

    const {
      bucket: fileBucket,
      name: filePath,
      contentType,
      metageneration,
    } = object;

    const paths = filePath.split("/");
    console.log(paths);
    const uid = paths[1];
    const fileId = paths[3];
    console.log("Uid: ", uid);
    console.log("fileId: ", fileId);
    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith("image/")) {
      return console.log("This is not an image.");
    }

    const fileName = path.basename(filePath as string);

    // Download file from bucket.
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: contentType,
    };

    await bucket.file(filePath).download({
      destination: tempFilePath,
      validation: !process.env.FUNCTIONS_EMULATOR,
    });
    const imageBuffer = fs.readFileSync(tempFilePath);
    const tfImage = tf.node.decodeImage(imageBuffer, 3);
    var resizedImage = tfCore.image
      .resizeBilinear(tfImage, [224, 224])
      .div(tf.scalar(255));
    const float32Cast = tf.cast(resizedImage, "float32");
    const t4d = tf.tensor4d(
      Array.from(float32Cast.dataSync()),
      [1, 224, 224, 3]
    );

    const list = model.predict(t4d).dataSync();
    const predictedList = list.toString().split(",");
    console.log(predictedList);

    admin
      .firestore()
      .doc(`users/${uid}/images/${fileId}`)
      .update({
        healthyProb: predictedList[0],
        unhealthyProb: predictedList[1],
      });

    return fs.unlink(tempFilePath, () => {});
  });

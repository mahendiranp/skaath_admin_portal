import { auth, db, storage } from "../config/config";
import { ref, set, onValue } from "firebase/database";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref as sRef,
} from "firebase/storage";

console.log(auth);

// const uploadImage = async (props) => {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve();
//     }, 1000);
//   }).then(function () {
//     $("#output").append(" middle");
//     return " end";
//   }).catch(err) {
//     reject (err);
//   }
//   // await uploadTask.on(
//   //   "state_changed",
//   //   (error) => {
//   //     return Promise.reject(error);
//   //   },
//   //   () => {
//   //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//   //       console.log("File available at", downloadURL);
//   //       return Promise.resolve(downloadURL);
//   //     });
//   //   }
//   // );
// };

// function(username, password)
// {
//  return new Promise(function(resolve, reject) {
//   if ( /* everything turned out fine */ )
//   {
//    resolve("Stuff worked!");
//   }
//   else
//   {
//    reject(Error("It broke"));
//   }
//  });
// }

// const uploadImage = (props) => {
//   const storageRef = sRef(storage, `products/${props.title}`);
//   const uploadTask = uploadBytesResumable(storageRef, props);
//   console.log(uploadTask);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const prog = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       console.log(prog);
//     },
//     (error) => {
//       return Promise.reject(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log("File available at", downloadURL);
//         return Promise.resolve(downloadURL);
//       });
//     }
//   );
// };

export default {
  getList: async (prop) => {
    console.log(prop);
    let values = [];
    let refernce = ref(db, prop);
    onValue(refernce, (snapshot) => {
      let products = snapshot.val();
      for (let id in products) {
        values.push({ id, ...products[id] });
      }
    });
    let val = {
      data: values,
      total: values.length,
    };
    console.log(val);
    return val;
  },
  //getList: (resource, params) => Promise,
  //getOne: (resource, params) => Promise,
  getMany: (resource, params) => Promise,
  getManyReference: (resource, params) => Promise,
  create: async (resource, params) => {
    params.id = auth.currentUser.uid;
    const file = params.data.thumbImage;
    const storageRef = sRef(storage, `products/${file.title}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(uploadTask);
    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        let values = [];
        params.data.thumbImage = downloadURL;
        let refernce = ref(db, resource);
        onValue(refernce, (snapshot) => {
          let products = snapshot.val();
          if (products.length) {
            for (let id in products) {
              console.log(id);
              values.push({ id, ...products[id] });
            }
          } else {
            values.push({ id: 1, ...products });
          }
        });
        const lastValue = values.pop();
        console.log(lastValue);
        console.log(params.data);
        await set(
          ref(db, "products/" + (parseInt(lastValue.id) + 1)),
          params.data
        );
      });
    });
  },
  update: async (resource, params) => {
    await set(ref(db, `${resource}/` + params.data.id), params.data)
      .then(() => {
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  updateMany: (resource, params) => Promise,
  delete: (resource, params) => Promise,
  deleteMany: (resource, params) => Promise,
};

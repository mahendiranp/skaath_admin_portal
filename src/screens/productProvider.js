import axios from "axios";
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

const userId = sessionStorage.getItem("userId");

console.log(userId);

// const getBase64FromUrl = async (url) => {
//   const data = await fetch(url);
//   const blob = await data.blob();
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       const base64data = reader.result;
//       resolve(base64data);
//     };
//   });
// };

export default {
  getList: async (prop) => {
    let responseData = await axios.get(`http://localhost:3000/${prop}`);
    let val = {
      data: responseData.data,
      total: responseData.data.length,
    };
    console.log(val);
    return val;
  },
  //getList: (resource, params) => Promise,
  getOne: (resource, params) => Promise,
  getMany: (resource, params) => Promise,
  getManyReference: (resource, params) => Promise,
  create: async (resource, params) => {},
  update: async (resource, params) => {
    console.log(resource);
    console.log(params);
    // let responseData = await axios.put(
    //   `http://localhost:3000/${resource}/${params.id}`
    // );
    const url = `http://localhost:3000/${resource}/${params.id}`;
    const res = await axios({
      method: "put",
      url: url,
      data: params.data,
    });
    console.log(res);
  },
  updateMany: (resource, params) => Promise,
  delete: (resource, params) => Promise,
  deleteMany: (resource, params) => Promise,
};

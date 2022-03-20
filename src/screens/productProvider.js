import { auth, db, storage } from "../config/config";
import {
  ref,
  set,
  onValue,
  push,
  child,
  update,
  getDatabase,
  get,
  equalTo,
  query,
  orderByChild,
} from "firebase/database";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref as sRef,
  uploadString,
} from "firebase/storage";

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

const Orders = [
  {
    key: 1,
    id: 1,
    location: "Bangalore",
    OrderedItems: [],
    totalItems: 5,
    totalCost: "400",
  },
  {
    key: 2,
    id: 2,
    location: "Bangalore",
    OrderedItems: [],
    totalItems: 5,
    totalCost: "400",
  },
  {
    key: 3,
    id: 3,
    location: "Bangalore",
    OrderedItems: [],
    totalItems: 5,
    totalCost: "400",
  },
];

const orderDelivered = [
  {
    id: 135,
    reference: "JKKZM2",
    date: "2022-03-19T15:04:11.553Z",
    customer_id: 589,
    basket: [
      {
        product_id: 105,
        quantity: 3,
      },
    ],
    total_ex_taxes: 159.66,
    delivery_fees: 6.27,
    tax_rate: 0.2,
    taxes: 33.19,
    total: 199.12,
    status: "delivered",
    returned: false,
  },
  {
    id: 317,
    reference: "6GAIWR",
    date: "2022-03-19T02:43:52.133Z",
    customer_id: 31,
    basket: [
      {
        product_id: 8,
        quantity: 5,
      },
    ],
    total_ex_taxes: 170.04999999999998,
    delivery_fees: 5.53,
    tax_rate: 0.12,
    taxes: 21.07,
    total: 196.65,
    status: "delivered",
    returned: false,
  },
  {
    id: 36,
    reference: "VYV03O",
    date: "2022-03-17T01:48:05.486Z",
    customer_id: 441,
    basket: [
      {
        product_id: 123,
        quantity: 1,
      },
      {
        product_id: 42,
        quantity: 1,
      },
    ],
    total_ex_taxes: 81.14,
    delivery_fees: 4.25,
    tax_rate: 0.2,
    taxes: 17.08,
    total: 102.47,
    status: "delivered",
    returned: false,
  },
  {
    id: 44,
    reference: "7KP1HO",
    date: "2022-03-13T13:17:30.520Z",
    customer_id: 153,
    basket: [
      {
        product_id: 85,
        quantity: 5,
      },
    ],
    total_ex_taxes: 238.95,
    delivery_fees: 4.19,
    tax_rate: 0.2,
    taxes: 48.63,
    total: 291.77,
    status: "delivered",
    returned: false,
  },
  {
    id: 210,
    reference: "1YULX9",
    date: "2022-03-12T18:33:18.306Z",
    customer_id: 229,
    basket: [
      {
        product_id: 13,
        quantity: 2,
      },
      {
        product_id: 14,
        quantity: 4,
      },
      {
        product_id: 110,
        quantity: 4,
      },
    ],
    total_ex_taxes: 332.02,
    delivery_fees: 7.53,
    tax_rate: 0.17,
    taxes: 57.72,
    total: 397.27,
    status: "delivered",
    returned: false,
  },
  {
    id: 523,
    reference: "LEMW02",
    date: "2022-03-03T05:56:08.184Z",
    customer_id: 790,
    basket: [
      {
        product_id: 90,
        quantity: 2,
      },
    ],
    total_ex_taxes: 83.56,
    delivery_fees: 5.83,
    tax_rate: 0.12,
    taxes: 10.73,
    total: 100.12,
    status: "delivered",
    returned: false,
  },
  {
    id: 583,
    reference: "WUA3KX",
    date: "2022-02-22T23:54:09.805Z",
    customer_id: 449,
    basket: [
      {
        product_id: 52,
        quantity: 1,
      },
    ],
    total_ex_taxes: 10.85,
    delivery_fees: 5.6,
    tax_rate: 0.12,
    taxes: 1.97,
    total: 18.42,
    status: "delivered",
    returned: true,
  },
  {
    id: 277,
    reference: "1HVSU2",
    date: "2022-02-20T22:14:09.113Z",
    customer_id: 548,
    basket: [
      {
        product_id: 99,
        quantity: 1,
      },
    ],
    total_ex_taxes: 17.74,
    delivery_fees: 3.15,
    tax_rate: 0.12,
    taxes: 2.51,
    total: 23.4,
    status: "delivered",
    returned: false,
  },
  {
    id: 576,
    reference: "LFE5EM",
    date: "2022-02-18T10:41:54.663Z",
    customer_id: 249,
    basket: [
      {
        product_id: 37,
        quantity: 1,
      },
    ],
    total_ex_taxes: 46.61,
    delivery_fees: 6.77,
    tax_rate: 0.2,
    taxes: 10.68,
    total: 64.06,
    status: "delivered",
    returned: false,
  },
  {
    id: 117,
    reference: "RU59FE",
    date: "2022-02-16T21:49:50.825Z",
    customer_id: 466,
    basket: [
      {
        product_id: 59,
        quantity: 1,
      },
    ],
    total_ex_taxes: 46.89,
    delivery_fees: 3.95,
    tax_rate: 0.17,
    taxes: 8.64,
    total: 59.48,
    status: "delivered",
    returned: false,
  },
  {
    id: 234,
    reference: "SG7NAT",
    date: "2022-02-16T17:59:41.318Z",
    customer_id: 150,
    basket: [
      {
        product_id: 70,
        quantity: 1,
      },
      {
        product_id: 97,
        quantity: 3,
      },
      {
        product_id: 65,
        quantity: 3,
      },
      {
        product_id: 52,
        quantity: 1,
      },
      {
        product_id: 21,
        quantity: 4,
      },
    ],
    total_ex_taxes: 316.08,
    delivery_fees: 4.01,
    tax_rate: 0.12,
    taxes: 38.41,
    total: 358.5,
    status: "delivered",
    returned: false,
  },
  {
    id: 584,
    reference: "OBR2AS",
    date: "2022-02-16T17:25:25.262Z",
    customer_id: 774,
    basket: [
      {
        product_id: 103,
        quantity: 1,
      },
      {
        product_id: 86,
        quantity: 2,
      },
    ],
    total_ex_taxes: 59.33,
    delivery_fees: 5.35,
    tax_rate: 0.2,
    taxes: 12.94,
    total: 77.62,
    status: "delivered",
    returned: false,
  },
  {
    id: 156,
    reference: "0N4JMA",
    date: "2022-02-16T13:02:20.357Z",
    customer_id: 147,
    basket: [
      {
        product_id: 60,
        quantity: 2,
      },
    ],
    total_ex_taxes: 49.84,
    delivery_fees: 3.45,
    tax_rate: 0.12,
    taxes: 6.39,
    total: 59.68,
    status: "delivered",
    returned: false,
  },
  {
    id: 154,
    reference: "QSC81A",
    date: "2022-02-16T09:25:13.398Z",
    customer_id: 13,
    basket: [
      {
        product_id: 14,
        quantity: 3,
      },
    ],
    total_ex_taxes: 94.80000000000001,
    delivery_fees: 5.62,
    tax_rate: 0.17,
    taxes: 17.07,
    total: 117.49,
    status: "delivered",
    returned: false,
  },
  {
    id: 16,
    reference: "XELX1F",
    date: "2022-02-15T12:06:10.781Z",
    customer_id: 421,
    basket: [
      {
        product_id: 1,
        quantity: 4,
      },
    ],
    total_ex_taxes: 74.52,
    delivery_fees: 6.29,
    tax_rate: 0.17,
    taxes: 13.74,
    total: 94.55,
    status: "delivered",
    returned: false,
  },
  {
    id: 120,
    reference: "YTY318",
    date: "2022-02-14T19:46:34.734Z",
    customer_id: 317,
    basket: [
      {
        product_id: 31,
        quantity: 2,
      },
    ],
    total_ex_taxes: 41.94,
    delivery_fees: 4.44,
    tax_rate: 0.17,
    taxes: 7.88,
    total: 54.26,
    status: "delivered",
    returned: false,
  },
  {
    id: 346,
    reference: "UO8FVC",
    date: "2022-02-14T05:15:15.759Z",
    customer_id: 862,
    basket: [
      {
        product_id: 9,
        quantity: 1,
      },
      {
        product_id: 39,
        quantity: 2,
      },
    ],
    total_ex_taxes: 51.6,
    delivery_fees: 7.11,
    tax_rate: 0.2,
    taxes: 11.74,
    total: 70.45,
    status: "delivered",
    returned: false,
  },
  {
    id: 428,
    reference: "QZL9IH",
    date: "2022-02-13T23:50:51.221Z",
    customer_id: 3,
    basket: [
      {
        product_id: 58,
        quantity: 2,
      },
    ],
    total_ex_taxes: 33.18,
    delivery_fees: 4.06,
    tax_rate: 0.2,
    taxes: 7.45,
    total: 44.69,
    status: "delivered",
    returned: false,
  },
  {
    id: 361,
    reference: "T3NV5Q",
    date: "2022-02-11T19:03:49.143Z",
    customer_id: 97,
    basket: [
      {
        product_id: 125,
        quantity: 2,
      },
    ],
    total_ex_taxes: 68.2,
    delivery_fees: 4.66,
    tax_rate: 0.17,
    taxes: 12.39,
    total: 85.25,
    status: "delivered",
    returned: true,
  },
  {
    id: 180,
    reference: "G5VI6K",
    date: "2022-02-10T04:12:46.875Z",
    customer_id: 3,
    basket: [
      {
        product_id: 36,
        quantity: 1,
      },
      {
        product_id: 32,
        quantity: 1,
      },
      {
        product_id: 48,
        quantity: 1,
      },
      {
        product_id: 2,
        quantity: 2,
      },
      {
        product_id: 113,
        quantity: 2,
      },
      {
        product_id: 41,
        quantity: 1,
      },
      {
        product_id: 54,
        quantity: 1,
      },
      {
        product_id: 15,
        quantity: 2,
      },
    ],
    total_ex_taxes: 329.90999999999997,
    delivery_fees: 4.03,
    tax_rate: 0.17,
    taxes: 56.77,
    total: 390.71,
    status: "delivered",
    returned: false,
  },
  {
    id: 575,
    reference: "ZJ5FRR",
    date: "2022-02-09T02:29:46.959Z",
    customer_id: 52,
    basket: [
      {
        product_id: 53,
        quantity: 3,
      },
    ],
    total_ex_taxes: 96.89999999999999,
    delivery_fees: 4.52,
    tax_rate: 0.2,
    taxes: 20.28,
    total: 121.7,
    status: "delivered",
    returned: false,
  },
  {
    id: 174,
    reference: "Y53VBI",
    date: "2022-02-08T15:51:28.629Z",
    customer_id: 671,
    basket: [
      {
        product_id: 124,
        quantity: 3,
      },
    ],
    total_ex_taxes: 151.74,
    delivery_fees: 7.51,
    tax_rate: 0.2,
    taxes: 31.85,
    total: 191.1,
    status: "delivered",
    returned: false,
  },
  {
    id: 535,
    reference: "HPGEEB",
    date: "2022-02-04T20:35:07.460Z",
    customer_id: 464,
    basket: [
      {
        product_id: 27,
        quantity: 1,
      },
      {
        product_id: 88,
        quantity: 1,
      },
    ],
    total_ex_taxes: 81.83,
    delivery_fees: 4.86,
    tax_rate: 0.2,
    taxes: 17.34,
    total: 104.03,
    status: "delivered",
    returned: false,
  },
  {
    id: 200,
    reference: "VTUIAK",
    date: "2022-02-03T03:40:34.919Z",
    customer_id: 847,
    basket: [
      {
        product_id: 106,
        quantity: 1,
      },
      {
        product_id: 18,
        quantity: 1,
      },
    ],
    total_ex_taxes: 63.3,
    delivery_fees: 4.42,
    tax_rate: 0.12,
    taxes: 8.13,
    total: 75.85,
    status: "delivered",
    returned: false,
  },
  {
    id: 148,
    reference: "GNBMZ8",
    date: "2022-02-01T08:14:47.940Z",
    customer_id: 97,
    basket: [
      {
        product_id: 12,
        quantity: 2,
      },
      {
        product_id: 56,
        quantity: 1,
      },
      {
        product_id: 77,
        quantity: 1,
      },
    ],
    total_ex_taxes: 135.58,
    delivery_fees: 6.47,
    tax_rate: 0.17,
    taxes: 24.15,
    total: 166.2,
    status: "delivered",
    returned: false,
  },
  {
    id: 136,
    reference: "S9I883",
    date: "2022-03-09T02:15:59.024Z",
    customer_id: 53,
    basket: [
      {
        product_id: 34,
        quantity: 1,
      },
    ],
    total_ex_taxes: 60.07,
    delivery_fees: 3.63,
    tax_rate: 0.17,
    taxes: 10.83,
    total: 74.53,
    status: "ordered",
    returned: false,
  },
  {
    id: 194,
    reference: "ANIP06",
    date: "2022-03-11T00:52:44.043Z",
    customer_id: 67,
    basket: [
      {
        product_id: 57,
        quantity: 5,
      },
    ],
    total_ex_taxes: 112.30000000000001,
    delivery_fees: 7.06,
    tax_rate: 0.2,
    taxes: 23.87,
    total: 143.23,
    status: "ordered",
    returned: false,
  },
  {
    id: 257,
    reference: "385G4C",
    date: "2022-03-18T19:36:38.862Z",
    customer_id: 184,
    basket: [
      {
        product_id: 110,
        quantity: 1,
      },
      {
        product_id: 120,
        quantity: 2,
      },
    ],
    total_ex_taxes: 52.9,
    delivery_fees: 5.73,
    tax_rate: 0.17,
    taxes: 9.97,
    total: 68.6,
    status: "ordered",
    returned: false,
  },
  {
    id: 380,
    reference: "47ZY7G",
    date: "2022-03-08T11:30:46.725Z",
    customer_id: 521,
    basket: [
      {
        product_id: 77,
        quantity: 1,
      },
    ],
    total_ex_taxes: 29.68,
    delivery_fees: 4.5,
    tax_rate: 0.17,
    taxes: 5.81,
    total: 39.99,
    status: "ordered",
    returned: false,
  },
  {
    id: 231,
    reference: "J8P4CQ",
    date: "2022-02-27T00:40:06.924Z",
    customer_id: 840,
    basket: [
      {
        product_id: 91,
        quantity: 1,
      },
    ],
    total_ex_taxes: 44.97,
    delivery_fees: 7.2,
    tax_rate: 0.2,
    taxes: 10.43,
    total: 62.6,
    status: "ordered",
    returned: false,
  },
  {
    id: 141,
    reference: "WUC8C9",
    date: "2022-02-24T04:58:47.243Z",
    customer_id: 852,
    basket: [
      {
        product_id: 122,
        quantity: 1,
      },
    ],
    total_ex_taxes: 61.52,
    delivery_fees: 3.84,
    tax_rate: 0.17,
    taxes: 11.11,
    total: 76.47,
    status: "ordered",
    returned: false,
  },
  [
    {
      id: 112,
      reference: "LVOLBD",
      date: "2018-12-19T18:12:16.705Z",
      customer_id: 1,
      basket: [
        {
          product_id: 22,
          quantity: 2,
        },
        {
          product_id: 121,
          quantity: 2,
        },
      ],
      total_ex_taxes: 151.66,
      delivery_fees: 4.94,
      tax_rate: 0.17,
      taxes: 26.62,
      total: 183.22,
      status: "cancelled",
      returned: false,
    },
    {
      id: 91,
      reference: "9FG78Z",
      date: "2020-03-09T04:13:30.086Z",
      customer_id: 25,
      basket: [
        {
          product_id: 49,
          quantity: 2,
        },
      ],
      total_ex_taxes: 44.88,
      delivery_fees: 3.75,
      tax_rate: 0.12,
      taxes: 5.84,
      total: 54.47,
      status: "cancelled",
      returned: false,
    },
    {
      id: 22,
      reference: "35CLO0",
      date: "2021-05-13T23:55:23.956Z",
      customer_id: 26,
      basket: [
        {
          product_id: 107,
          quantity: 1,
        },
        {
          product_id: 100,
          quantity: 4,
        },
        {
          product_id: 33,
          quantity: 2,
        },
        {
          product_id: 95,
          quantity: 1,
        },
        {
          product_id: 48,
          quantity: 1,
        },
        {
          product_id: 101,
          quantity: 1,
        },
        {
          product_id: 31,
          quantity: 1,
        },
      ],
      total_ex_taxes: 283.82000000000005,
      delivery_fees: 6.38,
      tax_rate: 0.2,
      taxes: 58.04,
      total: 348.24,
      status: "cancelled",
      returned: false,
    },
    {
      id: 78,
      reference: "N4HHG8",
      date: "2021-02-15T10:07:21.106Z",
      customer_id: 34,
      basket: [
        {
          product_id: 14,
          quantity: 1,
        },
        {
          product_id: 110,
          quantity: 4,
        },
        {
          product_id: 40,
          quantity: 5,
        },
      ],
      total_ex_taxes: 363.4,
      delivery_fees: 7.48,
      tax_rate: 0.12,
      taxes: 44.51,
      total: 415.39,
      status: "cancelled",
      returned: false,
    },
    {
      id: 508,
      reference: "FB2PG0",
      date: "2020-01-14T04:32:16.500Z",
      customer_id: 125,
      basket: [
        {
          product_id: 2,
          quantity: 2,
        },
      ],
      total_ex_taxes: 63.96,
      delivery_fees: 5.78,
      tax_rate: 0.2,
      taxes: 13.95,
      total: 83.69,
      status: "cancelled",
      returned: false,
    },
    {
      id: 208,
      reference: "3OU09V",
      date: "2021-02-14T07:09:22.374Z",
      customer_id: 142,
      basket: [
        {
          product_id: 26,
          quantity: 2,
        },
      ],
      total_ex_taxes: 87.88,
      delivery_fees: 6.84,
      tax_rate: 0.12,
      taxes: 11.37,
      total: 106.09,
      status: "cancelled",
      returned: false,
    },
    {
      id: 265,
      reference: "0QW2S5",
      date: "2019-07-04T13:28:42.165Z",
      customer_id: 142,
      basket: [
        {
          product_id: 110,
          quantity: 1,
        },
        {
          product_id: 108,
          quantity: 2,
        },
      ],
      total_ex_taxes: 128.76,
      delivery_fees: 6.75,
      tax_rate: 0.12,
      taxes: 16.26,
      total: 151.77,
      status: "cancelled",
      returned: false,
    },
    {
      id: 233,
      reference: "597K2E",
      date: "2021-04-09T05:08:04.402Z",
      customer_id: 155,
      basket: [
        {
          product_id: 67,
          quantity: 1,
        },
        {
          product_id: 101,
          quantity: 1,
        },
      ],
      total_ex_taxes: 94.86,
      delivery_fees: 7.76,
      tax_rate: 0.2,
      taxes: 20.52,
      total: 123.14,
      status: "cancelled",
      returned: false,
    },
    {
      id: 465,
      reference: "K2FJ42",
      date: "2021-11-22T08:35:01.034Z",
      customer_id: 183,
      basket: [
        {
          product_id: 11,
          quantity: 1,
        },
      ],
      total_ex_taxes: 92.91,
      delivery_fees: 3.63,
      tax_rate: 0.12,
      taxes: 11.58,
      total: 108.12,
      status: "cancelled",
      returned: false,
    },
    {
      id: 585,
      reference: "8VM8LN",
      date: "2019-05-12T06:38:40.114Z",
      customer_id: 197,
      basket: [
        {
          product_id: 56,
          quantity: 3,
        },
      ],
      total_ex_taxes: 68.55000000000001,
      delivery_fees: 6.01,
      tax_rate: 0.17,
      taxes: 12.68,
      total: 87.24,
      status: "cancelled",
      returned: false,
    },
    {
      id: 389,
      reference: "MXUSKQ",
      date: "2018-10-10T09:38:14.529Z",
      customer_id: 204,
      basket: [
        {
          product_id: 43,
          quantity: 1,
        },
      ],
      total_ex_taxes: 63.17,
      delivery_fees: 4.58,
      tax_rate: 0.12,
      taxes: 8.13,
      total: 75.88,
      status: "cancelled",
      returned: false,
    },
    {
      id: 492,
      reference: "4UWOSO",
      date: "2021-09-22T09:45:48.030Z",
      customer_id: 206,
      basket: [
        {
          product_id: 74,
          quantity: 1,
        },
        {
          product_id: 64,
          quantity: 4,
        },
      ],
      total_ex_taxes: 138.03,
      delivery_fees: 6.85,
      tax_rate: 0.17,
      taxes: 24.63,
      total: 169.51,
      status: "cancelled",
      returned: false,
    },
    {
      id: 224,
      reference: "8RLRHY",
      date: "2019-06-19T13:07:43.928Z",
      customer_id: 207,
      basket: [
        {
          product_id: 66,
          quantity: 4,
        },
        {
          product_id: 3,
          quantity: 1,
        },
      ],
      total_ex_taxes: 344.7,
      delivery_fees: 5.63,
      tax_rate: 0.2,
      taxes: 70.07,
      total: 420.4,
      status: "cancelled",
      returned: false,
    },
    {
      id: 500,
      reference: "9PZX7X",
      date: "2019-04-29T15:35:22.659Z",
      customer_id: 213,
      basket: [
        {
          product_id: 53,
          quantity: 3,
        },
      ],
      total_ex_taxes: 99.66,
      delivery_fees: 6.96,
      tax_rate: 0.2,
      taxes: 21.32,
      total: 127.94,
      status: "cancelled",
      returned: false,
    },
    {
      id: 288,
      reference: "YBAR4A",
      date: "2021-02-14T22:46:37.100Z",
      customer_id: 257,
      basket: [
        {
          product_id: 1,
          quantity: 2,
        },
      ],
      total_ex_taxes: 58.56,
      delivery_fees: 3.96,
      tax_rate: 0.2,
      taxes: 12.5,
      total: 75.02,
      status: "cancelled",
      returned: false,
    },
    {
      id: 343,
      reference: "K5UVFH",
      date: "2017-08-30T06:48:30.203Z",
      customer_id: 280,
      basket: [
        {
          product_id: 85,
          quantity: 5,
        },
      ],
      total_ex_taxes: 336.59999999999997,
      delivery_fees: 4.63,
      tax_rate: 0.12,
      taxes: 40.95,
      total: 382.18,
      status: "cancelled",
      returned: false,
    },
    {
      id: 31,
      reference: "8KAQYG",
      date: "2019-08-08T09:28:38.404Z",
      customer_id: 317,
      basket: [
        {
          product_id: 65,
          quantity: 1,
        },
        {
          product_id: 24,
          quantity: 2,
        },
        {
          product_id: 66,
          quantity: 2,
        },
        {
          product_id: 100,
          quantity: 2,
        },
        {
          product_id: 98,
          quantity: 1,
        },
      ],
      total_ex_taxes: 335.94,
      delivery_fees: 7.61,
      tax_rate: 0.17,
      taxes: 58.4,
      total: 401.95,
      status: "cancelled",
      returned: false,
    },
    {
      id: 479,
      reference: "QZ4L1O",
      date: "2021-02-20T00:48:42.853Z",
      customer_id: 324,
      basket: [
        {
          product_id: 66,
          quantity: 1,
        },
        {
          product_id: 113,
          quantity: 1,
        },
      ],
      total_ex_taxes: 86.84,
      delivery_fees: 5.8,
      tax_rate: 0.12,
      taxes: 11.12,
      total: 103.76,
      status: "cancelled",
      returned: false,
    },
    {
      id: 95,
      reference: "EV8V1Y",
      date: "2020-11-19T11:39:40.151Z",
      customer_id: 364,
      basket: [
        {
          product_id: 31,
          quantity: 1,
        },
      ],
      total_ex_taxes: 37.87,
      delivery_fees: 6.86,
      tax_rate: 0.12,
      taxes: 5.37,
      total: 50.1,
      status: "cancelled",
      returned: false,
    },
    {
      id: 248,
      reference: "U4RSI6",
      date: "2021-12-12T22:01:01.120Z",
      customer_id: 386,
      basket: [
        {
          product_id: 95,
          quantity: 1,
        },
        {
          product_id: 24,
          quantity: 2,
        },
      ],
      total_ex_taxes: 91.58,
      delivery_fees: 6.27,
      tax_rate: 0.17,
      taxes: 16.63,
      total: 114.48,
      status: "cancelled",
      returned: false,
    },
    {
      id: 456,
      reference: "GBE9YX",
      date: "2018-10-27T01:31:47.450Z",
      customer_id: 421,
      basket: [
        {
          product_id: 86,
          quantity: 1,
        },
        {
          product_id: 23,
          quantity: 1,
        },
      ],
      total_ex_taxes: 66.17,
      delivery_fees: 6.12,
      tax_rate: 0.2,
      taxes: 14.46,
      total: 86.75,
      status: "cancelled",
      returned: false,
    },
    {
      id: 56,
      reference: "KFZJEE",
      date: "2021-11-07T06:55:23.359Z",
      customer_id: 426,
      basket: [
        {
          product_id: 68,
          quantity: 2,
        },
        {
          product_id: 108,
          quantity: 2,
        },
      ],
      total_ex_taxes: 198.16000000000003,
      delivery_fees: 5.65,
      tax_rate: 0.2,
      taxes: 40.76,
      total: 244.57,
      status: "cancelled",
      returned: false,
    },
    {
      id: 524,
      reference: "5HKL1K",
      date: "2021-06-25T19:43:43.230Z",
      customer_id: 426,
      basket: [
        {
          product_id: 97,
          quantity: 3,
        },
        {
          product_id: 57,
          quantity: 1,
        },
      ],
      total_ex_taxes: 170.32,
      delivery_fees: 6.81,
      tax_rate: 0.2,
      taxes: 35.43,
      total: 212.56,
      status: "cancelled",
      returned: false,
    },
    {
      id: 599,
      reference: "EH6BD1",
      date: "2019-09-13T10:08:04.490Z",
      customer_id: 430,
      basket: [
        {
          product_id: 22,
          quantity: 2,
        },
        {
          product_id: 21,
          quantity: 1,
        },
        {
          product_id: 85,
          quantity: 1,
        },
        {
          product_id: 108,
          quantity: 1,
        },
        {
          product_id: 114,
          quantity: 1,
        },
        {
          product_id: 1,
          quantity: 3,
        },
      ],
      total_ex_taxes: 325.43,
      delivery_fees: 3.97,
      tax_rate: 0.2,
      taxes: 65.88,
      total: 395.28,
      status: "cancelled",
      returned: false,
    },
    {
      id: 94,
      reference: "8EL7XP",
      date: "2020-03-06T14:35:18.855Z",
      customer_id: 458,
      basket: [
        {
          product_id: 59,
          quantity: 2,
        },
        {
          product_id: 33,
          quantity: 5,
        },
        {
          product_id: 94,
          quantity: 2,
        },
        {
          product_id: 90,
          quantity: 1,
        },
      ],
      total_ex_taxes: 221.32999999999998,
      delivery_fees: 6.06,
      tax_rate: 0.2,
      taxes: 45.48,
      total: 272.87,
      status: "cancelled",
      returned: false,
    },
  ],
];

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
    let values = [];
    if (prop != "orders") {
      let newDb = query(ref(db, prop));
      await get(newDb).then((snapshot) => {
        let products = snapshot.val();
        for (let id in products) {
          if (products[id].addedBy == userId) {
            values.push({ id, ...products[id] });
          }
        }
      });
    } else {
      values = orderDelivered;
    }
    let val = {
      data: values,
      total: values.length,
    };
    console.log(val);
    return val;
  },
  //getList: (resource, params) => Promise,
  getOne: (resource, params) => Promise,
  getMany: (resource, params) => Promise,
  getManyReference: (resource, params) => Promise,
  create: async (resource, params) => {
    const file = params.data.thumbImage.rawFile;
    const imageType = params.data.thumbImage.title;
    var requestData = { ...params, uid: auth.currentUser.uid }; // Spread Syntax
    const storageRef = sRef(storage, `products/${imageType}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask.on("state_changed", async () => {
      await getDownloadURL(uploadTask.snapshot.ref).then(
        async (downloadURL) => {
          let values = [];
          requestData.data.thumbImage = downloadURL;
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
          requestData.data.id = parseInt(lastValue.id) + 1;
          // await push(
          //   ref(db, "products/" + (parseInt(lastValue.id) + 1)),
          //   requestData.data
          // );
          const updates = {};
          const newPostKey = push(child(ref(db), "products")).key;
          console.log(newPostKey);
          requestData.data.id = newPostKey;
          updates["/products/" + newPostKey] = requestData.data;
          update(ref(db), updates);
          Promise.resolve();
        }
      );
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

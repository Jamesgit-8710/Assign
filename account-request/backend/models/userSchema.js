const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

// const basicsSchema = new Schema({
//   businessDomain: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//   },
//   lastName: {
//     type: String,
//   },
//   headquaters: {
//     type: String,
//     required: true,
//     enum: ["headquater1", "headquater2"],
//   },
//   role: {
//     type: String,
//     required: true,
//   },
//   additionalIndications: {
//     type: String,
//   },
// });

// const emailSchema = new Schema({
//   accountName: {
//     type: String,
//     required: true,
//   },
//   workspace: {
//     type: String,
//     required: true,
//     enum: ["workspace1", "workspace2"],
//   },
// });

// const systemSchema = new Schema({
//   accountName: {
//     type: String,
//   },
//   systems: {
//     type: [
//       {
//         system: {
//           type: String,
//           enum: ["system1", "system2"],
//         },
//         headquaters: {
//           type: String,
//           enum: ["headquater1", "headquater2"],
//         },
//         apps: {
//           type: String,
//           enum: ["app1", "app2"],
//         },
//       },
//     ],
//     required: true,
//   },
// });

// const campusSchema = new Schema({
//   accountName: {
//     type: String,
//   },
//   campuses: {
//     type: [
//       {
//         campus: {
//           type: String,
//           enum: ["system1", "system2"],
//         },
//         area: {
//           type: String,
//           enum: ["headquater1", "headquater2"],
//         },
//       },
//     ],
//     required: true,
//   },
// });

// const servicesSchema = new Schema({
//   userName: {
//     type: String,
//   },
//   contactEmail: {
//     type: String,
//     required: true,
//   },
//   directories: {
//     type: String,
//     required: true,
//   },
//   courses: {
//     type: [String],
//     required: true,
//   },
// });

const userSchema = new Schema({
  uuid: {
    type: String,
  },
  basicsData: {
    type: {
      businessDomain: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      lastName: {
        type: String,
      },
      headquaters: {
        type: String,
        required: true,
        enum: ["headquater1", "headquater2"],
      },
      role: {
        type: String,
        required: true,
      },
      additionalIndications: {
        type: String,
      },
    }
  },
  emailData: {
    type: [{
      accountName: {
        type: String,
        required: true,
      },
      workspace: {
        type: String,
        required: true,
        enum: ["workspace1", "workspace2"],
      },
    }]
  },
  systumData: {
    type: {
      accountName: {
        type: String,
      },
      systems: {
        type: [
          {
            system: {
              type: String,
              enum: ["system1", "system2"],
            },
            headquaters: {
              type: String,
              enum: ["headquater1", "headquater2"],
            },
            apps: {
              type: String,
              enum: ["app1", "app2"],
            },
          },
        ],
        required: true,
      },
    }
  },
  campusData: {
    type: {
      accountName: {
        type: String,
      },
      campuses: {
        type: [
          {
            campus: {
              type: String,
              enum: ["system1", "system2"],
            },
            area: {
              type: String,
              enum: ["headquater1", "headquater2"],
            },
          },
        ],
        required: true,
      },
    }
  },
  serviceData: {
    type: {
      userName: {
        type: String,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      directories: {
        type: String,
        required: true,
      },
      courses: {
        type: [String],
        required: true,
      },
    }
  }
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
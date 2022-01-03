const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const CandidatesSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 40,
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 40,
  },
  pictureUrl: {
    type: String,
    default: null,
  },
  phone: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999,
  },
  address: {
    street: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },
    number: {
      type: Number,
      required: true,
      min: 10,
      max: 10000,
    },
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  province: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  postalCode: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
  birthday: {
    type: Date,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  education: [
    {
      type: {
        type: String,
        enum: ['elementary', 'high', 'middle', 'college'],
      },
      institution: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      city: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      state: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      graduationYear: {
        type: Date,
        min: 10,
        max: 10,
      },
      description: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
    },
  ],
  experiences: [
    {
      position: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      company: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      since: {
        type: Date,
        minlength: 8,
        maxlength: 8,
      },
      until: {
        type: Date,
        minlength: 8,
        maxlength: 8,
      },
      jobDescription: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
    },
  ],
  courses: [
    {
      tittle: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      institution: {
        type: String,
        minlength: 3,
        maxlength: 40,
      },
      year: {
        type: Date,
        min: 1,
        max: 10000,
      },
    },
  ],
  hobbies: [
    {
      type: String,
      minlength: 3,
      maxlength: 40,
    },
  ],
  mainSkills: [
    {
      type: String,
      minlength: 3,
      maxlength: 40,
    },
  ],
  profileTypes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'profileTypesSchema',
    },
  ],
  isOpenToWork: {
    type: Boolean,
    default: true,
  },
  timeRange: {
    mon: {
      startTime: {
        type: Number,
        min: 0,
        max: 23,
      },
      endTime: {
        type: Number,
        min: 1,
        max: 24,
      },
    },
    tue: {
      startTime: {
        type: Number,
        min: 0,
        max: 23,
      },
      endTime: {
        type: Number,
        min: 1,
        max: 24,
      },
    },
    wed: {
      startTime: {
        type: Number,
        min: 0,
        max: 23,
      },
      endTime: {
        type: Number,
        min: 1,
        max: 24,
      },
    },
    thu: {
      startTime: {
        type: Number,
        min: 0,
        max: 23,
      },
      endTime: {
        type: Number,
        min: 1,
        max: 24,
      },
    },
    fri: {
      startTime: {
        type: Number,
        min: 0,
        max: 23,
      },
      endTime: {
        type: Number,
        min: 1,
        max: 24,
      },
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Candidates', CandidatesSchema);
